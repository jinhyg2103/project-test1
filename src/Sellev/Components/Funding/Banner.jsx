import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class Banner extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div>셀레브 추천</div>
                    <div>오늘의 펀딩&마켓</div>
                </div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Banner));
