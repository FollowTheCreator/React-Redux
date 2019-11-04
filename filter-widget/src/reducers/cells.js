const cells = (state = [], action) => {
    switch (action.type) {
        case "SET_CELLS":
            return (
                action.payload
            );

        default:
            return state;
    }
}

export default cells;