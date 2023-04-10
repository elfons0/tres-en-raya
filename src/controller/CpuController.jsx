import { oneLeft } from "../controller/GameController";

const center = 4;
const corners = [0, 2, 6, 8];
const borders = [1, 3, 5, 7];

const oppositeToCorner = [
  [0, 5, 7],
  [2, 3, 7],
  [6, 1, 5],
  [8, 1, 3],
];

const adjacentToCorner = [
  [0, 1, 3],
  [2, 1, 5],
  [6, 3, 7],
  [8, 5, 7],
];

function easyCPU(squares) {
  return randomSquare(squares);
}

function hardCPU(squares, turn) {
  switch (turn) {
    case 0:
      return moveTurn0();
    case 1:
      return moveTurn1(squares);
    case 2:
      return moveTurn2(squares);
    case 3:
      return moveTurn3(squares);
    case 4:
      return moveTurn4(squares);
    case 5:
      return moveTurn5(squares);

    default:
      return moveOn(squares);
  }
}

function moveTurn0() {
  // random corner
  return corners[randomNum(4)];
}
function moveTurn1(squares) {
  // pick center or corner
  return !squares[center] ? center : corners[randomNum(4)];
}
function moveTurn2(squares) {
  if (squares[center] === "X") {
    const currentCorner = corners.find((corner) => squares[corner] === "O");
    // two possible scenarios - random choose
    if (randomNum(2)) {
      // opposite corner
      return 8 - currentCorner;
    } else {
      // opposite but not corner
      const opposite = oppositeToCorner.find(
        (list) => list[0] === currentCorner
      );
      return opposite.slice(1)[randomNum(2)];
    }
  } else {
    // free center (for the win)
    return center;
  }
}
function moveTurn3(squares) {
  const nextMove = checkBoard(squares);

  if (nextMove === null || squares[nextMove]) {
    const currentCorner = corners.find((corner) => squares[corner] === "O");
    return squares[8 - currentCorner]
      ? randomCorner(squares)
      : randomBorder(squares);
  }

  return nextMove;
}

function moveTurn4(squares) {
  const nextMove = checkBoard(squares);

  return nextMove === null || squares[nextMove]
    ? cornerWithNoAdjacentSymbol(squares, "X")
    : nextMove;
}

function moveTurn5(squares) {
  const nextMove = checkBoard(squares);

  return nextMove === null || squares[nextMove]
    ? cornerWithNoAdjacentSymbol(squares, "O")
    : nextMove;
}

function moveOn(squares) {
  const move = checkBoard(squares);
  return move === null || squares[move] ? randomSquare(squares) : move;
}

function checkBoard(squares) {
  const winMove = oneLeft(squares, "O");
  return winMove === null ? oneLeft(squares, "X") : winMove;
}

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

function randomBorder(squares) {
  let move;
  do {
    move = borders[randomNum(4)];
  } while (squares[move] || squares[8 - move]);
  return move;
}

function randomCorner(squares) {
  for (let c = 0; c < 4; c++) {
    const corner = corners[c];
    if (!squares[corner] && !squares[8 - corner]) {
      const adjacents = adjacentToCorner.find((list) => list[0] === corner);
      if (adjacents.slice(1).every((border) => !squares[border])) {
        return corner;
      }
    }
  }
  return null;
}

function cornerWithNoAdjacentSymbol(squares, symbol) {
  let freeCorners = corners.filter((corner) => !squares[corner]);

  // pick corner to be save
  if (freeCorners.length === 2) {
    return randomCorner(squares);
  }

  // pick winning corner
  // opposite corner free && O adjacent
  freeCorners = freeCorners.filter((corner) => !squares[8 - corner]);
  const adjacents = adjacentToCorner.find((list) => list[0] === freeCorners[0]);
  return adjacents.slice(1).every((border) => squares[border] !== symbol)
    ? freeCorners[0]
    : freeCorners[1];
}

function randomSquare(squares) {
  let move;
  do {
    move = randomNum(9);
  } while (squares[move]);

  return move;
}

export { easyCPU, hardCPU };
