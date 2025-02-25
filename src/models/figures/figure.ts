import logo from '../../assets/black-king.png'
import { Cell } from '../Cell';
import { Colors } from "../Colors";

export enum FigureNames {
    FIGURE = 'Figure',
    BISHOP = 'Bishop',
    KNIGHT = 'Knight',
    KING = 'King',
    ROOK = 'Rook',
    PAWN = 'Pawn',
    QUEEN = 'Queen',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if(target.figure?.color===this.color ) return false //|| target.figure?.name===FigureNames.KING
        return true;
    }
    moveFigure(target: Cell) {
    }
}

