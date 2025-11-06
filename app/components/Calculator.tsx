"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && !waitingForOperand) {
      handleEquals();
    }
    setPreviousValue(display);
    setOperation(op);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setPreviousValue("");
    setOperation("");
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue("");
    setOperation("");
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };

  const handleToggleSign = () => {
    const current = parseFloat(display);
    setDisplay(String(current * -1));
  };

  const buttons = [
    { label: "AC", type: "function", handler: handleClear },
    { label: "±", type: "function", handler: handleToggleSign },
    { label: "%", type: "function", handler: handlePercentage },
    { label: "÷", type: "operator", handler: () => handleOperationClick("÷") },
    { label: "7", type: "number", handler: () => handleNumberClick("7") },
    { label: "8", type: "number", handler: () => handleNumberClick("8") },
    { label: "9", type: "number", handler: () => handleNumberClick("9") },
    { label: "×", type: "operator", handler: () => handleOperationClick("×") },
    { label: "4", type: "number", handler: () => handleNumberClick("4") },
    { label: "5", type: "number", handler: () => handleNumberClick("5") },
    { label: "6", type: "number", handler: () => handleNumberClick("6") },
    { label: "-", type: "operator", handler: () => handleOperationClick("-") },
    { label: "1", type: "number", handler: () => handleNumberClick("1") },
    { label: "2", type: "number", handler: () => handleNumberClick("2") },
    { label: "3", type: "number", handler: () => handleNumberClick("3") },
    { label: "+", type: "operator", handler: () => handleOperationClick("+") },
    { label: "0", type: "zero", handler: () => handleNumberClick("0") },
    { label: ".", type: "number", handler: handleDecimal },
    { label: "=", type: "equals", handler: handleEquals },
  ];

  const getButtonStyle = (type: string) => {
    const baseStyle = "text-2xl font-medium transition-all duration-200 active:scale-95 rounded-2xl";

    switch (type) {
      case "function":
        return `${baseStyle} bg-gray-300 hover:bg-gray-400 text-black`;
      case "operator":
      case "equals":
        return `${baseStyle} bg-orange-500 hover:bg-orange-600 text-white`;
      case "zero":
        return `${baseStyle} bg-gray-700 hover:bg-gray-600 text-white col-span-2`;
      default:
        return `${baseStyle} bg-gray-700 hover:bg-gray-600 text-white`;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-black rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="bg-black rounded-2xl p-6 mb-4">
          <div className="text-right">
            <div className="text-gray-500 text-lg h-6 mb-1">
              {previousValue && operation && `${previousValue} ${operation}`}
            </div>
            <div className="text-white text-5xl font-light overflow-hidden text-ellipsis">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.handler}
              className={getButtonStyle(button.type)}
              style={button.type === "zero" ? { gridColumn: "span 2" } : {}}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
