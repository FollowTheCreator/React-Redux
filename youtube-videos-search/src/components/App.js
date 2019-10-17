import React from 'react';
import Search from '../containers/Search';
import VideoList from './VideoList';
import YouTube from '../services/YouTube';
import InfiniteScroll from 'react-infinite-scroller';
import searchByKeyword from '../actions';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            videos: {},
            lastQueryString: "",
            queryString: "",
            pageToken: "",
            nextPageToken: "",
            prevPageToken: "",
            isLoading: false,
            maxResults: 3
        };

        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    handleChange(queryString){
        this.setState({
            queryString: queryString
        });
    }

    async searchByKeyword() {
        this.setState({
            isLoading: true
        });

        const result = await YouTube.getVideos({
            queryString: this.state.queryString,
            pageToken: this.state.pageToken,
            maxResults: this.state.maxResults
        });
        
        if(result.ok){
            this.setState({
                isLoading: false
            });
        }

        this.setState({
            videos: result.videos,
            nextPageToken: result.nextPageToken,
            prevPageToken: result.prevPageToken
        });
    }

    handlePage(pageToken = ""){
        this.setState({
            pageToken: pageToken
        },
        () => this.searchByKeyword());
    }

    render(){
        return(
            <div>
                <Search onSearchChange={this.handleChange} onSearchSubmit={this.searchByKeyword} queryString={this.state.queryString} />
                <InfiniteScroll
                    loadMore={searchByKeyword}
                    loader={<p>Loading...</p>}
                    hasMore={true}
                >
                    <VideoList videos={this.state.videos.items} status={this.state.isLoading} />
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;