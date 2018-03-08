import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components
import FundingList from './FundingList';

// Styles
import stylesHome from './Home.css';

// Actions

class FundingBody extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        /* 이 부분에 listItem 에 들어갈 Action 호출할 예정 */
    }
    render() {
        return (
            <div>
                <FundingList title={'펀딩액순'} listItem={''}/>
                <FundingList title={'조회순'} listItem={''} />
                <FundingList title={'신규'} listItem={''} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingBody));
