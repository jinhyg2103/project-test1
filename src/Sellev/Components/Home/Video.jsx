import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import VideoBody from './VideoBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class Video extends React.Component {
    render() {
        return (
            <div className={stylesHome.videoSection}>
                <div className={stylesHome.videoHeader}>
                    <div className={stylesHome.sectionSmallTitle}>랭킹</div>
                    <div className={stylesHome.titleBox}>
                        <div className={stylesHome.sectionTitle}>오늘의 동영상</div>
                        <Link to={'/funding'} className={stylesHome.more}>전체보기</Link>
                    </div>
                </div>
                <VideoBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Video));
