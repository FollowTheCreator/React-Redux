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
        const dimensions = [];

        headers.map(header => {
            if(header.parent.element.id !== row.element.id){
                dimensions.push(header);
            }
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

        headers.map(header => {
            if(header.parent.element.id === row.element.id){
                rows.map(item => {
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

        rows.map((item, index) => {
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
        const cells = [];

        rows.map(item => {
            if(item.parent.element.id !== row.element.id){
                cells.push(item);
            }
        });

        return cells;
    }

    static getRowsPreview(allRows){
        const rows = allRows
            .filter(row => row.checked)
            .map(row => row.element.id);

        return rows.length > 5 ? 
            rows.slice(0, 5).join(", ") + "..." :
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