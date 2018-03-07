import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';



// Styles
import stylesUserList from './UserList.css';

/*
* this.props.Reset
* this.props.Get
* this.props.Get
* this.props.UserListItem
*/
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],

            from: 0,
            count: 20,
            isLoading: false,
            hasMore: true,
        };
    }
    componentWillMount() {
        this.props.dispatch(this.props.Reset());
        this.getUsers();
    }
    getUsers() {
        if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.props.dispatch(this.props.Get({
                from: this.state.from,
                count: this.state.count,
            })).then((users) => {
                this.setState({
                    users: [...this.state.users, ...users],
                    isLoading: false,
                });
            })
                .catch((err) => {
                    this.setState({
                        hasMore: false,
                        isLoading: false,
                    });
                });
        }
    }
    render() {
        let users = this.state.users.map((user, index) => {
            return (
                <div key={index} className={stylesUserList.houseItemContainerWithoutToolBox}>
                    <this.props.UserListItem user={user} />
                </div>
            );
        });
        return (
            <InfiniteScroll loadMore={this.getUsers.bind(this)} initialLoad={false} hasMore={this.state.hasMore} useWindow={false}>
                { users }
            </InfiniteScroll>
        );
    }
}
export default connect((state) => {
    return {
        favoriteAgencies: state.data.user.favoriteAgencies,
    };
})(withRouter(UserList));

