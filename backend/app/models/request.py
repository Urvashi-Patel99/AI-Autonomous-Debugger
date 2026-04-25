from pydantic import BaseModel
from typing import List, Optional

class DebugRequest(BaseModel):
    code: str
    language: str = "python"   # ✅ NEW
    test_cases: Optional[List] = []