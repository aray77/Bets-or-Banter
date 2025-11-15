# app/services/kalshi_service.py
import httpx
from typing import Dict, Any
from app.models.kalshi_models import EventSummary, EventsSummaryResponse

BASE_URL = "https://api.elections.kalshi.com/trade-api/v2"

async def search_events_by_title(keyword: str) -> Dict[str, Any]:
    """
    Search events where the keyword appears in the title.
    Returns only title and sub_title.
    """
    url = f"{BASE_URL}/events"
    params = {"search": keyword}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

    # If API wraps in "data"
    if "data" in data:
        data = data["data"]

    events = []
    for event in data.get("events", []):
        if keyword.lower() in event.get("title", "").lower():
            events.append(EventSummary(title=event["title"], sub_title=event["sub_title"]))

    return EventsSummaryResponse(events=events, cursor=data.get("cursor", "")).dict()
