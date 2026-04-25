import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
print("API KEY:", OPENAI_API_KEY)
print("KEY:", OPENAI_API_KEY)