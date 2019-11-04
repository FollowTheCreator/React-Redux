const MAX_ROW_PREVIEWS = 5;

class Utils {
    static getRowsPreview(allRows) {
        const rows = allRows
            .filter(row => row.checked)
            .map(row => row.element.id);

        return rows.length > MAX_ROW_PREVIEWS ?
            rows.slice(0, MAX_ROW_PREVIEWS).join(", ") + "..." :
            rows.join(", ");
    }

    static getSavedState(defaultSearchType) {
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