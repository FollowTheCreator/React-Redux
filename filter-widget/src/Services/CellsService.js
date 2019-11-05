class CellsService {
    static getContextsCells(headers = [], rows = [], row = {}) {
        const cells = [];

        headers.forEach(header => {
            if (header.parent.element.id === row.element.id) {
                rows.forEach(item => {
                    if (item.parent.parent.element.id !== header.parent.element.id) {
                        if (!cells.includes(item)) {
                            cells.push(item);
                        }
                    }
                });
            }
        });

        return cells;
    }

    static getDimensionsCells(rows = [], row = {}, checked = false) {
        const cells = [];

        rows.forEach((item, index) => {
            if (index > 0) {
                const cell = item.cells[row.index];
                cell.id = cell.innerText;

                cells.push({
                    checked,
                    parent: row,
                    element: cell
                });
            }
        });

        return cells;
    }

    static getSortedCells(sortAsc = true, prevCells = [], cells = []) {
        const sortedCells = [...prevCells, ...cells]
            .sort(
                (cell1, cell2) =>
                    cell1.element.innerText > cell2.element.innerText
                        ? sortAsc ? 1 : -1
                        : sortAsc ? -1 : 1
            );

        return sortedCells;
    }

    static getCheckedCells(rows = [], row = {}) {
        const cells = rows.filter(item => {
            if (item.parent.element.id !== row.element.id) {
                return true;
            }

            return false;
        });

        return cells;
    }
}

export default CellsService;