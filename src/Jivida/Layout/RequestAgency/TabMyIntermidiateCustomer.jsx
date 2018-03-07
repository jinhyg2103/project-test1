import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionRequest from '../../Data/Request/actions';

// Components
import InfiniteList from '../../Common/InfiniteList';
import RequestFindHouseListItem from '../../Common/HouseList/FindHouseListItem';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import UserListItem from '../../Common/UserList/UserListItem';
import Modal from '../../Common/Modal/Modal';

// Styles
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';
import stylesUserList from '../../Common/UserList/UserList.css';

class TabMyIntermidiateCustomerView extends React.Component {
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
    openModal(request) {
        if (request.acceptCount == 0) return;
        this.setState({ hId: request.id }, () => {
            this.modal.setState({ isOpened: true });
        });
    }
    deleteHouse(house) {
        if (confirm('정말 취소하시겠습니까? 취소한 요청은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionRequest.deleteRequestFindCustomer({
                hId: house.id,
            })).then((data) => {
                this.houseList.setState({
                    list: this.houseList.state.list.filter((data) => {
                        return data.id != house.id;
                    }),
                });
            });
        }
    }
    render() {
        let houseListItem = (request, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    {<HouseListItem house={request} />}
                    <div className={stylesHouseList.toolBox}>
                        <Link to={'/user?id=' + request.user.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile}
                                 style={{backgroundImage: 'url(' + request.user.profileUrl + ')'}}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{request.user.name}</div>
                            </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            <div
                                className={stylesHouseList.btnActive + ' ' + (request.acceptCount == 0 ? styles.lightGrayBorderBtn : styles.grayBorderBtn)}
                                onClick={this.openModal.bind(this, request)}>
                                수락 ({request.acceptCount})
                            </div>
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn}
                                 onClick={this.deleteHouse.bind(this, request)}>
                                <i className={'icon icon-ic_delete'}></i>삭제
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        let agencyItem = (user, index) => {
            return (
                <UserListItem key={index} user={user} />
            );
        }
        return (
            <div className={stylesRequest.requestContainer}>
                <InfiniteList onRef={(ref) => { this.houseList = ref; }} ListItem={houseListItem} Get={ActionRequest.getFindCustomers} GetParams={this.params} />
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'수락한 중개 회원'}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.agencies = ref; }} ListItem={agencyItem} Get={ActionRequest.getFindCustomerAgencies} GetParams={{
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
})(withRouter(TabMyIntermidiateCustomerView));
