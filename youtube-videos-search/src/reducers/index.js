import {combineReducers} from 'redux';
import loadVideos from './loadVideos';

const youtubeReducer = combineReducers({
    loadVideos
});

export default youtubeReducer;