const API_URL = 'https://www.googleapis.com/youtube/v3';
const SEARCH_QUERY = `${API_URL}/search?part=id&type=video&key=${process.env.API_KEY}`;
const VIDEOS_QUERY = `${API_URL}/videos?part=statistics,snippet,id&key=${process.env.API_KEY}`;

class YouTube{
    static async getVideos(data){
        let result = {};
        let videos = {};
        let nextPageToken = "";
        let prevPageToken = "";
        let videosQuery = VIDEOS_QUERY;

        if(data.queryString.trim()){
            const response = await fetch(SEARCH_QUERY + `&q=${data.queryString}&pageToken=${data.pageToken}&maxResults=${data.maxResults}`);
            const videosByKeyword = await response.json();
            nextPageToken = videosByKeyword.nextPageToken;
            prevPageToken = videosByKeyword.prevPageToken;
            const videosId = videosByKeyword.items.map(item => item.id.videoId).join(',');
            videosQuery += `&id=${videosId}`;
            videos = await fetch(videosQuery);
            result = await videos.json();
        }
        else{
            videosQuery += `&chart=mostPopular&pageToken=${data.pageToken}&maxResults=${data.maxResults}`;
            videos = await fetch(videosQuery);
            result = await videos.json();
            nextPageToken = result.nextPageToken;
            prevPageToken = result.prevPageToken;
        }

        return {
            videos: result, 
            nextPageToken: nextPageToken,
            prevPageToken: prevPageToken,
            ok: videos.ok
        };
    }
}

export default YouTube;