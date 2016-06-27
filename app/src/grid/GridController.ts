
import { CellController } from '../cell/CellController';

export class GridController {

    containerElem: HTMLElement;
    grid: CellController[][];
    size: number;

    // events
    fillGridDone: Event;

    cells: Array<CellController>;

    constructor(id: string) {
        this.containerElem = document.getElementById(id);
        this.fillGridDone = new CustomEvent('fill-grid-done');
        this.size = 20; //make it more dynamic?
        this.grid = [];
        while (this.grid.push([]) < this.size);
    }

    getCell(x: number, y: number){
      return this.grid[x][y];
    }

    fillGrid(callback: Function) {
        this.containerElem.innerHTML = '';

        document.addEventListener('fill-grid-done', function(e) {
            callback()
        });

        for (let x in this.grid) {
            for (let y in this.grid) {
                this.createNewElement(Number(x), Number(y));
            }
        }
    }

    tick(){
      for (let x in this.grid) {
          for (let y in this.grid) {
              this.grid[x][y].watchNeighbors();
          }
      }
      for (let x in this.grid) {
          for (let y in this.grid) {
              this.grid[x][y].commitChnage();
          }
      }
    }

    createNewElement(x: number, y: number) {
        setTimeout(() => {
            let elem = document.createElement('div');
            elem.id = `${x},${y}`;
            elem.className = `gridPosition ${y === 0 ? 'row' : ''}`;
            this.containerElem.appendChild(elem);
            this.grid[x][y] = new CellController(elem, x, y);

            if (x == (this.size - 1) && y == (this.size - 1)) {
                document.dispatchEvent(this.fillGridDone);
            }
        }, 50);
    }
}
