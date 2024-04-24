import React, { forwardRef } from "react";

type GameBtnProps = {
  id?: string;
  onClick: (e: React.MouseEvent) => void;
};

const GameBtn = forwardRef<HTMLButtonElement, GameBtnProps>(
  ({ id, onClick }, ref) => (
    <button id={id} className={`game-btn ${id}`} ref={ref} onClick={onClick} />
  )
);

export default GameBtn;
