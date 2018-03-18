import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import ImageList from '../../Common/ImageList';

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class DetailFundingMarket extends React.Component {
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
            ],
        };
    }
    render() {
        let fundingMarketList = this.state.list.map((item, index) => {
            return (
                <div className={stylesHashTag.productBox}>
                    <ImageList key={index} type={'fundingmarket'} listItem={item} />
                </div>
            );
        })
        return (
            <div className={stylesHashTag.fundingMarketSection}>
                <div className={stylesHashTag.detailSectionTitle}>
                    <div className={stylesHashTag.title}>펀딩&마켓</div>
                    <Link to={'/fundingmarket'} className={stylesHashTag.viewAll}>전체보기</Link>
                </div>
                <div className={stylesHashTag.productBody}>
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
})(withRouter(DetailFundingMarket));