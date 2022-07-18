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
    newBoard.getFigures();
    setBoard(newBoard)
  }

  return (
    <div>
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
};

export default App;
