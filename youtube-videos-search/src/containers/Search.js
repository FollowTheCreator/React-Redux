import {connect} from 'react-redux';
import Search from '../components/Search';
import searchByKeyword from '../actions/index';

const mapStateToProps = (state) => {
    return{
        ...state.youtubeReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        searchByKeyword: () => {
            dispatch(searchByKeyword)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Search);