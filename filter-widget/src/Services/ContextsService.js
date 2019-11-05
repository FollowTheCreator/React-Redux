class ContextsService {
    static getInitialContexts(tables = []) {
        const contexts = [];

        for (let i = 0; i < tables.length; i++) {
            const element = tables[i];
            element.id = tables[i].id || `table${i}`;

            contexts.push({ checked: false, element });
        }

        return contexts;
    }

    static getNewContexts(contexts = [], row = {}) {
        const newContexts = contexts.map((item) => {
            if (item.element.id === row.element.id) {
                return {
                    checked: !item.checked,
                    element: item.element
                };
            }

            return item;
        });

        return newContexts;
    }
}

export default ContextsService;