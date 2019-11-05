import { connect } from 'react-redux';
import Body from '../components/FilterWidgetBody';
import {
    setContexts,
    setDimensions,
    addDimensions,
    setCells,
    setFilteredCells
} from '../actions';

const mapStateToProps = (state) => {
    return {
        contexts: state.rows.contexts,
        dimensions: state.rows.dimensions,
        cells: state.rows.cells,
        filteredCells: state.rows.filteredCells
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setContexts: (contexts) => dispatch(setContexts(contexts)),
        setDimensions: (dimensions) => dispatch(setDimensions(dimensions)),
        addDimensions: (dimensions) => dispatch(addDimensions(dimensions)),
        setCells: (cells) => dispatch(setCells(cells)),
        setFilteredCells: (filteredCells) => dispatch(setFilteredCells(filteredCells))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Body);