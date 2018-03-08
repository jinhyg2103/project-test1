import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


// Styles
import styles from './App.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

const mql = window.matchMedia('(min-width: 768px)');

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className={styles.headerContainer}>
                헤더
            </nav>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));

