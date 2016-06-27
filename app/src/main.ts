
import { CellController } from './cell/CellController';
import { GridController } from './grid/GridController';


window.onload = () => {

    let grid = new GridController('grid');

    document.getElementById('inputButton').onclick = () => {

      document.getElementById('grid').innerHTML = '';

      let elem = document.createElement('div');
      elem.id = 'grid' + Math.random();
      document.getElementById('grid').appendChild(elem);

      grid = new GridController(elem.id);

        grid.fillGrid(() => {
            let textArea = <HTMLInputElement>document.getElementById('manual-input');
            let lines = textArea.value.split("\n");
            for (let line of lines) {
                let aux = line.split(',');
                if (aux.length === 2) {
                    grid.getCell(Number(aux[0]), Number(aux[1])).lives();
                }
            }
        });
    }

    let manualTick = new CustomEvent('manual-tick');
    document.getElementById('tickButton').onclick = () => {
        document.getElementById('print-alives').innerHTML = '';
        document.getElementById('print-deads').innerHTML = '';

        grid.tick();
    }
}
