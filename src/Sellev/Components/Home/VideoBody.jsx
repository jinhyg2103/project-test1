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
import stylesHome from '../../Styles/Components/Home.css';

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
                <div className={stylesHome.videoBox}>
                    <ImageList key={index} type={'video'} listItem={item} />
                </div>
            );
        })
        return (
            <div className={stylesHome.videoBody}>
                {videoList}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoBody));
