const filteredCells = (state = [], action) => {
    switch (action.type) {
        case "SET_FILTERED_CELLS":
            return (
                action.payload
            );

        default:
            return state;
    }
}

export default filteredCells;