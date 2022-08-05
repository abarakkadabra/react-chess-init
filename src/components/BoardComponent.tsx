import React, { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { FigureNames } from '../models/figures/Figure';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayers: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayers}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const context = useContext(AppContext)

    function clickOnCell(cell: Cell) {
        if(context?.gameOver){
            return
        }
        if (selectedCell && selectedCell !== cell && selectedCell?.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayers();
            setSelectedCell(null);         
            console.log(checkIfCheck(currentPlayer?.color));
            //check if it is check here...   
        }
        else {
            if (currentPlayer?.color === cell.figure?.color)
                setSelectedCell(cell)
        }

    }
    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function checkIfCheck( color:Colors | undefined) {
            let res:boolean=false
            if (color === undefined){
                return res
            }
            let enemyKingCell: Cell;

            board.cells.forEach(cellRow => {
                cellRow.forEach(cell => {
                    
                    if(cell.figure){
                    if (cell.figure?.name === FigureNames.KING && cell.figure?.color !== color ) {
                        enemyKingCell = cell
                    }
                }
                })
            })
            board.cells.forEach(cellRow => {
                cellRow.forEach(cell => {
                    if(cell.figure){
                    if(enemyKingCell && cell.figure?.canMove(enemyKingCell)){
                        res = true                   
                    }    
                }
                })
                
            })
            return res

    }
    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard()
    }
    function updateBoard() {
        const newBoard = board.getCopyBoard()
        newBoard.lostBlackFigures = board.lostBlackFigures
        newBoard.lostWhiteFigures = board.lostWhiteFigures
        setBoard(newBoard)
    }
    return (
        <div className='board'>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            click={clickOnCell}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            cell={cell}
                            key={cell.id}
                        />
                    )}

                </React.Fragment>)}
        </div>
    );
};

export default BoardComponent;