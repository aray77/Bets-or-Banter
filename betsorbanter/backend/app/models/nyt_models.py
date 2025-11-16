# app/models/nyt_models.py
from pydantic import BaseModel
from typing import List, Optional

class NYTArticle(BaseModel):
    headline: str
    abstract: str
    web_url: str
    pub_date: Optional[str]

class NYTSearchResponse(BaseModel):
    articles: List[NYTArticle]
