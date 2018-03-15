import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import ImageList from '../../Common/ImageList';

// Styles
import stylesVideo from '../../Styles/Components/Video.css';

// Actions

class VideoBody extends React.Component {
    componentWillMount() {
        this.setState({
            list: [
                {
                    bgImage: '/Sellev/assets/img/img_video_1.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_2.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_3.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_6.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_7.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_8.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
            ],
        });
    }
    render() {
        let videoList = this.state.list.map((item, index) => {
            return (
                <div className={stylesVideo.videoBox}>
                    <ImageList key={index} type={'video'} listItem={item} />
                </div>
            );
        })
        return (
            <div className={stylesVideo.videoSection}>
                <div className={stylesVideo.videoHeader}>
                    <div className={stylesVideo.sectionSmallTitle}>전체보기</div>
                    <div className={stylesVideo.titleBox}>
                        <div className={stylesVideo.sectionTitle}>인기 동영상</div>
                        <div className={stylesVideo.more}>인기순</div>
                    </div>
                </div>
                <div className={stylesVideo.videoBody}>
                    {videoList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoBody));
