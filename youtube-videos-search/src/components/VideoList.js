import React from 'react';
import Video from './Video';
import PropTypes from 'prop-types';

class VideoList extends React.Component{
    render(){
        const videos = this.props.status ? 
        <p className="display-1 text-center">Loading...</p> : 
        <ul className="container" style={{listStyle: "none"}}>
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