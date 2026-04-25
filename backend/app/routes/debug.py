from fastapi import APIRouter
from app.models.request import DebugRequest
from app.core.pipeline import run_debug_pipeline

router = APIRouter()

@router.post("/")

def debug_code(req: DebugRequest):
    return run_debug_pipeline(req.code, req.language, req.test_cases)