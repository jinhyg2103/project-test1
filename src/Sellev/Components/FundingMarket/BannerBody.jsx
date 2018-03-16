import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Common
import SwipeBanner from '../../Common/SwipeBanner';

// Components

// Styles

import stylesFundingMarket from '../../Styles/Components/FundingMarket.css';

// Actions

class BannerBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                { type: 1, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '120%', bgImage: '/Sellev/assets/img/img_today_funding_1.png' },
                { type: 1, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '120%', bgImage: '/Sellev/assets/img/img_today_funding_2.png' },
                { type: 1, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '76%', bgImage: '/Sellev/assets/img/img_today_funding_1.png' },
                { type: 1, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '120%', bgImage: '/Sellev/assets/img/img_today_funding_2.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_3.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_4.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_3.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_4.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_4.png' },
                { type: 2, artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', value: '29,000', bgImage: '/Sellev/assets/img/img_today_funding_4.png' },
            ],
        };
    }
    render() {
        let bannerItem = (item, index) => {
                return (
                    <div className={stylesFundingMarket.listBox} key={index}>
                        <div className={stylesFundingMarket.bgImage} style={{backgroundImage: 'url("' + item.bgImage + '")'}} />
                        <div className={stylesFundingMarket.bgFooter}>
                            <div className={stylesFundingMarket.fundSymbole}>
                                <span>펀딩율</span><br />
                                <span>{item.value}</span>
                            </div>
                        </div>
                        <div className={stylesFundingMarket.titleBox}>
                            <div>{item.artist}</div>
                            <div>{item.title}</div>
                            <div>{item.value}</div>
                        </div>
                    </div> /*우선 펀딩 기준으로 배너 만들어 놨어요 나중에 API 오면 빨강색 동그라미 빼면 마켓 배너나와요*/
                );
        }
        return (
            <div className={stylesFundingMarket.bannerBody}>
                <SwipeBanner listItem={bannerItem} getList={this.state.bannerList} centerMode={false} infinite={true} slidesToShow={1}/>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerBody));
