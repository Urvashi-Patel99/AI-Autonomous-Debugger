import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";


function App() {
  const [code, setCode] = useState("a=10\nb=0\nprint(a/b)");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");

  // 🌙 Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // 🌙 Save theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🌐 Auto change code when language changes
  useEffect(() => {
    if (language === "python") setCode("print('Hello')");
    else if (language === "javascript") setCode("console.log('Hello')");
    else if (language === "cpp")
      setCode(`#include <iostream>
using namespace std;

int main() {
  cout << "Hello";
  return 0;
}`);
  }, [language]);

  const styles = getStyles(theme);

  const runDebugger = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,   // ✅ FIXED
          test_cases: []
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Backend connection failed" });
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDiff = (diff) => {
    return diff.split("\n").map((line, i) => {
      let color = theme === "dark" ? "#e2e8f0" : "#0f172a";
      if (line.startsWith("+")) color = "#22c55e";
      else if (line.startsWith("-")) color = "#ef4444";

      return (
        <div key={i} style={{ color }}>
          {line}
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤖 AI Autonomous Debugger</h1>

      {/* 🌙 Theme Toggle */}
      <button
        style={styles.toggleBtn}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* 🌐 Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.toggleBtn}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
      </select>

      {/* Editor */}
      <motion.div
        style={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3>📝 Code Editor</h3>
        <Editor
          height="300px"
          defaultLanguage={language === "cpp" ? "cpp" : language}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={code}
          onChange={(value) => setCode(value)}
        />
      </motion.div>

      {/* Run Button */}
      <button style={styles.button} onClick={runDebugger}>
        {loading ? "Running..." : "Run & Fix"}
      </button>

      {/* Spinner */}
      {loading && <div style={styles.spinner}></div>}

      {/* Results */}
      {result && (
        <motion.div
          style={styles.resultContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <div style={styles.card}>
                <h3>
                  ✅ Output
                  <FaCopy
                    onClick={() => copyToClipboard(result.output)}
                    style={styles.copy}
                  />
                </h3>
                <pre style={styles.output}>{result.output}</pre>
              </div>

              <div style={styles.card}>
                <h3>
                  🛠 Fixed Code
                  <FaCopy
                    onClick={() => copyToClipboard(result.final_code)}
                    style={styles.copy}
                  />
                </h3>
                <pre>{result.final_code}</pre>
              </div>

              <div style={styles.card}>
                <h3>🔁 Attempts</h3>
                {result.attempts?.length === 0 ? (
                  <p>No fixes needed</p>
                ) : (
                  result.attempts.map((a, i) => (
                    <div key={i}>
                      <b>Attempt {a.attempt}</b>
                      <div style={styles.diffBox}>
                        {formatDiff(a.diff)}
                      </div>
                      <p>{a.fix_explanation}</p>
                    </div>
                  ))
                )}
              </div>

              <div style={styles.card}>
                <h3>🧪 Test Results</h3>
                {result.test_results?.length === 0 ? (
                  <p>No test cases provided</p>
                ) : (
                  <pre>
                    {JSON.stringify(result.test_results, null, 2)}
                  </pre>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const getStyles = (theme) => ({
  container: {
    background: theme === "dark" ? "#0f172a" : "#f1f5f9",
    minHeight: "100vh",
    padding: "30px",
    color: theme === "dark" ? "#e2e8f0" : "#0f172a",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: theme === "dark" ? "#1e293b" : "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  toggleBtn: {
    marginBottom: "10px",
    padding: "8px",
    cursor: "pointer",
  },
  output: {
    background: theme === "dark" ? "#020617" : "#e2e8f0",
    padding: "10px",
    borderRadius: "8px",
    color: "#22c55e",
  },
  resultContainer: {
    marginTop: "20px",
  },
  diffBox: {
    background: "#020617",
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "monospace",
  },
  copy: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  spinner: {
    marginTop: "10px",
    border: "4px solid #ccc",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
  },
});

export default App;