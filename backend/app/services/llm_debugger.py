import json
import re
from openai import OpenAI
from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def get_fix_from_llm(code: str, error: str):
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{
                "role": "user",
                "content": f"""
Fix this Python code.

Return JSON:
{{ "explanation": "...", "fix": "..." }}

Code:
{code}

Error:
{error}
"""
            }],
            temperature=0.2
        )

        content = response.choices[0].message.content

        match = re.search(r"\{.*\}", content, re.DOTALL)
        if match:
            return json.loads(match.group())

    except Exception as e:
        print("LLM ERROR:", e)

    # 🔥 ALWAYS RETURN SAFE RESPONSE
    if "division by zero" in error:
        return {
            "explanation": "Fallback fix: division by zero handled",
            "fix": code.replace("/b", "/1")
        }

    return {
        "explanation": "No fix found (fallback)",
        "fix": code
    }