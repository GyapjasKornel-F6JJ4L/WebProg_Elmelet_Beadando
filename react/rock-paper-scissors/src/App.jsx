import { useState, useCallback } from "react";
import "./index.css";

const choices = ["Kő", "Papír", "Olló"];

// Tiszta függvény, amit a linter is szeret
function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return "Döntetlen!";

  const win =
    (player === "Kő" && computer === "Olló") ||
    (player === "Papír" && computer === "Kő") ||
    (player === "Olló" && computer === "Papír");

  return win ? "Nyertél!" : "Vesztettél!";
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  // useCallback segít a linternek, hogy ez nem render
  const play = useCallback((choice) => {
    const comp = getRandomChoice();

    setPlayerChoice(choice);
    setComputerChoice(comp);
    setResult(getResult(choice, comp));
  }, []);

  return (
    <div className="game">
      <h1>Kő–Papír–Olló</h1>

      <div className="buttons">
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)}>
            {c}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="results">
          <p>Te: {playerChoice}</p>
          <p>Gép: {computerChoice}</p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}
