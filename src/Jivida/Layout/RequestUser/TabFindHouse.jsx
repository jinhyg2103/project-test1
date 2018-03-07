import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionRequest from '../../Data/Request/actions';

// Components
import RequestFindHouseListItem from '../../Common/HouseList/FindHouseListItem';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';
import Modal from '../../Common/Modal/Modal';

// Styles
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class TabFindHouseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rfhId: 0,
        };
    }
    componentWillMount() {
        this.params = {
            requestType: 1,
        };
    }
    openModal (request) {
        if (request.countAnswer == 0) return;
        this.setState({ rfhId: request.id }, () => {
            this.modal.setState({ isOpened: true });
        });
    }
    deleteRequest(request) {
        if (confirm('정말 취소하시겠습니까? 취소한 요청은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionRequest.deleteRequestFindHouse({ rfhId: request.id })).then((data) => {
                this.infiniteList.setState({
                    list: this.infiniteList.state.list.filter((data) => {
                        return data.id != request.id;
                    }),
                });
            });
        }
    }
    render() {
        let listItem = (request, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    <RequestFindHouseListItem house={request} />
                    <div className={stylesHouseList.toolBox}>
                        <Link to={'/user?id=' + request.user.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + request.user.profileUrl + ')' }}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{request.user.name}</div>
                            </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            <div className={stylesHouseList.btnActive + ' ' + (request.countAnswer == 0 ? styles.lightGrayBorderBtn : styles.redBorderBtn)} onClick={this.openModal.bind(this, request)}>
                                <i className={'icon icon-ic_recommend'}></i>집 추천 ({request.countAnswer})
                            </div>
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteRequest.bind(this, request)}>
                                <i className={'icon icon-ic_delete'}></i>취소
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        let recommendedItem = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    { <HouseListItem house={house} openNewTab={true} /> }
                    <div className={stylesHouseList.talkBox}>
                        <div className={stylesHouseList.talkBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + house.user.profileUrl + ')' }}>
                            </div>
                            { house.agency ? (
                                <div className={stylesHouseList.agency}>
                                    <Link to={'/agency/?id=' + house.user.id} className={stylesHouseList.agencyName}>{house.agency ? house.agency.agencyName : '-'}</Link>
                                    <Link to={'/agency/?id=' + house.user.id} className={stylesHouseList.agencyAuthorName}>{house.user.name}</Link>
                                </div>
                            ) : (
                                <div className={stylesHouseList.agency}>
                                    <Link to={'/user/?id=' + house.user.id} className={stylesHouseList.authorName}>{house.user.name}</Link>
                                </div>
                            )}
                        </div>
                        <div className={stylesHouseList.talkBoxBody}>
                            <Link to={'/chat?uId=' + house.user.id} className={stylesHouseList.btnTalk + ' ' + styles.grayBorderBtn}>
                                <i className={'icon icon-ic_talk'}></i>대화
                            </Link>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={stylesRequest.requestContainer}>
                <InfiniteList onRef={(ref) => { this.infiniteList = ref; }} ListItem={listItem} Get={ActionRequest.getFindHouses} GetParams={this.params} />
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    wideModal={true}
                    modalHeader={'추천받은 집'}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.recommendedHouses = ref; }} ListItem={recommendedItem} Get={ActionRequest.getFindHouseAnswers} GetParams={{
                            rfhId: this.state.rfhId,
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
})(withRouter(TabFindHouseView));
