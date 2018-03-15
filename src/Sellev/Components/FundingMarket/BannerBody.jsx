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
import styles from '../../Styles/Common/SwipeBanner.css';
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
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_1.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_2.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_3.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_4.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_1.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', bgImage: '/Sellev/assets/img/img_pick_2.png' },
            ],
        };
    }
    render() {
        let bannerItem = (item, index) => {
            return (
                <div className={styles.listBox} key={index}>
                    <div className={styles.bgImage} style={{ backgroundImage: 'url("' + item.bgImage +'")'}} />
                    <div className={styles.titleBox}>
                        <div>{item.artist}</div>
                        <div>
                            {item.title}
                        </div>
                    </div>
                </div> /*  이 부분 디자인 시안에 맞게 수정해주세요! (배너 아이템입니다)*/
            );
        }
        return (
            <div className={stylesHome.bannerBody}>
                <SwipeBanner listItem={bannerItem} getList={this.state.bannerList} centerPadding={'310px'} centerMode={false} infinite={false} slidesToShow={1}/>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerBody));
