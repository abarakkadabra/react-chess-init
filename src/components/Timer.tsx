import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    setGameOver: (gameOver:boolean) => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, setGameOver  }) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    
    let timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [winnerTitle, setWinnerTitle] = useState<string>('')
    const context = useContext(AppContext)
    
    useEffect(() => {
            if (timer.current) {
                clearInterval(timer.current)
            }
            // const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer() : decrementBlackTimer()
            if (!context?.isfirstMove){
            timer.current = setInterval(() => {
                if (currentPlayer?.color === Colors.WHITE) {
                    if (whiteTime !== 0) {
                        setWhiteTime(prev => prev - 1)
                    } else {
                        setWinnerTitle('Times up! Black won!')
                        setGameOver(true)
                    }
                } else {
                    if (blackTime !== 0) {
                        setBlackTime(prev => prev - 1)
                    } else {
                        setWinnerTitle('Times up! White won!');
                        setGameOver(true)
                    }
                }
            }, 1000)
        }
    }, [currentPlayer, blackTime, whiteTime, winnerTitle])

    function restartHandler() {
        restart()
        setBlackTime(300)
        setWhiteTime(300)
    }

    return (
        <div className='timer'>
            <h1>{winnerTitle}</h1>
            <h2>Black - {blackTime}</h2>
            <button className='myButton' onClick={restartHandler}>Restart</button>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;