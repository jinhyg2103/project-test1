import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
// CSS
import styles from '../App/App.css';
import stylesHome from './Home.css';

/*<Link to="/form/login" className={stylesHome.requestBtn + ' ' + styles.redBtn}>
    중개 요청하기
    <i className={'icon icon-ic_arrow_right_line'}></i>
</Link>*/

class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHome.homeContainer}>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HomeView));