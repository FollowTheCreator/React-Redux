const API_URL = 'https://www.googleapis.com/youtube/v3';
//const API_KEY = 'AIzaSyAKViahE5uxk46ppvgxNM6NKIVDHL8_KTo';
const API_KEY = 'AIzaSyCLyrdmpOMSi7SVR9A2WgzmidyszWH20oo';
const SEARCH_QUERY = `${API_URL}/search?part=id&type=video&key=${API_KEY}`;
const VIDEOS_QUERY = `${API_URL}/videos?part=statistics,snippet,id&key=${API_KEY}`;

class YouTube{
    static async getVideos(props){
        let result = {};
        let videos = {};
        let nextPageToken = "";
        let videosQuery = VIDEOS_QUERY;

        if(props.queryString.trim()){
            const response = await fetch(SEARCH_QUERY + `&q=${props.queryString}&pageToken=${props.pageToken}&maxResults=${props.maxResults}`);
            const videosByKeyword = await response.json();
            nextPageToken = videosByKeyword.nextPageToken;
            const videosId = videosByKeyword.items.map(item => item.id.videoId).join(',');
            videosQuery += `&id=${videosId}`;
            videos = await fetch(videosQuery);
            result = await videos.json();
        }
        else{
            videosQuery += `&chart=mostPopular&pageToken=${props.pageToken}&maxResults=${props.maxResults}`;
            videos = await fetch(videosQuery);
            result = await videos.json();
            nextPageToken = result.nextPageToken;
        }

        return {
            videos: result, 
            nextPageToken: nextPageToken
        };
    }
}

export default YouTube;