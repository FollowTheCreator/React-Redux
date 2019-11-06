const initialState = {
    contexts: [],
    dimensions: [],
    cells: [],
    filteredCells: []
}

const rows = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CONTEXTS_BEGIN":
            return state;
        case "SET_CONTEXTS_SUCCESS":
            return Object.assign({}, state, {
                contexts: action.payload
            });

        case "SET_DIMENSIONS":
            return Object.assign({}, state, {
                dimensions: action.payload
            });
        case "ADD_DIMENSIONS":
            return Object.assign({}, state, {
                dimensions: [...state.dimensions, ...action.payload]
            });

        case "SET_CELLS":
            return Object.assign({}, state, {
                cells: action.payload
            });

        case "SET_FILTERED_CELLS":
            return Object.assign({}, state, {
                filteredCells: action.payload
            });

        default:
            return state;
    }
}

export default rows;