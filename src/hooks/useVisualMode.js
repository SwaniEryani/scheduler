import { useState } from "react";



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      let newHistory = [...history];
      newHistory = newHistory.slice(0, -1);
      newHistory = [...newHistory, newMode];
      newHistory = newHistory.splice(newHistory.lenagth - 1, 1, newMode);
      setHistory(newHistory);
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
  }

  const back = function () {

    let newHistory = [...history];
    if (newHistory.length > 1) {
      newHistory = newHistory.slice(0, -1);
    }
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);

  }
  return { mode, transition, back };
}
