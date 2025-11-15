# app/routers/kalshi_router.py
from fastapi import APIRouter, Query
from app.services.kalshi_service import search_events_by_title
from app.models.kalshi_models import EventsSummaryResponse

router = APIRouter(prefix="/kalshi", tags=["kalshi-events"])

@router.get("/events/search_title", response_model=EventsSummaryResponse)
async def search_title(keyword: str = Query(..., min_length=1)):
    return await search_events_by_title(keyword)
