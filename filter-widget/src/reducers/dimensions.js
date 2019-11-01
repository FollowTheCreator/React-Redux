const dimensions = (state = [], action) => {
    switch(action.type){
        case "SET_DIMENSIONS":
            return (
                action.payload
            );

        case "ADD_DIMENSIONS":
            return (
                [...state, ...action.payload]
            );

        default:
            return state;
    }
}

export default dimensions;