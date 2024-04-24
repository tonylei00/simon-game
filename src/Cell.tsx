import "./App.css";

type CellProps = {
  pos: number;
  isBlinking: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

function Cell({ pos, isBlinking, isDisabled, onClick }: CellProps) {
  console.log(pos);
  return (
    <button
      className={[`cell--${pos}`, isBlinking && "cell--activated"]
        .filter(Boolean)
        .join(" ")}
      disabled={isDisabled}
      onClick={onClick}
    ></button>
  );
}

export default Cell;
