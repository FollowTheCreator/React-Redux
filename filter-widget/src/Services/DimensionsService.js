class DimensionsService {
    static getDimensions(headers = [], row = {}) {
        const dimensions = [];

        for (let i = 0; i < headers.length; i++) {
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

    static getCheckedDimensions(headers = [], id) {
        return headers.filter(header => header.parent.element.id !== id);
    }

    static getDimensionTable(contexts = [], parentId) {
        const table = contexts.find(
            context => parentId === context.element.id
        ).element;

        return table;
    }

    static getNewDimensions(dimensions = [], id) {
        const newDimensions = dimensions.map((item) => {
            return Object.assign({}, item, {
                checked: item.element.id === id ? !item.checked : item.checked
            });
        });

        return newDimensions;
    }
}

export default DimensionsService;