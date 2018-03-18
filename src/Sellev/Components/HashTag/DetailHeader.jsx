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

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class DetailHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sellever: {
                    profile: '/Sellev/assets/img/img_pick_1.png',
                    name: '아이유',
                    like: 1200,
                },
        };
    }
    render() {
        return (
            <div className={stylesHashTag.detailHeader}>
                <div className={stylesHashTag.bgBox}>
                    <div className={stylesHashTag.bgImage} style={{ backgroundImage: 'url("' + this.state.sellever.profile + '")' }}></div>
                </div>
                <div className={stylesHashTag.profileBox}>
                    <div className={stylesHashTag.name}>{'#' + this.state.sellever.name}</div>
                    <div className={stylesHashTag.like}><div className={stylesHashTag.icon}></div>{parseNumber.numberWithCommas(this.state.sellever.like)}</div>
                    <div className={stylesHashTag.profile} style={{ backgroundImage: 'url("' + this.state.sellever.profile + '")' }}></div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailHeader));