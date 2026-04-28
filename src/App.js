import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Convert scientific functions safely
  const formatExpression = (exp) => {
    return exp
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/√/g, "Math.sqrt")
      .replace(/\^/g, "**");
  };

  const updateResult = (value) => {
    try {
      const res = Function(`return ${formatExpression(value)}`)();
      setResult(res);
    } catch {
      setResult("");
    }
  };

  const handleClick = (val) => {
    const newVal = input + val;
    setInput(newVal);
    updateResult(newVal);
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  const backspace = () => {
    const newVal = input.slice(0, -1);
    setInput(newVal);
    updateResult(newVal);
  };

  const calculate = () => {
    setInput(result.toString());
    setResult("");
  };

  const buttons = [
    "C","⌫","(",")",
    "sin(","cos(","tan(","log(",
    "ln(","√(","^","/",
    "7","8","9","*",
    "4","5","6","-",
    "1","2","3","+",
    "0",".","=",
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={
              btn === "="
                ? "equals"
                : ["+", "-", "*", "/"].includes(btn)
                ? "operator"
                : btn === "C" || btn === "⌫"
                ? "control"
                : ""
            }
            onClick={() => {
              if (btn === "C") clearAll();
              else if (btn === "⌫") backspace();
              else if (btn === "=") calculate();
              else handleClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;