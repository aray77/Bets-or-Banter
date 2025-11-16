from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.kalshi_router import router as kalshi_router
from app.routers.nyt_router import router as nyt_router

app = FastAPI(
    title="Kalshi Events API Backend",
    version="1.0.0"
)

app.include_router(nyt_router)

origins = ["http://localhost:3000"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers after middleware
app.include_router(kalshi_router)

@app.get("/")
def root():
    return {"message": "Kalshi backend API is running"}






