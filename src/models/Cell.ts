import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number; //react keys
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
        this.figure = figure;
        this.id = Math.random();
        this.available = false;

    }
    setFigure(figure:Figure){
        this.figure=figure;
        this.figure.cell = this;
    }
    moveFigure (target: Cell){
        if (this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target);
            if(target.figure?.color === Colors.WHITE){
                this.board.lostWhiteFigures.push(target.figure)
            }
            if(target.figure?.color === Colors.BLACK){
                this.board.lostBlackFigures.push(target.figure)
            }
            target.setFigure(this.figure);

            

            this.isKingUnderAttack(this.figure)
            this.figure = null;
        }
    }
    
    isKingUnderAttack(figure:Figure|null){
        // let enemyKingCell: number[] = [];
        let enemyKingCell:Cell;
        
        this.board.cells.forEach(cellRow=>{
            cellRow.forEach(cell=>{
                console.log(figure)
                if(cell.figure?.name===FigureNames.KING && figure?.color !== cell.figure.color){
                    enemyKingCell = cell
                    
                }
                if(cell.figure !== undefined && enemyKingCell!==undefined){                
                    
                // console.log('x: ' + curCell.x + 'y: ' + curCell.y + 'colors: ' + this.figure?.color + curCell.figure.color)
                    // enemyKingCell.push(curCell.x);
                    // enemyKingCell.push(curCell.y);
                    // enemyKingCell = this.board.getCell(curCell.x,curCell.y,)
                    
                    // console.log(curCell)
                    // console.log(this.figure?.canMove(curCell))
                    
                    // console.log('isKingUnderAttack cell.figure ' )
                    // console.log(cell.figure)  
                    if(cell.figure?.canMove(enemyKingCell)){  
                        
                        // console.log(cell.figure?.color + 'CHECK!!')
                    }
                
                }
            })
        })
        
    }

    isEmpty(){
        return this.figure === null;
    }
    isEmptyVertical(target:Cell):boolean{
        if (this.x !== target.x) return false
        const min = Math.min(this.y,target.y);
        const max = Math.max(this.y,target.y); 

        for(let y = min+1; y<max; y++){
            if(!this.board.getCell(this.x,y).isEmpty()) return false
        }

        return true;
    }

    isEmptyHorizontal(target:Cell):boolean{
        if (this.y !== target.y) return false
        const min = Math.min(this.x,target.x);
        const max = Math.max(this.x,target.x); 

        for(let x = min+1; x<max; x++){
            if(!this.board.getCell(x,this.y).isEmpty()) return false
        }

        return true;
    }
    isEmptyDiagonal(target:Cell):boolean{
        const absY = Math.abs(target.y - this.y)
        const absX = Math.abs(target.x - this.x)

        if(absX!==absY) return false

        const dy = this.y < target.y ? 1:-1
        const dx = this.x < target.x ? 1:-1

        for (let i = 1; i < absX; i++) {
            if(!this.board.getCell(this.x + dx*i,this.y + dy*i).isEmpty()) return false
        }

        return true;
    }

    isEnemy(target:Cell){
        if(target.figure){
            return this.figure?.color !== target.figure?.color
        }
        return false
    }
}