import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import BannerBody from './BannerBody';

// Styles
import stylesVideo from '../../Styles/Components/Video.css';

// Actions

class Banner extends React.Component {
    render() {
        return (
            <div className={stylesVideo.bannerSection}>
                <div className={stylesVideo.BannerHeader}>
                    <div className={stylesVideo.sectionSmallTitle}>셀레브 Pick</div>
                    <div className={stylesVideo.sectionTitle}>오늘의 동영상</div>
                </div>
                <BannerBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Banner));
