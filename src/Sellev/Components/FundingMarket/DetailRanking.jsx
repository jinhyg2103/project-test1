import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import RankingList from './RankingList';

class DetailRanking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div>랭킹</div>
                    <div>펀딩&마켓</div>
                </div>
                <RankingList title={'펀딩액순'} listItem={this.state.fundingList} />
                <RankingList title={'조회순'} listItem={this.state.hitList} />
                <RankingList title={'신규'} listItem={this.state.newList} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailRanking));