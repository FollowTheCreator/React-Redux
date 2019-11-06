class CellsService {
    static getContextsCells(headers = [], rows = [], id) {
        const cells = [];

        headers.forEach(header => {
            if (header.parent.element.id === id) {
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

        rows.slice(1).forEach(item => {
            const cell = item.cells[row.index];
            cell.id = cell.innerText;

            cells.push({
                checked,
                parent: row,
                element: cell
            });
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

    static getCheckedCells(rows = [], id) {
        return rows.filter(item => item.parent.element.id !== id);
    }
}

export default CellsService;