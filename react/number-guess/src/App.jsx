import { useState } from "react";
import "./index.css";

export default function App() {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  function checkGuess() {
    const num = Number(guess);

    if (!num) {
      setMessage("Adj meg egy számot!");
      return;
    }

    if (num === target) setMessage("Talált! 🎉");
    else if (num < target) setMessage("Nagyobb számra gondoltam.");
    else setMessage("Kisebb számra gondoltam.");
  }

  return (
    <div className="game">
      <h1>Számkitaláló</h1>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Írd be a tipped (1-100)"
      />

      <button onClick={checkGuess}>Tipp</button>

      <p>{message}</p>
    </div>
  );
}
