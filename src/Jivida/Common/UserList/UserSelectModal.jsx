import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import ReactModal from 'react-modal';


// Styles
import stylesUserList from './UserList.css';

/*
* this.props.selectedIds
* this.props.Reset
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

            showModal: false,
        };
    }
    componentWillMount() {
        this.props.dispatch(this.props.Reset());
        this.getUsers();
    }
    componentDidMount() {
        this.props.onRef(this);
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
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
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
            <ReactModal
                className={stylesUserList.selectModalConatiner}
                overlayClassName={stylesUserList.selectModalOverlay}
                isOpen={this.state.showModal}
                onRequestClose={this.close.bind(this)}
                contentLabel="UserSelectModal"
                shouldCloseOnOverlayClick={true}>
                <div className={stylesUserList.modalHeader}>
                    즐겨찾는 중개 회원
                    <i className={'icon icon-ic_delete'} onClick={this.close.bind(this)}></i>
                </div>
                <InfiniteScroll loadMore={this.getUsers.bind(this)} initialLoad={false} hasMore={this.state.hasMore} useWindow={false}>
                    { users }
                </InfiniteScroll>
            </ReactModal>
        );
    }
}
export default connect()(withRouter(UserList));

