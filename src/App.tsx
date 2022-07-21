import React, { useEffect, useState } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.setFigures();
    setBoard(newBoard)
  }

  return (
    <div>
      <button className='myButton' onClick={restart}>Restart</button>
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
};

export default App;
