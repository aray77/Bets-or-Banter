import os
import httpx
from fastapi import HTTPException

NYT_API_KEY = os.getenv("NYT_API_KEY")
NYT_BASE = "https://api.nytimes.com/svc/search/v2/articlesearch.json"


async def article_search(query: str, page: int = 0):

    params = {
        "q": query,
        "page": page,
        "api-key": NYT_API_KEY,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(NYT_BASE, params=params)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
