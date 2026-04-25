from app.services.executor import run_code

def run_test_cases(code: str, test_cases: list):
    results = []

    for i, test in enumerate(test_cases):
        try:
            execution = run_code(code)

            actual_output = execution["stdout"].strip()
            expected_output = str(test.output).strip()   # ✅ FIX HERE

            passed = actual_output == expected_output

            results.append({
                "test_case": i + 1,
                "expected": expected_output,
                "actual": actual_output,
                "passed": passed
            })

        except Exception as e:
            results.append({
                "test_case": i + 1,
                "error": str(e),
                "passed": False
            })

    return results