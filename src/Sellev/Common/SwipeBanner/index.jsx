import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//component
import BannerItem from './BannerItem';

// Styles
import styles from '../../Styles/Common/SwipeBanner.css';


class SwipeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_1.png' },
                { artist: 'Adoy', title: 'AdoyX셀레브 굿즈 콜라보 펀딩', imgURL: '/Sellev/assets/img/img_pick_2.png' },
                { artist: '밴드혁오', title: '화제의 혁오밴드 지금 만나러가볼까요?', imgURL: '/Sellev/assets/img/img_pick_3.png' },
                { artist: '마마무', title: '마마무 화사의 강렬한 원피스 굿즈 ', imgURL: '/Sellev/assets/img/img_pick_4.png' },
            ],
        };
    }
    render() {
        let bannerListBox = this.state.bannerList.map((list, key) => {
            return (
                <BannerItem bgImage={list.imgURL} title={list.title} artist={list.artist} key={key} />
            );
        });
        return (
            <div>
                {bannerListBox}
            </div>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
