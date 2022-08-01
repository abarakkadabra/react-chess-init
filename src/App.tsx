import { useEffect, useState } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import './App.css';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { AppContext } from './context/AppContext';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, ] = useState(new Player(Colors.WHITE))
  const [blackPlayer, ] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [isfirstMove, setIsFirstMove] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => { 
    restart()
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells();
    newBoard.setFigures();
    setGameOver(false);
    setIsFirstMove(true)
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);    
  }

  function swapPlayers() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    if(isfirstMove){
      setIsFirstMove(false)
    } 
  }

  return (

    <div className='content'>
      <AppContext.Provider value={{isfirstMove, gameOver}}>
      <div className="content__header">
        
        <h2> || {currentPlayer?.color} to move ||</h2>
        <div className="scheme__name"></div>
        <div className="misc"></div>
      </div>

      <div className='content__body'>
        <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayers={swapPlayers}/>
        <div className='content__body-right'>
          <LostFigures
            title='White captured pieces:'
            figures={board.lostWhiteFigures}
          />
          <Timer restart={restart} currentPlayer={currentPlayer}  setGameOver={setGameOver} />
          <div className="history"></div>
          <LostFigures
            title='Black captured pieces:'
            figures={board.lostBlackFigures}
          />
        </div>
      </div>
      <div className="content__footer"></div>
      </AppContext.Provider>
    </div>

  );
};

export default App;
