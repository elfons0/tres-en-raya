export default function Square({ value, onSquareClick }) {
  return (
    <div onClick={onSquareClick} className={"square " + value}>
      {value}
    </div>
  );
}
