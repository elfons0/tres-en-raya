const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return squares.some((cell) => !cell) ? null : "draw";
}

function oneLeft(squares, player){
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (player === squares[a] && squares[a] === squares[b] && !squares[c]) {
      return c;
    }
    if (player === squares[a] && squares[a] === squares[c] && !squares[b]) {
      return b;
    }
    if (player === squares[b] && squares[b] === squares[c] && !squares[a]) {
      return a;
    }
  }

  return null
}

export { winningLines, calculateWinner, oneLeft };
