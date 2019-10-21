import React from 'react';
import Search from '../containers/Search';
import VideoList from './VideoList';
import YouTube from '../services/YouTube';
import InfiniteScroll from 'react-infinite-scroller';
import searchByKeyword from '../actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            queryString: "",
            pageToken: "",
            nextPageToken: "",
            maxResults: 3
        };

        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchByClick = this.searchByClick.bind(this);
    }

    handleChange(queryString) {
        this.setState({
            queryString: queryString
        });
    }

    async searchByKeyword() {
        const result = await YouTube.getVideos({
            queryString: this.state.queryString,
            pageToken: this.state.pageToken,
            maxResults: this.state.maxResults
        });

        let videos = this.state.videos;
        videos.push(...result.videos.items);

        this.setState({
            videos: videos,
            pageToken: result.nextPageToken
        });
    }

    async searchByClick(){
        this.setState({
            videos: [],
            pageToken: ""
        },
        () => searchByKeyword());
    }

    render() {
        return (
            <div>
                <Search onSearchChange={this.handleChange} onSearchSubmit={this.searchByClick} queryString={this.state.queryString} />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.searchByKeyword}
                    hasMore={true}
                    loader={<p key={0}>Loading...</p>}
                >
                    <VideoList videos={this.state.videos} />
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;