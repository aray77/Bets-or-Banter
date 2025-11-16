from pydantic import BaseModel
from typing import List, Optional

class EventSummary(BaseModel):
    title: str
    sub_title: str

class EventsSummaryResponse(BaseModel):
    events: List[EventSummary]
    cursor: str

# class Market(BaseModel):
#     no_sub_title: Optional[str] = None
#     yes_sub_title: Optional[str] = None