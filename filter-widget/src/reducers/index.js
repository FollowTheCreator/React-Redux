import { combineReducers } from 'redux';
import tables from './tables';
import rows from './rows';

const reducer = combineReducers({
    tables,
    rows
});

export default reducer;