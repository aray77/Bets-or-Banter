#contains query "getting" functionality from searchbar

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchQuery(BaseModel): #holds string "query", which represents user's search term
    query: str


@app.get("/api/test_message") #testing purposes (is connection secure between JS frontend and Python Backend?)
async def get_test_message():
    return {
        "message": "python test complete" 
    }

@app.post("/api/search_events")
async def search_events_test(query: SearchQuery):
    print(f"{query.query}") #sends to front end
    

