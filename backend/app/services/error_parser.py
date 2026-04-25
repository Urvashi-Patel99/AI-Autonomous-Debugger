def parse_error(stderr: str):
    if not stderr:
        return None

    lines = stderr.strip().split("\n")

    return {
        "last_line": lines[-1],
        "full_error": stderr
    }