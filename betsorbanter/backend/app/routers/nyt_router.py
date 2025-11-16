from fastapi import APIRouter, Query
from app.services.nyt_service import article_search

router = APIRouter(prefix="/nyt", tags=["nyt"])

@router.get("/search")
async def search_articles(q: str = Query(..., min_length=1), page: int = 0):
    return await article_search(q, page)
