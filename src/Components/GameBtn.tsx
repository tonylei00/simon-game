import { forwardRef } from "react";

type GameBtnProps = {
  backgroundStyle: string;
  isDisabled?: boolean;
};

const GameBtn = forwardRef<HTMLButtonElement, GameBtnProps>(
  ({ backgroundStyle }, ref) => (
    <button className={`game-btn ${backgroundStyle}`} ref={ref} />
  )
);

export default GameBtn;
