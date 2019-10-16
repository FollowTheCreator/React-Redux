import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../services/Utils';

const DESCRIPTION_SIZE = 500;

class Video extends React.Component{
    render(){
        const thisVideo = this.props.video;
        return(
            <div>
                <h3>
                    {thisVideo.snippet.title}
                </h3>
                <img src={thisVideo.snippet.thumbnails.standard.url} alt=""/>
                <p>
                    {Utils.cutString(thisVideo.snippet.description, DESCRIPTION_SIZE)}
                </p>
                <h5>
                    {thisVideo.snippet.channelTitle}
                </h5>
                <p>
                    Views: {thisVideo.statistics.viewCount}
                </p>
                <p>
                    Likes: {thisVideo.statistics.likeCount}
                </p>
                <p>
                    Dislikes: {thisVideo.statistics.dislikeCount}
                </p>
            </div>
        );
    }
}

Video.propTypes = {
    video: PropTypes.object.isRequired
}

export default Video;