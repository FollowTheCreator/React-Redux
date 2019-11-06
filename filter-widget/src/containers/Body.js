import { connect } from 'react-redux';
import Body from '../components/FilterWidgetBody';
import * as ActionCreators from '../actions';
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    return {
        contexts: state.rows.contexts,
        dimensions: state.rows.dimensions,
        cells: state.rows.cells,
        filteredCells: state.rows.filteredCells
    };
};

const mapDispatchToProps = dispatch => {
    const boundActionCreators = bindActionCreators(ActionCreators, dispatch)
    return {
        ...boundActionCreators
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Body);