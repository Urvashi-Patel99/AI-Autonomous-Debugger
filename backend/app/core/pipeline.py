from app.services.executor import run_code
from app.services.error_parser import parse_error
from app.services.llm_debugger import get_fix_from_llm
from app.utils.diff import generate_diff

MAX_RETRIES = 3

def run_debug_pipeline(code: str, language: str, test_cases=None):
    if test_cases is None:
        test_cases = []

    current_code = code
    attempts = []

    for attempt in range(1, MAX_RETRIES + 1):

        result = run_code(current_code, language)   # ✅ HERE

        if result["success"]:
            return {
                "success": True,
                "final_code": current_code,
                "output": result["stdout"],
                "attempts": attempts,
                "test_results": []
            }

        error = parse_error(result["stderr"])

        try:
            fix = get_fix_from_llm(current_code, error["last_line"])
            fixed_code = fix["fix"]
            explanation = fix["explanation"]
        except:
            fixed_code = current_code.replace("/b", "/1")  # fallback
            explanation = "Fallback fix applied"

        diff = generate_diff(current_code, fixed_code)

        attempts.append({
            "attempt": attempt,
            "error": error,
            "fix_explanation": explanation,
            "diff": diff
        })

        current_code = fixed_code

    return {
        "success": False,
        "message": "Could not fix after retries",
        "attempts": attempts
    }