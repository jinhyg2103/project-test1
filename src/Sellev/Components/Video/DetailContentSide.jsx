import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import VideoListItem from './VideoListItem';

class DetailContentSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popularVideo: [
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
                {
                    thumbnail: '/Sellev/assets/img/img_video_1.png',
                    title: '[비하인드] 강식당 화제의 코너! 미래방송 2탄!',
                    playCount: 153,
                    like: 8219
                },
            ],
        }
    }
    render() {
        let popularVideo = this.state.popularVideo.map((item, index) => {
            return (
                <VideoListItem key={index} listItem={item}/>
            );
        });
        return (
            <div>
                <div>인기 영상</div>
                <div>
                    {popularVideo}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailContentSide));