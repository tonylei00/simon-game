import { useEffect, useState, useRef } from "react";
import GameBtn from "./GameBtn";

const colors = ["green", "red", "yellow", "blue"];

export default function Game() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    const displaySequence = (idx = 0) => {
      let ref: React.RefObject<HTMLButtonElement> | null = null;

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

      // if (sequence[idx] === "green") {
      //   ref = greenRef;
      // }
      // if (sequence[idx] === "red") {
      //   ref = redRef;
      // }
      // if (sequence[idx] === "yellow") {
      //   ref = yellowRef;
      // }
      // if (sequence[idx] === "blue") {
      //   ref = blueRef;
      // }

      setTimeout(() => {
        if (ref?.current) {
          ref?.current.classList.add("btn-brighten");
        }

        setTimeout(() => {
          if (ref?.current) {
            ref?.current.classList.remove("btn-brighten");
          }
        }, 250);
      }, 250);
    };

    displaySequence();
  }, [sequence]);

  return (
    <div className="game-container">
      <div>
        <GameBtn backgroundStyle="green" ref={greenRef} />
        <GameBtn backgroundStyle="red" ref={redRef} />
      </div>

      <div>
        <GameBtn backgroundStyle="blue" ref={blueRef} />
        <GameBtn backgroundStyle="yellow" ref={yellowRef} />
      </div>

      <button
        className="play-btn"
        onClick={() => {
          handleNextLevel();
          setIsPlaying(true);
        }}
      >
        {isPlaying ? "" : "Play"}
      </button>
    </div>
  );
}
