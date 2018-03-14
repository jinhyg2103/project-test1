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

// Actions

class FundingMarketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'market',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'funding',
                },
                {
                    bgImage: '/Sellev/assets/img/img_pick_5.png',
                    profile: '/Sellev/assets/img/img_pick_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    price: 25900,
                    type: 'market',
                },
            ],
        };
    }
    render() {
        let fundingMarketList = this.state.list.map((item, index) => {
            return (
                <ImageList key={index} type={'fundingmarket'} listItem={item} />
            );
        })
        return (
            <div>
                {fundingMarketList}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketList));
