import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesBanner from './HomeBanner.css';

class homeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_1.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_2.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_3.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_4.png' },
            ],
        };
    }
    render() {
        let bannerListBox = this.state.bannerList.map((list, key) => {
            return (
                <li className={stylesBanner.listBox} key={key}>
                    <img src={list.imgURL} alt=" " />
                    <div className={stylesBanner.titleBox}>
                        <div>{list.artist}</div>
                        <div>
                            {list.title}
                        </div>
                    </div>
                </li>
            );
        });
        return (
            <div className={stylesBanner.BannerContainer}>
                <div className={stylesBanner.BannerHeader}>
                    <div className={stylesBanner.titleUp}>셀레브 Pick</div>
                    <div className={stylesBanner.titleDown}>놓치지마세요</div>
                </div>
                <ul className={stylesBanner.BannerBody}>
                    {bannerListBox}
                </ul>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(homeBanner));

