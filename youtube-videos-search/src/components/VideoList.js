import React from 'react';
import Video from './Video';
import PropTypes from 'prop-types';

class VideoList extends React.Component{
    constructor(props){
        super(props);

        this.getVideoList = this.getVideoList.bind(this);
    }

    getVideoList(){
        if(this.props.status){
            return <p className="display-1 text-center">Loading...</p>;
        }
        return (
            <ul className="container" style={{listStyle: "none"}}>
                {this.props.videos.map(video => 
                    <li key={video.id}>
                        <Video video={video} />
                    </li>
                )}
            </ul>
        );
    }

    render(){
        return(
            this.getVideoList()
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