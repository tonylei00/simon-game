import { useState } from "react";
import Cell from "./Cell";
import "./App.css";

type GameState = "ready" | "started" | "over";

function getRandNumber(): number {
  return Math.floor(Math.random() * 4);
}

function App() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [score, setScore] = useState(0);
  // const [level, setLevel] = useState<number[]>([0, 1, 2]);
  // const [isShowingLevel, setIsShowingLevel] = useState(false);

  return (
    <div className={`container-${gameState}`}>
      {gameState === "ready" && (
        <button className="start-btn" onClick={() => setGameState("started")}>
          Start
        </button>
      )}

      {gameState === "started" &&
        Array(4)
          .fill(null)
          .map((_, i) => {
            return (
              <Cell
                key={i}
                activated={false}
                onClick={() => setGameState("over")}
              />
            );
          })}

      {gameState === "over" && (
        <div className="game-over">
          <div className="score">Score: {score}</div>
          <button className="end-btn" onClick={() => setGameState("ready")}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
