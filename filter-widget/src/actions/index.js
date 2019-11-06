export const setContextsBegin = () => ({
    type: "SET_CONTEXTS_BEGIN"
});
export const setContextsSuccess = (payload) => ({
    type: "SET_CONTEXTS_SUCCESS",
    payload
});
export const setContexts = (payload) => (dispatch) => {
    dispatch(setContextsBegin());

    return setTimeout(() => {
        dispatch(setContextsSuccess(payload))
    }, 5000);
};

export const setDimensions = (payload) => ({
    type: "SET_DIMENSIONS",
    payload
});
export const addDimensions = (payload) => ({
    type: "ADD_DIMENSIONS",
    payload
});

export const setCells = (payload) => ({
    type: "SET_CELLS",
    payload
});

export const setFilteredCells = (payload) => ({
    type: "SET_FILTERED_CELLS",
    payload
});