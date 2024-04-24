import React, { useEffect, useState, useRef } from "react";
import GameBtn from "./GameBtn";

const colors = ["green", "red", "yellow", "blue"];

export default function Game() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [sequenceIdx, setSequenceIdx] = useState(0);

  const greenRef = useRef<HTMLButtonElement>(null);
  const redRef = useRef<HTMLButtonElement>(null);
  const yellowRef = useRef<HTMLButtonElement>(null);
  const blueRef = useRef<HTMLButtonElement>(null);

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!isPlaying) {
      addNewColor();
    }
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
      }, 250);
    }, 0);
  };

  useEffect(() => {
    const displaySequence = (idx = 0) => {
      let ref: React.RefObject<HTMLButtonElement>;

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
        <GameBtn
          backgroundStyle="green"
          ref={greenRef}
          onClick={handleGameBtnClick}
        />
        <GameBtn
          backgroundStyle="red"
          ref={redRef}
          onClick={handleGameBtnClick}
        />
      </div>

      <div>
        <GameBtn
          backgroundStyle="blue"
          ref={blueRef}
          onClick={handleGameBtnClick}
        />
        <GameBtn
          backgroundStyle="yellow"
          ref={yellowRef}
          onClick={handleGameBtnClick}
        />
      </div>

      <button
        className="play-btn"
        onClick={() => {
          // setIsPlaying(true);
          handleNextLevel();
        }}
        disabled={isPlaying}
      >
        Play
      </button>
    </div>
  );
}
