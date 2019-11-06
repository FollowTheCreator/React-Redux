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

    static getNewContexts(contexts = [], id) {
        const newContexts = contexts.map((item) => {
            return Object.assign({}, item, {
                checked: item.element.id === id ? !item.checked : item.checked
            });
        });

        return newContexts;
    }
}

export default ContextsService;