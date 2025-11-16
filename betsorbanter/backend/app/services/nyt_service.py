import os
import httpx
from fastapi import HTTPException

NYT_API_KEY = os.getenv("NYT_API_KEY")
NYT_BASE = "https://api.nytimes.com/svc/search/v2/articlesearch.json"


async def article_search(query: str, page: int = 0):

    params = {
        "q": query,
        "page": page,
        "api-key": "7mpZ5GuGNNsCA4yJ0rpmBchMb8o1gCqi",
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(NYT_BASE, params=params)
            response.raise_for_status()
            data = response.json()
            data["response"]["docs"] = data["response"]["docs"][:5]
            return data
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
