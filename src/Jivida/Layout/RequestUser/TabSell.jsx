import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionRequest from '../../Data/Request/actions';

// Components
import HouseListItem from '../../Common/HouseList/HouseListItem';
import UserListItem from '../../Common/UserList/UserListItem';
import InfiniteList from '../../Common/InfiniteList';
import Modal from '../../Common/Modal/Modal';

// Styles
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';
import stylesUserList from '../../Common/UserList/UserList.css';

class TabSellView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hId: 0,
        };
    }
    componentWillMount() {
        this.params = {
            uIdFrom: this.props.author.id,
        };
    }
    openModal (house) {
        if (house.acceptCount == 0) return;
        this.setState({ hId: house.id }, () => {
            this.modal.setState({ isOpened: true });
        });
    }
    deleteHouse(house) {
        if (confirm('정말 삭제하시겠습니까? 삭제한 집은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionHouse.deleteMyHouse({ hId: house.id })).then((id) => {
                this.houseList.setState({
                    list: this.houseList.state.list.filter((data) => {
                        return data.id != house.id;
                    }),
                });
            });
        }
    }
    goChatRoom(user) {
        this.props.history.push('/chat?uId=' + user.id);
    }
    deleteAgency(user) {
        if (confirm('정말 삭제하시겠습니까? 삭제한 중개 회원은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionRequest.deleteRequestSell({
                hId: this.state.hId,
                uIdFrom: this.props.author.id,
                uIdTo: user.id,
            })).then((data) => {
                this.agencies.setState({
                    list: this.agencies.state.list.filter((data) => {
                        return data.id != user.id;
                    }),
                });
            });
        }
    }
    render() {
        let houseListItem = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    { <HouseListItem house={house} />}
                    <div className={stylesHouseList.toolBox}>
                        <Link to={'/user?id=' + house.user.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + house.user.profileUrl + ')' }}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{house.user.name}</div>
                            </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            <div className={stylesHouseList.btnActive + ' ' + (house.acceptCount == 0 ? styles.lightGrayBorderBtn : styles.grayBorderBtn)} onClick={this.openModal.bind(this, house)}>
                                수락 ({house.acceptCount})
                            </div>
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteHouse.bind(this, house)}>
                                <i className={'icon icon-ic_delete'}></i>삭제
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        let agencyItem = (user, index) => {
            return (
                <div key={index} className={stylesUserList.agencyContainerWithToolBox}>
                    <UserListItem key={index} user={user} />
                    <div className={stylesUserList.talkBox}>
                        <div className={stylesUserList.talkBoxBody}>
                            <div className={stylesUserList.btnTalk + ' ' + styles.grayBorderBtn} onClick={this.goChatRoom.bind(this, user)}>
                                <i className={'icon icon-ic_talk'}></i>대화
                            </div>
                            <div className={stylesUserList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteAgency.bind(this, user)}>
                                <i className={'icon icon-ic_delete'}></i>삭제
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={stylesRequest.requestContainer}>
                <InfiniteList onRef={(ref) => { this.houseList = ref; }} ListItem={houseListItem} Get={ActionRequest.getSells} GetParams={this.params} />
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'수락한 중개 회원'}
                    wideModal={true}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.agencies = ref; }} ListItem={agencyItem} Get={ActionRequest.getSellAgencies} GetParams={{
                            hId: this.state.hId,
                        }} />
                    )}
                    modalFooter={null}
                />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TabSellView));
