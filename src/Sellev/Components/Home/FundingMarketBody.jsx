import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components
import FundingMarketList from './FundingMarketList';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class FundingMarketBody extends React.Component {
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
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                },
            ],
            hitList: [
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                },
            ],
            newList: [
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                },
                {
                    title: '엑소, 2018년 새 앨범 화이트 굿즈 시리즈',
                    name: '엑소',
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                },
            ],
        });
    }
    render() {
        return (
            <div className={stylesHome.fundingMarketBody}>
                <FundingMarketList title={'펀딩액순'} listItem={this.state.fundingList} />
                <FundingMarketList title={'조회순'} listItem={this.state.hitList} />
                <FundingMarketList title={'신규'} listItem={this.state.newList} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketBody));
