import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CSS
import styles from '../App/App.css';
import stylesSearch from './Search.css';

class SearchView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesSearch.searchContainer}>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SearchView));