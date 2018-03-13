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

class BannerBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.listBox} key={this.props.key}>
                <div className={styles.bgImage} style={{ backgroundImage: 'url("' + this.props.bgImage +'")'}} />
                <div className={styles.titleBox}>
                    <div>{this.props.artist}</div>
                    <div>
                        {this.props.title}
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerBody));
