import { useState } from "react";
import "./App.css";
import useToast from "./notifications/notificationContext";

function App() {
  const { addToast } = useToast();

  const [counter, setCounter] = useState(0);

  function success() {
    addToast({ message: `Success message ${counter}`, severity: "success" });
    setCounter(counter + 1);
  }

  function info() {
    addToast({ message: `Info message ${counter}`, severity: "info" });
    setCounter(counter + 1);
  }

  function warning() {
    addToast({ message: `Warning message ${counter}`, severity: "warning" });
    setCounter(counter + 1);
  }

  function error() {
    addToast({ message: `Error message ${counter}`, severity: "error" });
    setCounter(counter + 1);
  }

  return (
    <div className='App'>
      <button onClick={success}>success</button>
      <button onClick={info}>info</button>
      <button onClick={warning}>warning</button>
      <button onClick={error}>error</button>
    </div>
  );
}

export default App;
