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

class DetailRelatedSellever extends React.Component {
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
        let selleverList = this.state.list.map((item, index) => {
           return (
               <div className={stylesHashTag.profileItem}>
                   <div className={stylesHashTag.profile} style={{ backgroundImage: 'url("' + item.bgImage + '")'}}></div>
                   <div className={stylesHashTag.name}>{item.name}</div>
               </div>
           );
        });
        return (
            <div className={stylesHashTag.relatedSelleverSection}>
                <div className={stylesHashTag.detailSectionTitle}>
                    <div className={stylesHashTag.title}>관련 셀레버</div>
                </div>
                <div className={stylesHashTag.content}>
                    {selleverList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailRelatedSellever));