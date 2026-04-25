import difflib

def generate_diff(original: str, fixed: str):
    original_lines = original.splitlines()
    fixed_lines = fixed.splitlines()

    diff = difflib.unified_diff(
        original_lines,
        fixed_lines,
        lineterm=""
    )

    return "\n".join(diff)