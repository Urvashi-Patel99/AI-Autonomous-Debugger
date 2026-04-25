import subprocess
import tempfile
import os

def run_code(code: str, language: str):
    try:
        if language == "python":
            with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as f:
                f.write(code.encode())
                file_path = f.name

            result = subprocess.run(
                ["python", file_path],
                capture_output=True,
                text=True,
                timeout=5
            )

        elif language == "javascript":
            with tempfile.NamedTemporaryFile(delete=False, suffix=".js") as f:
                f.write(code.encode())
                file_path = f.name

            result = subprocess.run(
                ["node", file_path],
                capture_output=True,
                text=True,
                timeout=5
            )

        elif language == "cpp":
            with tempfile.NamedTemporaryFile(delete=False, suffix=".cpp") as f:
                f.write(code.encode())
                file_path = f.name

            exe_file = file_path.replace(".cpp", ".exe")

            compile = subprocess.run(
                ["g++", file_path, "-o", exe_file],
                capture_output=True,
                text=True
            )

            if compile.returncode != 0:
                return {"success": False, "stderr": compile.stderr}

            result = subprocess.run(
                [exe_file],
                capture_output=True,
                text=True,
                timeout=5
            )

        else:
            return {"success": False, "stderr": "Unsupported language"}

        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr
        }

    except Exception as e:
        return {"success": False, "stderr": str(e)}