import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import RecommendedBody from './RecommendedBody';

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class HashTagRecommended extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHashTag.recommendedSection}>
                <div className={stylesHashTag.recommendedHeader}>
                    <div className={styles.sectionSmallTitle}>셀레브 Pick</div>
                    <div className={styles.titleBox}>
                        <div className={styles.sectionTitle}>추천 해시태그</div>
                    </div>
                </div>
                <RecommendedBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTagRecommended));