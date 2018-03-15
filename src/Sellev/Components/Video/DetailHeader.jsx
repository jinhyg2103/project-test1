import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import VideoListItem from './VideoListItem';

// Styles
import stylesVideo from '../../Styles/Components/Video.css';

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class DetailHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selleverVideo: [
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
        let selleverVideo = this.state.selleverVideo.map((item, index) => {
            return (
                <VideoListItem key={index} listItem={item}/>
            );
        });
        return (
            <div>
                <div> {/* 동영상 부분 */}
                    <div>
                        {/* 유튜브 동영상 */}
                        <iframe src="https://youtube.com/embed/VX1iZoLJLFM" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                    <div>
                        <div>HYUKOH(혁오) - TOMBOY M/V촬영현장에서 찍은 비하인드</div>
                        <div>조회수 {parseNumber.numberWithCommas(123677)}회</div>
                    </div>
                    <div>{/* 버튼 */}
                        {parseNumber.numberWithCommas(1200)}
                    </div>
                </div>
                <div> {/* 셀레버 영상 부분 */}
                    <div>셀레버 영상</div>
                    <div>
                        {selleverVideo}
                    </div>
                    <div>더보기</div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailHeader));