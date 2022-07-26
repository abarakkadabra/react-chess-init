import React, { useEffect, useState } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import './App.css';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';

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

  function swapPlayers() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (

    <div className='content'>
      <div className="content__header">
        <button className='myButton' onClick={restart}>Restart</button>
        <h2> || {currentPlayer?.color} to move ||</h2>
        <div className="scheme__name"></div>
        <div className="misc"></div>
      </div>

      <div className='content__body'>
        <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayers={swapPlayers} />
        <div className='content__body-right'>
          <LostFigures
            title='White captured pieces:'
            figures={board.lostWhiteFigures}
          />
          <div className="history"></div>
          <LostFigures
            title='Black captured pieces:'
            figures={board.lostBlackFigures}
          />

        </div>
      </div>
      <div className="content__footer"></div>

    </div>

  );
};

export default App;
