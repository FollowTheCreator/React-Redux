import React from 'react';
import Video from './Video';
import PropTypes from 'prop-types';

class VideoList extends React.Component{
    render(){
        const videos = this.props.status ? 
        <p>Loading...</p> : 
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
    status: PropTypes.bool.isRequired,
    videos: PropTypes.array.isRequired
};

VideoList.defaultProps = {
    videos: []
};

export default VideoList;