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

    static getCheckedDimensions(headers = [], row = {}) {
        const dimensions = headers.filter(header => {
            if (header.parent.element.id !== row.element.id) {
                return true;
            }

            return false;
        });

        return dimensions;
    }

    static getDimensionTable(contexts = [], row = {}) {
        const table = contexts.find(
            (context) => row.parent.element.id === context.element.id
        ).element;

        return table;
    }

    static getNewDimensions(prevDimensions = [], row = {}) {
        const dimensions = prevDimensions.map((item) => {
            if (item.element.id === row.element.id) {
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
}

export default DimensionsService;