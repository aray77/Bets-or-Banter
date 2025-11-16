from fastapi import APIRouter, Query, HTTPException
from app.services.gemini_prompt_service import evaluate_event_title_paragraph

router = APIRouter(prefix="/eval", tags=["evaluation"])

@router.get("/event_title_paragraph")
async def eval_event(ticker: str = Query(...), nyt_query: str = Query(None)):
    try:
        return await evaluate_event_title_paragraph(ticker, nyt_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))