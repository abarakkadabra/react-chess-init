import React, { useEffect, useState } from 'react';
import { Board } from './models/Board';

const App = () => {
  
  const [board,setBoard] = useState(new Board());

  useEffect(()=>{
    restart()
  },[])

  function restart(){
    const newBoard = new Board()
    newBoard.initCells()
    setBoard(newBoard)   
  }

  return (
    <div>
    
    </div>
  );
};

export default App;
