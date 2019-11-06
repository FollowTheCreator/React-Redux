class StateService {
    static getSavedState(defaultSearchType) {
        const stateSaved = JSON.parse(localStorage.getItem("stateSaved"));
        const searchType = localStorage.getItem("searchType") || defaultSearchType;
        const sortAsc = JSON.parse(localStorage.getItem("sortAsc"));

        return {
            stateSaved,
            searchType,
            sortAsc
        };
    }

    static setSavedState(savedState) {
        localStorage.setItem("stateSaved", savedState.stateSaved);
        localStorage.setItem("sortAsc", savedState.sortAsc);
        localStorage.setItem("searchType", savedState.searchType);
    }
}

export default StateService;