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
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
            ]
        })
    }
    render() {
        let videoList = this.state.list.map((item, index) => {
            return (
                <ImageList key={index} type={'video'} listItem={item} />
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
