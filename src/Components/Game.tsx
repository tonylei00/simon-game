import React, { useEffect, useState, useRef } from "react";
import GameBtn from "./GameBtn";

const COLORS = ["green", "red", "yellow", "blue"];

type GameState = "start" | "playing" | "over";
type ButtonRef = React.RefObject<HTMLButtonElement>;

export default function Game() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>("start");
  const [playIdx, setPlayIdx] = useState(0);

  const greenRef = useRef<HTMLButtonElement>(null);
  const redRef = useRef<HTMLButtonElement>(null);
  const yellowRef = useRef<HTMLButtonElement>(null);
  const blueRef = useRef<HTMLButtonElement>(null);

  const addNewColor = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (gameState == "start") {
      addNewColor();
    }
  };

  const resetGame = () => {
    setGameState("start");
    setSequence([]);
    setPlayIdx(0);
  };

  const userInputtedCorrectColor = (color: string): boolean => {
    return sequence[playIdx] === color;
  };

  const userSuccessfullyInputsSequence = (): boolean => {
    return playIdx === sequence.length - 1;
  };

  const handleGameBtnClick = (e: React.MouseEvent) => {
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.classList.add("btn-pop");
      }

      setTimeout(() => {
        if (e.target instanceof HTMLElement) {
          e.target.classList.remove("btn-pop");
        }

        let colorClicked: string | undefined;
        if (e.target instanceof HTMLElement) {
          colorClicked = e.target.id;
        } else {
          throw new Error("color not found");
        }

        if (userInputtedCorrectColor(colorClicked)) {
          if (userSuccessfullyInputsSequence()) {
            setTimeout(() => {
              addNewColor();
              setPlayIdx(0);
            }, 250);
          } else {
            // Sequenced not finished
            setPlayIdx(playIdx + 1);
          }
        } else {
          setGameState("over");
        }
      }, 250);
    }, 0);
  };

  useEffect(() => {
    const displaySequence = (idx = 0) => {
      let ref: ButtonRef;

      switch (sequence[idx]) {
        case "green":
          ref = greenRef;
          break;
        case "red":
          ref = redRef;
          break;
        case "yellow":
          ref = yellowRef;
          break;
        case "blue":
          ref = blueRef;
          break;
      }

      setTimeout(() => {
        if (ref?.current) {
          ref?.current.classList.add("btn-pop");
        }

        setTimeout(() => {
          if (ref?.current) {
            ref?.current.classList.remove("btn-pop");
          }

          if (idx < sequence.length - 1) {
            displaySequence(idx + 1);
          }
        }, 250);
      }, 250);
    };

    displaySequence();
  }, [sequence]);

  return (
    <div className="game-container">
      <div>
        <GameBtn id="green" ref={greenRef} onClick={handleGameBtnClick} />
        <GameBtn id="red" ref={redRef} onClick={handleGameBtnClick} />
      </div>

      <div>
        <GameBtn id="blue" ref={blueRef} onClick={handleGameBtnClick} />
        <GameBtn id="yellow" ref={yellowRef} onClick={handleGameBtnClick} />
      </div>

      <div className="center-circle">
        {gameState === "start" && (
          <button
            className="play-btn"
            onClick={() => {
              setGameState("playing");
              handleNextLevel();
            }}
          >
            Play
          </button>
        )}

        {(gameState === "playing" || gameState === "over") && (
          <div>
            <div className="score">Score: {sequence.length - 1}</div>
            {gameState === "over" && (
              <button className="try-again-btn" onClick={resetGame}>
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
