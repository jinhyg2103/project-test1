import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import BubbleBox from '../../Common/BubbleBox';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class HashTagBody extends React.Component {
    render() {
        return (
            <div className={stylesHome.hashTagBody}>
                <BubbleBox />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTagBody));
