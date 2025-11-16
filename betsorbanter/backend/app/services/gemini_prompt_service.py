import os
import asyncio
from concurrent.futures import ThreadPoolExecutor
import httpx
import json
import re
import google.genai as genai
from app.services.nyt_service import article_search

KALSHI_BASE = os.getenv("KALSHI_API_URL", "https://api.elections.kalshi.com/trade-api/v2")
KALSHI_KEY = os.getenv("KALSHI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

client = genai.Client(api_key=GEMINI_API_KEY)


async def evaluate_event_title_paragraph(ticker: str, nyt_query: str = None):
    headers = {"Authorization": f"Bearer {KALSHI_KEY}"} if KALSHI_KEY else {}
    async with httpx.AsyncClient(timeout=10) as client_http:
        resp = await client_http.get(f"{KALSHI_BASE}/events/{ticker}", headers=headers)
        if resp.status_code == 404:
            raise ValueError(f"Event ticker '{ticker}' not found on Kalshi.")
        resp.raise_for_status()
        kalshi_data = resp.json()

    title = kalshi_data.get("title") or kalshi_data.get("name") or ""
    subtitle = kalshi_data.get("sub_title") or kalshi_data.get("subtitle") or ""

    options = ["Yes", "No"]
    # if "options" in kalshi_data and kalshi_data["options"]:
    #     for opt in kalshi_data.get("options", [])[:2]:
    #         options.append(opt.get("title") or opt.get("label") or str(opt.get("id")))
    
    # if not options:
    #     yes_opt = kalshi_data.get("yes_sub_title")
    #     no_opt = kalshi_data.get("no_sub_title")
    #     options = []
    #     if yes_opt:
    #         options.append(yes_opt)
    #     if no_opt:
    #         options.append(no_opt)
    

    query = nyt_query or f"{title} {subtitle}".strip()
    nyt_json = await article_search(query, page=0)
    docs = nyt_json.get("response", {}).get("docs", [])[:2]

    def _first_paragraph_from_html(html_text: str):
        if not html_text:
            return ""
        m = re.search(r"<p[^>]*>(.*?)</p>", html_text, re.IGNORECASE | re.DOTALL)
        if m:
            p = re.sub(r"<[^>]+>", "", m.group(1))
            return re.sub(r"\s+", " ", p).strip()
        return html_text[:3000]

    def fetch_first_paragraph(url: str):
        try:
            r = httpx.get(url, timeout=6.0, headers={"User-Agent": "Mozilla/5.0"})
            return _first_paragraph_from_html(r.text)
        except Exception:
            return ""

    parsed_articles = []
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor(max_workers=2) as ex:
        futures = []
        for d in docs:
            url = d.get("web_url") or ""
            headline = (d.get("headline") or {}).get("main") if d.get("headline") else d.get("headline")
            abstract = d.get("abstract") or d.get("lead_paragraph") or ""
            fut = loop.run_in_executor(ex, fetch_first_paragraph, url)
            futures.append((fut, headline, url, abstract))
        for fut, headline, url, abstract in futures:
            first_para = await fut
            title_only = not bool(first_para.strip())
            if not first_para:
                first_para = abstract or ""
            parsed_articles.append({
                "headline": headline,
                "url": url,
                "first_paragraph": first_para,
                "title_only": title_only
            })

    while len(parsed_articles) < 2:
        parsed_articles.append({
            "headline": "",
            "url": "",
            "first_paragraph": "",
            "title_only": True
        })

    #gemini prompting
    articles_text = ""
    for i, a in enumerate(parsed_articles, start=1):
        snippet = a["first_paragraph"][:3000]
        if a["title_only"]:
            articles_text += f"Article {i}: TITLE_ONLY: {a['headline']}\n\n"
        else:
            articles_text += f"Article {i}:\nHeadline: {a['headline']}\nFirst paragraph:\n{snippet}\n\n"

    options_json = json.dumps(options)
    prompt = f"""
    Think like a trader. Pick exactly one option from {options}.
    Event: {title} ({subtitle})

    Articles:
    {articles_text}

    If any of the articles are unavailable/cannot be accessed, use any other source in your analysis.

    Return JSON:
    {{"chosen_option": "...", "rating": 0, "rating_label": "...", "confidence": "...", "justification": "..."}}
    """

    resp = client.models.generate_content(
    model=GEMINI_MODEL,
    contents=prompt
)
    raw_output = resp.text

    m = re.search(r"(\{[\s\S]*\})", raw_output)
    parsed = json.loads(m.group(1)) if m else {}

    return {
        "event": {"ticker": ticker, "title": title, "subtitle": subtitle, "options": options},
        "articles_used": parsed_articles,
        "gemini_raw": raw_output,
        "result": parsed
    }