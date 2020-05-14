import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // history.push(mode);

    if (replace) {
      // setMode(history[history.length-1]);
      // history.pop();
      // setHistory([...history, newMode]);
      

      // let newHistory = history;
      // newHistory.pop();
      // setHistory([...newHistory, newMode]);
      setMode(newMode);


    } else {
      setHistory([...history, mode]);
      setMode(newMode);
    }

  }

  function back() {
    if (history.length !== 1) {
      setMode(history[history.length-1]);
      history.pop();
    }

  }

  return { mode, transition, back };
}