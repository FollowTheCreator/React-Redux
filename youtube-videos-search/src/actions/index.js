import {
    SEARCH_BEGIN,
    SEARCH_SUCCESS,
    SEARCH_ERROR
} from '../reducers/loadVideos';
import YouTube from '../services/YouTube';

const searchByKeywordBegin = () => ({
    type: SEARCH_BEGIN
});

const searchByKeywordSuccess = data => ({
    type: SEARCH_SUCCESS,
    data
});

const searchByKeywordError = () => ({
    type: SEARCH_ERROR
});

const searchByKeyword = (params) => async dispatch => {
    dispatch(searchByKeywordBegin());

    const result = await YouTube.getVideos({
        queryString: params.queryString,
        pageToken: params.pageToken,
        maxResults: params.maxResults
    });

    if(result.ok){
        dispatch(searchByKeywordSuccess(result));
    }
    else{
        dispatch(searchByKeywordError());
    }
};

export default searchByKeyword;