const contexts = (state = [], action) => {
    switch(action.type){
        case "SET_CONTEXTS":
            return (
                action.payload
            );
        default:
            return state;
    }
}

export default contexts;