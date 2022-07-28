import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: ()=> void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [blackTime, setBlackTime] = useState(5)
    const [whiteTime, setWhiteTime] = useState(5)
    let timer = useRef<null | ReturnType<typeof setInterval>>(null);
    
    if((blackTime === 0 || whiteTime === 0) && !gameOver){
        setGameOver(prev => !prev)
    } 

    useEffect(() => {
        startTimer()
    }, [currentPlayer])
    
    function restartHandler(){
        restart()
        setBlackTime(5)
        setWhiteTime(5)
        setGameOver(false)
    }

    const startTimer = (gameOver:boolean) => {
            if(timer.current){
                clearInterval(timer.current)
            }
            // const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer() : decrementBlackTimer()
            timer.current = setInterval((gameOver)=>{
                if (currentPlayer?.color === Colors.WHITE){
                    if(!gameOver){
                        setWhiteTime(prev => prev-1)
                    }
                } else{
                    console.log(gameOver)
                    if(!gameOver){
                        setBlackTime(prev => prev-1)
                    }
                }
            }, 1000)
        }

    return (
        <div className='timer'>
            <h2>Black - {blackTime}</h2>
            <button className='myButton' onClick={restartHandler}>Restart</button>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;