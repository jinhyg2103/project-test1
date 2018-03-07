import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionHouses from '../../Data/House/actions';

// Components
import InfiniteList from '../../Common/InfiniteList';
import RequestFindHouseListItem from '../../Common/HouseList/FindHouseListItem';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import Modal from '../../Common/Modal/Modal';

// Styles
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';
import stylesModal from '../../Common/Modal/Modal.css';


class TabFindIntermidiateHouseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rfhaIdOpened: 0,
        }
    }
    componentWillMount() {
        this.houses = [];
        this.params = {
            uIdTo: this.props.author.id,
            requestType: 2,
        };
    }
    onRecommend() {
        let selectedHouses = [];
        for (let i = 0; i < this.houses.length; i++) {
            if (this.houses[i].state.isSelected) {
                selectedHouses = [...selectedHouses, this.houses[i].props.house.id];
            }
        }
        if (confirm(selectedHouses.length + '개의 집을 추천하시겠습니까?')) {
            ActionRequest.acceptRequestFindHouseAsk({ rfhaId: this.state.rfhaIdOpened, hIds: selectedHouses, requestType: this.params.requestType }).then((data) => {
                this.infiniteList.setState({
                    list: this.infiniteList.state.list.filter((data) => {
                        return data.rfhaId != this.state.rfhaIdOpened;
                    }),
                });
                this.modal.setState({
                    isOpened: false,
                });
            });
        }
    }
    accept(request) {
        this.modal.setState({
            isOpened: true,
        });
        this.setState({
            rfhaIdOpened: request.rfhaId,
        });
    }
    deleteRequest(request) {
        if (confirm('정말 거절하시겠습니까? 거절한 요청은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionRequest.deleteRequestFindHouseAsk({ rfhaId: request.rfhaId })).then((data) => {
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
                        <Link to={'/agency?id=' + request.user.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + request.user.profileUrl + ')' }}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{request.user.name}</div>
                           </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            <div className={stylesHouseList.btnActive + ' ' + (request.countAnswer == 0 ? styles.lightGrayBorderBtn : styles.redBorderBtn)} onClick={this.accept.bind(this, request)}>
                                <i className={'icon icon-ic_recommend'}></i>집 추천
                            </div>
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteRequest.bind(this, request)}>
                                <i className={'icon icon-ic_delete'}></i>취소
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        let recommendedHouse = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox}>
                    <HouseListItem house={house} selectable={true} onRef={(ref) => { this.houses[index] = ref; }} />
                </div>
            );
        };
        return (
            <div className={stylesRequest.requestContainer}>
                <InfiniteList onRef={(ref) => { this.infiniteList = ref; }} ListItem={listItem} Get={ActionRequest.getFindHouseAsks} GetParams={this.params} />
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'추천할 집을 선택하세요'}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.recommendedHouses = ref; }} ListItem={recommendedHouse} Get={ActionHouses.getMyHouses} GetParams={{
                            includeMine: true,
                            includeCustomer: true,
                            includeAgency: false,
                        }} />
                    )}
                    modalFooter={(
                        <div className={styles.redBtn + ' ' + stylesModal.modalActionBtn} onClick={this.onRecommend.bind(this)}>추천하기</div>
                    )}
                />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TabFindIntermidiateHouseView));
