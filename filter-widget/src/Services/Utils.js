const MAX_ROW_PREVIEWS = 5;

class Utils{
    static getInitialContexts(tables = []){
        const contexts = [];

        for(let i = 0; i < tables.length; i++){
            const element = tables[i];
            element.id = tables[i].id || `table${i}`;

            contexts.push({checked: false, element});
        }

        return contexts;
    }

    static getNewContexts(contexts = [], row = {}){
        const newContexts = contexts.map((item) => {
            if(item.element.id === row.element.id){
                return {
                    checked: !item.checked, 
                    element: item.element
                };
            }

            return item;
        });

        return newContexts;
    }

    static getDimensions(headers = [], row = {}){
        const dimensions = [];
    
        for(let i = 0; i < headers.length; i++){
            const header = headers[i];
            header.id = `${row.element.id}/${header.innerText}`;

            dimensions.push({
                checked: false,
                parent: row,
                element: header,
                index: i
            });
        }

        return dimensions;
    }

    static getCheckedDimensions(headers = [], row = {}){
        const dimensions = headers.filter(header => {
            if(header.parent.element.id !== row.element.id){
                return true;
            }

            return false;
        });

        return dimensions;
    }

    static getDimensionTable(contexts = [], row = {}){
        const table = contexts.find(
            (context) => row.parent.element.id === context.element.id
        )
        .element;

        return table;
    }

    static getNewDimensions(prevDimensions = [], row = {}){
        const dimensions = prevDimensions.map((item) => {
            if(item.element.id === row.element.id){
                return {
                    checked: !item.checked, 
                    element: item.element,
                    parent: item.parent,
                    index: item.index
                };
            }

            return item;
        });

        return dimensions;
    }

    static getContextsCells(headers = [], rows = [], row = {}){
        const cells = [];

        headers.forEach(header => {
            if(header.parent.element.id === row.element.id){
                rows.forEach(item => {
                    if(item.parent.parent.element.id !== header.parent.element.id){
                        if(!cells.includes(item)){
                            cells.push(item);
                        }
                    }
                });
            }
        });

        return cells;
    }

    static getDimensionsCells(rows = [], row = {}, checked = false){
        const cells = [];

        rows.forEach((item, index) => {
            if(index > 0){
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

    static getSortedCells(sortAsc = true, prevCells = [], cells = []){
        const sortedCells = [...prevCells, ...cells]
            .sort(
                (cell1, cell2) => 
                    cell1.element.innerText > cell2.element.innerText 
                    ? sortAsc ? 1 : -1 
                    : sortAsc ? -1 : 1
            );

        return sortedCells;
    }

    static getCheckedCells(rows = [], row = {}){
        const cells = rows.filter(item => {
            if(item.parent.element.id !== row.element.id){
                return true;
            }

            return false;
        });

        return cells;
    }

    static getRowsPreview(allRows){
        const rows = allRows
            .filter(row => row.checked)
            .map(row => row.element.id);

        return rows.length > MAX_ROW_PREVIEWS ? 
            rows.slice(0, MAX_ROW_PREVIEWS).join(", ") + "..." :
            rows.join(", ");
    }

    static getSavedState(defaultSearchType){
        const stateSaved = JSON.parse(localStorage.getItem("stateSaved"));
        const searchType = localStorage.getItem("searchType") || defaultSearchType;
        const sortAsc = JSON.parse(localStorage.getItem("sortAsc"));

        return {
            stateSaved,
            searchType,
            sortAsc
        };
    }
}

export default Utils;