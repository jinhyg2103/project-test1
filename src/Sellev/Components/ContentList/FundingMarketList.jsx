import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components

// Styles
import stylesContent from '../../Styles/Components/ContentList.css';

// Actions

/*
* this.props.title
* this.props.listItem
*/

class FundingMarketList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        /* FundingBody에서 호출한 Action들(this.props.listItem)을 받아와서 리스트 형태로 뿌려줄 예정 */
        let listItem = this.props.listItem && this.props.listItem.length > 0 ?
            this.props.listItem.map((item, index) => {
                return (
                    <li key={index} className={stylesContent.item}>
                        <div>{/*번호*/}{index + 1}</div>
                        <div>{item.title}</div>
                        <div>{item.name}</div>
                    </li>
                );
            }) : null;
        return (
            <div className={stylesContent.FundingMarketListBox}>
                <div className={stylesContent.listTItle}>{this.props.title}</div>
                <div className={stylesContent.listImg} style={{width: '100%', height: '172px', backgroundImage: 'url("' + this.props.listItem[0].bgImage + '")'}}></div>
                <ul className={stylesContent.itemListBox}>
                    {listItem}
                </ul>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketList));
