import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components

// Styles
import stylesHome from './Home.css';

// Actions

class VideoBody extends React.Component {
    render() {
        return (
            <div className={stylesHome.videoBody}>
                비디오
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoBody));
