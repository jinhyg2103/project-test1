import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class DetailRelatedHashTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { name: '아이유', bgImage: '/Sellev/assets/img/img_pick_1.png'},
                { name: '아이유', bgImage: '/Sellev/assets/img/img_pick_1.png'},
                { name: '아이유', bgImage: '/Sellev/assets/img/img_pick_1.png'},
                { name: '아이유', bgImage: '/Sellev/assets/img/img_pick_1.png'},
                { name: '아이유', bgImage: '/Sellev/assets/img/img_pick_1.png'},
            ],
        };
    }
    render() {
        let hashTagList = this.state.list.map((item, index) => {
            return (
                <div className={stylesHashTag.hashTagItem}>
                    <div className={stylesHashTag.profile} style={{ backgroundImage: 'url("' + item.bgImage + '")' }}></div>
                    <div className={stylesHashTag.name}>{'#' + item.name}</div>
                </div>
            );
        });
        return (
            <div className={stylesHashTag.relatedHashTagSection}>
                <div className={stylesHashTag.detailSectionTitle}>
                    <div className={stylesHashTag.title}>관련 해시태그</div>
                </div>
                <div className={stylesHashTag.content}>
                    {hashTagList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailRelatedHashTag));