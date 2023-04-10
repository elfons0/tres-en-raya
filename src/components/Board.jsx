import { useState, useEffect } from "react";
import Square from "./Square";
import { calculateWinner } from "../controller/GameController";
import { startConfetti, stopConfetti } from "./Confetti";
import { easyCPU, hardCPU } from "../controller/CpuController";

export default function Board() {
  const initial = Array(9).fill("");

  const [xturn, setXturn] = useState(true);
  const [squares, setSquares] = useState(initial);
  const [gameMode, setGameMode] = useState(null);
  const [turn, setTurn] = useState(0);

  function doMove(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = xturn ? "X" : "O";
    setSquares(nextSquares);
    setXturn(!xturn);
    setTurn(turn + 1);
  }

  function handleClick(index) {
    doMove(index);
  }

  function resetBoard() {
    stopConfetti();
    setSquares(initial);
    setTurn(0);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    if (winner === "draw") {
      status = "Empate";
    } else {
      status = (
        <div>
          {"Ganador: "}
          <span className={winner + " minisquare"}>{winner}</span>
        </div>
      );
      startConfetti();
    }
  } else {
    const nextTurn = xturn ? "X" : "O";
    status = (
      <div>
        {"Siguiente jugador: "}
        <span className={nextTurn + " minisquare"}>{nextTurn}</span>
      </div>
    );
  }

  useEffect(() => {
    if (!winner && !xturn) {
      if (gameMode === "easy") {
        doMove(easyCPU(squares));
      } else if (gameMode === "hard") {
        const cpuMove = hardCPU(squares, turn);
        console.log(`CPU: ${cpuMove}, turn: ${turn}`);
        doMove(cpuMove);
      }
    }
  });

  return (
    <>
      {!gameMode && (
        <div className="buttons">
          <button onClick={() => setGameMode("player")}>Dos Jugadores</button>
          <button onClick={() => setGameMode("easy")}>CPU (Facil)</button>
          <button onClick={() => setGameMode("hard")}>CPU (Dificil)</button>
        </div>
      )}

      {gameMode && (
        <>
          <div className="board">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
          <div className="status">{status}</div>

          {winner && <button onClick={resetBoard}>Siguiente Ronda</button>}
        </>
      )}
    </>
  );
}
