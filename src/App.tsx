import React, { useEffect, useState } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import './App.css';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells();
    newBoard.setFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayers(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div>
      <button className='myButton' onClick={restart}>Restart</button>
      <h3>{currentPlayer?.color}'s move</h3>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayers={swapPlayers}/>
    </div>
  );
};

export default App;
