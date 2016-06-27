
import { CellController } from './CellController'

export let Helper = {

    getNeighbors: function(x: number, y: number) {
        return [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            // [x, y],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ];
    },

    printCell: function(cell: CellController) {
      let alives = document.getElementById('print-alives');
      if(cell.isAlive) alives.innerHTML += `${cell.x}, ${cell.y} <br>`;
    }

}
