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

import stylesHome from '../../Styles/Components/Home.css';

// Actions

class BannerBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_1.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_2.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_3.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_4.png' },
            ],
        };
    }
    render() {
        let bannerItem = (item, index) => {
            return (
                <div className={stylesHome.listBox} key={index}>
                    <div className={stylesHome.bgImage} style={{ backgroundImage: 'url("' + item.bgImage +'")'}} />
                    <div className={stylesHome.titleBox}>
                        <div>{item.artist}</div>
                        <div>
                            {item.title}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={stylesHome.bannerBody}>
                <SwipeBanner listItem={bannerItem} getList={this.state.bannerList} centerMode={true} centerPadding={'250px'} slideToShow={1} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerBody));
