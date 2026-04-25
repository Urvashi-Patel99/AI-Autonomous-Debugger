from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.debug import router as debug_router

app = FastAPI()

app.include_router(debug_router, prefix="/debug")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ✅ only once
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}