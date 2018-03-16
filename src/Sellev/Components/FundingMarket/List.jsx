import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import ImageList from '../../Common/ImageList';

// Styles
import stylesFundingMarket from '../../Styles/Components/FundingMarket.css';
import styles from '../../Styles/App.css';
// Actions

class FundingMarketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    bgImage: '/Sellev/assets/img/img_fundmarket_price.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    left: 5,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_funding_2.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    percentOfFund: 60,
                    attendant: 145,
                    left: 5,
                    goal: 1200,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_fundmarket_hits.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    left: 50,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_fundmarket_new.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    percentOfFund: 60,
                    attendant: 145,
                    left: 22,
                    goal: 1200,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_today_funding_1.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    percentOfFund: 60,
                    attendant: 145,
                    left: 22,
                    goal: 1200,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_today_funding_2.png',
                    profile: '/Sellev/assets/img/img_sellever_profile.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    left: 5,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_today_funding_3.png',
                    profile: '/Sellev/assets/img/img_user.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    percentOfFund: 60,
                    attendant: 145,
                    left: 22,
                    goal: 1200,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_today_funding_4.png',
                    profile: '/Sellev/assets/img/img_user.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    left: 12,
                    type: 'market',
                },
            ],
        };
    }
    render() {
        let fundingMarketList = this.state.list.map((item, index) => {
            return (
                <div className={stylesFundingMarket.productBox}>
                    <ImageList key={index} type={'fundingmarket'} listItem={item} />
                </div>
            );
        })
        return (
            <div className={stylesFundingMarket.fundingMarketBody}>
                <div className={stylesFundingMarket.listHeader}>
                    <div className={styles.sectionSmallTitle}>랭킹</div>
                    <div className={styles.titleBox}>
                        <div className={styles.sectionTitle}>
                            펀딩&마켓
                            <div />
                        </div>
                        <div className={styles.filter}>
                            인기순
                            <div />
                        </div>
                    </div>
                </div>
                <div className={stylesFundingMarket.productBody}>
                {fundingMarketList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketList));
