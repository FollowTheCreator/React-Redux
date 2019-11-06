import { connect } from 'react-redux';
import App from '../components';

const mapStateToProps = (state, ownProps) => {
    return {
        tables: [...ownProps.tables, ...state.tables]
    };
};

export default connect(
    mapStateToProps
)(App);