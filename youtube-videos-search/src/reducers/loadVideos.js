export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const initialState = {
    isLoading: false,
    videos: {},
    nextPageToken: "",
    prevPageToken: ""
}

const loadVideos = (state = initialState, {data, type} = {}) => {
    switch (type) {
        case SEARCH_BEGIN:
            return{
                ...state,
                isLoading: true
            }

        case SEARCH_SUCCESS:
            return{
                ...state,
                isLoading: false,
                videos: data.videos,
                nextPageToken: data.nextPageToken,
                prevPageToken: data.prevPageToken
            }

        case SEARCH_ERROR:
            return{
                ...state,
                isLoading: false
            }

        default:
            return {
                ...initialState
            }
    }
}

export default loadVideos;