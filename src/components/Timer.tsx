import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(5)
    const [whiteTime, setWhiteTime] = useState(5)
    let timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [winnerTitle, setWinnerTitle] = useState<string>('')

    useEffect(() => {

        if (timer.current) {
            clearInterval(timer.current)
        }
        // const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer() : decrementBlackTimer()
        timer.current = setInterval(() => {
            if (currentPlayer?.color === Colors.WHITE) {
                if (whiteTime !== 0) {
                    setWhiteTime(prev => prev - 1)
                } else {
                    console.log('Times up! Black won!')
                    setWinnerTitle('Times up! Black won!')
                }
            } else {
                if (blackTime !== 0) {
                    setBlackTime(prev => prev - 1)
                } else {

                    console.log('Times up! White won!')
                    setWinnerTitle('Times up! White won!')
                }
            }
        }, 1000)

    }, [currentPlayer, blackTime, whiteTime, winnerTitle])

    function restartHandler() {
        restart()
        setBlackTime(5)
        setWhiteTime(5)
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