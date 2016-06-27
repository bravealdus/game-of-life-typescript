
import { Helper } from  './Helper';

export class CellController {

    x: number;
    y: number;
    cell: HTMLElement;
    isAlive: boolean;
    change: Function;

    constructor(cell: HTMLElement, x: number, y: number) {
        this.isAlive = false;
        this.cell = cell;
        this.x = x;
        this.y = y;
    }

    watchNeighbors() {
        let alives = 0;
        let deads = 0;

        let around = Helper.getNeighbors(this.x, this.y);

        for (let pos of around) {
            let neighbor = document.getElementById(`${pos[0]},${pos[1]}`);

            if (neighbor != undefined) {
                if (neighbor.classList.contains('alive')) alives++;
                if (neighbor.classList.contains('dead')) deads++;
            }
        }
        this.rules(alives, deads);
    }

    rules(alives: number, deads: number) {
        this.change = this.noChnage;

        if (this.isAlive && alives < 2) this.change = this.dies;
        if (this.isAlive && alives > 3) this.change = this.dies;
        // 2 or 3 alives, lives unchanged
        if (!this.isAlive && alives == 3) this.change = this.lives;
    }

    commitChnage() {
        this.change();
        Helper.printCell(this);
    }

    noChnage() { }

    lives() {
        this.cell.classList.remove('dead');
        this.cell.classList.add('alive');
        this.isAlive = true;
    }

    dies() {
        this.cell.classList.remove('alive');
        this.cell.classList.add('dead');
        this.isAlive = false;
    }

}
