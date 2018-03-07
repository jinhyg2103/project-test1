import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionUser from '../../Data/User/actions';

// Common Components
import UserListItem from '../../Common/UserList/UserListItem';
import InfiniteList from '../../Common/InfiniteList';

// CSS
import styles from '../JividaLayout.css';
import stylesFavorite from './Favorite.css';
import stylesUserList from '../../Common/UserList/UserList.css';

class TabInquiryView extends React.Component {
    render() {
        let userListItem = (user, index) => {
            return (
                <UserListItem key={index} user={user} />
            );
        };
        return (
            <div className={stylesFavorite.favoriteContainer}>
                <InfiniteList onRef={(ref) => { this.infiniteList = ref; }} ListItem={userListItem} Get={ActionUser.getFavoriteAgencies} GetParams={{}} Reset={ActionUser.resetFavoriteAgencies} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TabInquiryView));
