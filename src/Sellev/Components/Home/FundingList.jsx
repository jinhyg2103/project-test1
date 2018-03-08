import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components

// Styles
import stylesHome from './Home.css';

// Actions

/*
* this.props.title
* this.props.listItem
*/

class FundingList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        /* FundingBody에서 호출한 Action들(this.props.listItem)을 받아와서 리스트 형태로 뿌려줄 예정 */
        let listItem = this.props.listItem && this.props.listItem.length > 0 ?
            this.props.listItem.map((item, index) => {
                return (
                    <li key={index}>
                        펀딩 마켓 리스트 내용들
                    </li>
                );
            }) : null;
        return (
            <div>
                <div>{this.props.title}</div>
                <ul>
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
})(withRouter(FundingList));