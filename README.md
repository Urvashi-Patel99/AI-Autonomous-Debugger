# 🤖 AI Autonomous Debugger – Backend

## 📌 Overview

This backend system is designed to automatically debug Python code using a combination of:

- Code execution
- Error detection
- AI-based fixing (LLM)
- Rule-based fallback
- Self-healing retry mechanism
- Diff tracking
- Test case validation

The system behaves like a **self-healing debugging agent**.

---

## 🚀 Features

### ✅ 1. Code Execution Engine
- Executes user-submitted Python code
- Captures:
  - Standard output (`stdout`)
  - Errors (`stderr`)

---

### ✅ 2. Error Detection
- Parses runtime errors
- Extracts:
  - Last error line
  - Full traceback

---

### ✅ 3. AI-Based Debugging
- Uses OpenAI LLM to:
  - Understand error
  - Suggest fix
  - Return structured JSON

---

### ✅ 4. Fallback Mechanism
- Handles cases when LLM fails (quota/API issues)
- Example:
  - Division by zero → auto replace with safe value

---

### ✅ 5. Self-Healing Retry Loop
- Automatically retries fix up to 3 times
- Workflow:
  
  
###✅ 6. Test Case Validation
-Validates correctness of fixed code
-Compares:
-Expected output
-Actual output

System Architecture

User Input
↓
FastAPI Route (/debug)
↓
Pipeline (core)
├── Code Execution
├── Error Parser
├── LLM Debugger / Fallback
├── Retry Loop
├── Diff Generator
└── Test Validator
↓
Response (JSON)



Project Structure


backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── core/
│   │   └── pipeline.py
│   ├── routes/
│   │   └── debug.py
│   ├── services/
│   │   ├── executor.py
│   │   ├── error_parser.py
│   │   ├── llm_debugger.py
│   │   └── test_validator.py
│   ├── utils/
│   │   └── diff.py
│   └── models/
│       └── request.py
├── .env
└── requirements.txt


🔗 API Endpoint
POST /debug
Request Body
{
  "code": "a=10\nb=0\nprint(a/b)",
  "test_cases": [
    {
      "input": "",
      "output": "10"
    }
  ]
}

Response Example
{
  "success": true,
  "final_code": "a=10\nb=0\nprint(a/1)",
  "output": "10.0\n",
  "attempts": [
    {
      "attempt": 1,
      "error": {...},
      "fix_explanation": "...",
      "diff": "..."
    }
  ],
  "test_results": [
    {
      "test_case": 1,
      "expected": "10",
      "actual": "10.0",
      "passed": true
    }
  ]
}

⚙️ Setup Instructions
1. Create Virtual Environment
python -m venv venv
venv\Scripts\activate
2. Install Dependencies
pip install -r requirements.txt
3. Add Environment Variables

Create .env file:

OPENAI_API_KEY=your_api_key_here
4. Run Server
python -m uvicorn app.main:app --reload
5. Access API Docs
http://127.0.0.1:8000/docs


Limitations
LLM requires API credits
Test validation is output-based (basic)
Does not fully support stdin-based programs yet
🔮 Future Improvements
Advanced test case engine (stdin support)
Frontend UI (React)
Memory-based debugging (learning from past fixes)
Multi-language support
🏆 Conclusion

This backend demonstrates a complete AI-powered debugging pipeline, combining:

Automation
Intelligence
Reliability

It can serve as a foundation for:

Developer tools
Code assistants
Educational platforms


# 🎨 AI Autonomous Debugger – Frontend

This is the **frontend application** for the AI Autonomous Debugger project.
It provides an interactive UI for writing code, running the debugger, and visualizing fixes and outputs.

---

## 🚀 Features

* 💻 **Monaco Code Editor** (VS Code-like experience)
* 🌙 **Dark / Light Theme Toggle** (with persistence)
* 🤖 **Run & Fix Button** to trigger backend debugging
* ✅ **Execution Output Display**
* 🛠 **Auto-Fixed Code View**
* 🔁 **Diff Visualization** (highlighted changes)
* 🧪 **Test Case Results Display**
* 📋 **Copy to Clipboard** functionality
* ✨ **Smooth Animations** using Framer Motion
* ⏳ **Loading Spinner** during execution

---

## 🛠 Tech Stack

* React (Vite)
* Monaco Editor
* Framer Motion
* React Icons
* Fetch API

---

## 📁 Project Structure

```
frontend/
│── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
│── public/
│── package.json
│── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to frontend folder

```
cd frontend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Install additional libraries

```
npm install @monaco-editor/react framer-motion react-icons
```

### 4️⃣ Start development server

```
npm run dev
```

👉 Open in browser:
http://localhost:5173

---

## 🔌 Backend Connection

Make sure backend is running:

```
python -m uvicorn app.main:app --reload
```

Frontend sends requests to:

```
http://127.0.0.1:8000/debug
```

---

## 🧪 Example Usage

### Input Code

```python
a=10
b=0
print(a/b)
```

### Output

* Fix applied automatically
* Division by zero handled
* Output displayed: `10.0`
* Diff highlights the change

---

## 🎯 Key Highlights

* Real-time debugging experience
* Clean developer-friendly UI
* Visual explanation of code fixes
* Full-stack integration with AI backend

---

## 🚀 Future Improvements

* Add file upload support
* Multi-language support
* Save debugging history
* Deploy to cloud (Vercel / Netlify)

---

## 👨‍💻 Author

Final Year B.Tech CSE Project
AI Autonomous Debugger

---
