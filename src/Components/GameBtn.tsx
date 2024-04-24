import React, { forwardRef } from "react";

type GameBtnProps = {
  backgroundStyle: string;
  onClick: (e: React.MouseEvent) => void;
};

const GameBtn = forwardRef<HTMLButtonElement, GameBtnProps>(
  ({ backgroundStyle, onClick }, ref) => (
    <button
      className={`game-btn ${backgroundStyle}`}
      ref={ref}
      onClick={onClick}
    />
  )
);

export default GameBtn;
