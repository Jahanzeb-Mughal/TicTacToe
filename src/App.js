import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null)
  const winnings = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]


  const checkWinner = () => {
    for (let combo of winnings) {
      const [a, b, c] = combo;
      if (board[a] === board[b] && board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };
  const allFilled = () => board.every(cell => cell !== null);

  useEffect(() => {


    const winner = checkWinner();
    if (winner) {
      setWinner(winner)
      setBoard(Array(9).fill(null));
      setTimeout(() => {
        setWinner(null)
      }, 1000)
    }
  }, [board])

  const [curr, setCurr] = useState('X')
  const toggleCurr = () => {

    setCurr(curr == 'X' ? 'O' : 'X')
  }
  const handleChange = (index) => {
    if (winner || allFilled()) return;
    const tempBoard = [...board];
    if (tempBoard[index]) return;
    tempBoard[index] = curr;
    setBoard(tempBoard);
    toggleCurr()
  };
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurr('X');
    setWinner(null)
  }
  return (
    <div className="container">
      <h1 className='text-secondary'>Tic-Tac-Toe</h1>
      <div className="Move">
        {`${curr} turn`}
      </div>
      <div className="blocks">
        {board.map((value, index) => (
          <div
            key={index}
            className={`block ${value == 'X' ? 'text-danger' : 'text-success'} fw-bold `}
            id={`block-${index}`}
            onClick={() => handleChange(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="text-success cd">
        {winner ? `${winner} won ` : allFilled() ? 'Draw' : ''}

      </div>
      <button className='mt-4' onClick={resetBoard}>Reset</button>
    </div>

  );
}

export default App;
