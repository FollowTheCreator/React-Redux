import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../services/Utils';

const DESCRIPTION_SIZE = 500;

class Video extends React.Component{
    render(){
        const thisVideo = this.props.video;
        return(
            <div className="card mt-5">
                <h3 className="card-header">
                    {thisVideo.snippet.title}
                </h3>
                <div className="card-body">
                    <img className="card-img-top" src={thisVideo.snippet.thumbnails.standard.url} alt=""/>
                    <p className="card-text">
                        {Utils.truncate(thisVideo.snippet.description, DESCRIPTION_SIZE)}
                    </p>
                    <h5 className="card-title">
                        {thisVideo.snippet.channelTitle}
                    </h5>
                    <p className="card-subtitle text-muted">
                        Views: {thisVideo.statistics.viewCount}
                    </p>
                    <p className="card-subtitle text-muted">
                        👍 {thisVideo.statistics.likeCount}
                    </p>
                    <p className="card-subtitle text-muted">
                        👎 {thisVideo.statistics.dislikeCount}
                    </p>
                </div>
            </div>
        );
    }
}

Video.propTypes = {
    video: PropTypes.object.isRequired
}

export default Video;