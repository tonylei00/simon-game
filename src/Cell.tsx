type CellProps = {
  key: number;
  activated: boolean;
  onClick: () => void;
};

function Cell(props: CellProps) {
  return (
    <button key={props.key} className="cell" onClick={props.onClick}></button>
  );
}

export default Cell;
