import { combineReducers } from 'redux';
import tables from './tables';
import contexts from './contexts';
import dimensions from './dimensions';
import cells from './cells';
import filteredCells from './filteredCells';

const reducer = combineReducers({
    tables,
    contexts,
    dimensions,
    cells,
    filteredCells
});

export default reducer;