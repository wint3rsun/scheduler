import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const [index, setIndex] = useState(0);
  
  function transition(newMode, replace = false) {
    if(replace) {
      setHistory([...history, history[index] = newMode]);
      setMode(newMode);
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
      setIndex(index + 1);
    }
  }

  function back() {  
    setHistory([
      ...history.slice(0,index)
    ])
    setIndex(index - 1);
    setMode(history[(index > 0)?index-1:0]);
  }
  
  return {
    mode,
    transition,
    back
  };
}