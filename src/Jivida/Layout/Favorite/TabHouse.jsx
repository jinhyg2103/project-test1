import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionHouse from '../../Data/House/actions';

// Common Components
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';

// CSS
import styles from '../JividaLayout.css';
import stylesFavorite from './Favorite.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class TabInquiryView extends React.Component {
    componentWillMount() {
        this.params = {
            uIdFrom: this.props.author.id,
        };
    }
    render() {
        let houseListItem = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox}>
                     <HouseListItem house={house} />
                </div>
            );
        };
        return (
            <div className={stylesFavorite.favoriteContainer}>
                <InfiniteList onRef={(ref) => { this.houseList = ref; }} ListItem={houseListItem} Get={ActionHouse.getFavoriteHouses} Reset={ActionHouse.resetFavoriteHouses} GetParams={this.params} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        favoriteHouses: state.data.house.favoriteHouses,
        author: state.data.auth.author,
    };
})(withRouter(TabInquiryView));
