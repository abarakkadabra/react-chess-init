import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Cell } from "../Cell";
import { Colors } from "../Colors";

export class Pawn extends Figure {
    
    isFirstMove: boolean = true;
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    moveFigure(target: Cell): void {
        this.isFirstMove = false;
    }



    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false
        const direction = this.cell.figure?.color === Colors.BLACK ? 1: -1;
        const firstMoveDirection = this.cell.figure?.color === Colors.BLACK ? 2: -2;


        return true
    }
}