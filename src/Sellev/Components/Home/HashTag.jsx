import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HashTagBody from './HashTagBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';
import styles from '../../Styles/App.css';

// Actions

class HashTag extends React.Component {
    render() {
        return (
            <div className={stylesHome.hashTagSection}>
                <div className={stylesHome.hashTagHeader}>
                    <div className={styles.sectionSmallTitle}>랭킹</div>
                    <div className={styles.titleBox}>
                        <div className={styles.sectionTitle}>해시태그</div>
                        <Link to={'/funding'} className={styles.more}>전체보기</Link>
                    </div>
                </div>
                <HashTagBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTag));

