from pydantic import BaseModel
from typing import List, Optional

class EventSummary(BaseModel):
    title: str
    sub_title: str

class EventsSummaryResponse(BaseModel):
    events: List[EventSummary]
    cursor: str