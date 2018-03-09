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

// Actions

class HashTag extends React.Component {
    render() {
        return (
            <div className={stylesHome.hashTagSection}>
                <div>
                    <div className={stylesHome.sectionSmallTitle}>랭킹</div>
                    <div className={stylesHome.sectionTitle}>해시태그</div>
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
