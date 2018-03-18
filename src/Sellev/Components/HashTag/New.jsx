import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import NewBody from './NewBody';

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class HashTagNew extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHashTag.newSection}>
                <div className={stylesHashTag.newHeader}>
                    <div className={styles.sectionSmallTitle}>지금 뜨는 해시태그</div>
                    <div className={styles.titleBox}>
                        <div className={styles.sectionTitle}>신규 해시태그</div>
                        <div className={styles.filter}>최신순</div>
                    </div>
                </div>
                <NewBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTagNew));