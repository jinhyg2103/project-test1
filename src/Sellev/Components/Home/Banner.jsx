import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import BannerBody from './BannerBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';
import styles from '../../Styles/App.css';

// Actions

class Banner extends React.Component {
    render() {
        return (
            <div className={stylesHome.bannerSection}>
                <div className={stylesHome.BannerHeader}>
                    <div className={styles.sectionSmallTitle}>셀레브 Pick</div>
                    <div className={styles.sectionWhiteTitle}>놓치지마세요</div>
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
