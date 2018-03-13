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
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class FundingBody extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        /* 이 부분에 listItem 에 들어갈 Action 호출할 예정 */
        this.setState({
            fundingList: [
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
            ],
            hitList: [
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
            ],
            newList: [
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_pick_1.png',
                },
            ]
        })
    }
    render() {
        return (
            <div>
                <FundingList title={'펀딩액순'} listItem={this.state.fundingList} />
                <FundingList title={'조회순'} listItem={this.state.hitList} />
                <FundingList title={'신규'} listItem={this.state.newList} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingBody));
