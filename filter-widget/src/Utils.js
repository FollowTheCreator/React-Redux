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
}

export default Utils;