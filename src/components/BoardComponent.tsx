import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayers: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayers }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function clickOnCell(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell?.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayers();
            setSelectedCell(null);
        }
        else {
            if (currentPlayer?.color === cell.figure?.color)
                setSelectedCell(cell)
        }

    }
    useEffect(() => {
        highlightCells()
    }, [selectedCell])

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