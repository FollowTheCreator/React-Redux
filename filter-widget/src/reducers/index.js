import { combineReducers } from 'redux';
import tables from './tables';
import rows from './rows';
/* import contexts from './contexts';
import dimensions from './dimensions';
import cells from './cells';
import filteredCells from './filteredCells'; */

const reducer = combineReducers({
    tables,
    rows
    /* contexts,
    dimensions,
    cells,
    filteredCells */
});

export default reducer;