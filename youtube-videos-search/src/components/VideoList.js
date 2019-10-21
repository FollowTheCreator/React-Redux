import React from 'react';
import Video from './Video';
import PropTypes from 'prop-types';

class VideoList extends React.Component{
    render(){
        const videos = 
        <ul>
            {this.props.videos.map(video => 
                <li key={video.id}>
                    <Video video={video} />
                </li>
            )}
        </ul>;
        
        return(
            videos
        );
    }
}

VideoList.propTypes = {
    videos: PropTypes.array.isRequired
};

VideoList.defaultProps = {
    videos: []
};

export default VideoList;