from fastapi import FastAPI
from app.routers.kalshi_router import router as kalshi_router

app = FastAPI(
    title="Kalshi Events API Backend",
    version="1.0.0"
)

app.include_router(kalshi_router)

@app.get("/")
def root():
    return {"message": "Kalshi backend API is running"}

from app.routers.nyt_router import router as nyt_router
app.include_router(nyt_router)