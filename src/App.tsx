import { useState, useEffect } from "react";
import Cell from "./Cell";
import "./App.css";

const BLINK_INTERVAL = 750;

type GameState = "ready" | "started" | "over";

// function getRandNumber(): number {
//   return Math.floor(Math.random() * 4);
// }

function App() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [level, setLevel] = useState<number[]>([]);
  const [isShowingLevel, setIsShowingLevel] = useState(false);
  const [currentBlinking, setCurrentBlinking] = useState<number>(NaN);

  useEffect(() => {
    if (gameState !== "started") {
      return;
    }

    setIsShowingLevel(true);
    const levelSlice = level.slice();
    const timer = setInterval(() => {
      const curr = levelSlice.shift();

      if (curr) {
        setCurrentBlinking(curr);
      }

      if (levelSlice.length === 0) {
        setCurrentBlinking(NaN);
        setIsShowingLevel(false);
        clearInterval(timer);
      }
    }, BLINK_INTERVAL);
  }, [gameState, level]);

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
                pos={i}
                isBlinking={currentBlinking === i}
                isDisabled={isShowingLevel}
                onClick={() => setGameState("over")}
              />
            );
          })}

      {gameState === "over" && (
        <div className="game-over">
          <div className="score">Score: {level.length}</div>
          <button className="end-btn" onClick={() => setGameState("ready")}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
