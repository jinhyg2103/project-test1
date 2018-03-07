// Find Customer Request는 중개 회원이 중개사에게 자신의 매물을 팔아달라고 보내는 요청이다.
import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionUser from '../../Data/User/actions';
import * as ActionHouse from '../../Data/House/actions';

// Component
import UserSelectModal from '../../Common/UserList/UserSelectModal';
import UserListItem from '../../Common/UserList/UserListItem';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';
import Modal from '../../Common/Modal/Modal';
import AgencyFinder from '../../Common/AgencyFinder';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';
import stylesUserList from '../../Common/UserList/UserList.css';
import stylesModal from '../../Common/Modal/Modal.css';

// Util
import * as Converter from '../../Lib/Utils/converter';
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';

class RequestSellView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestToAgency: '',
            houseItem: [],
            hIds: [],
        };
    }
    componentWillMount() {
        this.houses = [];
        if (!this.props.author.id) {
            this.props.history.push('/form/login');
        }
    }
    componentDidMount() {
        this.modal.setState({
           isOpened: true,
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !this.modal.state.isOpened;
    }
    componentWillUpdate(nextProps, nextState) {
        return this.state.houseItem != nextState.houseItem;
    }
    startRequestFindCustomer() {
        this.agencyFinder.validation((isValid) => {
            if (isValid) {
                ActionRequest.createRequestFindCustomer({
                    uIdFrom: this.props.author.id,
                    uIdsTo: [...this.agencyFinder.state.uIds, ...this.agencyFinder.state.uIdsFavorites],
                    hIds: this.state.hIds,
                    memo: this.state.memo,
                }).then((uIds) => {
                    this.props.history.push('/request/intermidiate/myCustomer');
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    openModal() {
        this.modal.open();
    }
    handleHouseAdd() {
        let selectedHouses = [];

        for (let i = 0; i < this.houses.length; i++) {
            if (this.houses[i].state.isSelected) {
                selectedHouses = [...selectedHouses, this.houses[i].props.house.id];
            }
        }

        if (selectedHouses.length < 1) {
            alert('추천할 집을 선택하세요.');
        } else if (selectedHouses.length > 1) {
            alert('1개의 집만 선택 가능합니다.');
        } else {
            for (let i = 0; i < selectedHouses.length; i++) {
                ActionHouse.getHouseById({ hId: selectedHouses[i] })
                    .then((house) => {
                        this.setState({
                            houseItem: [...this.state.houseItem, house],
                            hIds: [...this.state.hIds, house.id],
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            this.modal.setState({
                isOpened: false,
            });
        }
    }
    render() {
        let recommendedHouse = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox}>
                    <HouseListItem house={house} selectable={true} onRef={(ref) => { this.houses[index] = ref; }} />
                </div>
            );
        };
        let houseListItem = this.state.houseItem.map((type, index) => {
            return (
                <div className={stylesHouseList.houseItemContainerWithoutToolBox}>
                    <HouseListItem key={index} house={this.state.houseItem[index]} />
                </div>
            );
        });
        return (
            <div className={stylesForm.requestContainer}>
                <div className={stylesForm.formTitle}>
                    (공동중개) 손님 <span className={stylesForm.bold}>찾기</span>
                </div>
                <div className={stylesForm.formGroupName}>중개 회원에게 요청할 집</div>
                { this.state.houseItem ? houseListItem : <div className={stylesForm.requestAddFavoriteBtn} onClick={this.openModal.bind(this)}><i className={'icon icon-ic_add'}></i>즐겨찾는 중개 회원 추가하기</div>}
                <div className={stylesForm.formGroupName}>희망사항</div>
                <div className={stylesForm.formGroup}>
                    <textarea className={stylesForm.formTextarea} placeholder={'중개 회원에게 고객님의 희망사항을 입력해주세요'} value={this.state.memo || ''} onChange={(e) => this.setState({ memo: e.target.value })} />
                </div>
                <AgencyFinder onRef={(ref) => { this.agencyFinder = ref; }} />
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startRequestFindCustomer.bind(this)}>
                    <span>요청하기</span>
                </div>
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'공동 중개로 손님이 필요한 집을 선택하세요'}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.recommendedHouses = ref; }} ListItem={recommendedHouse} Get={ActionHouse.getMyHouses} GetParams={{
                            includeMine: true,
                            includeCustomer: true,
                            includeAgency: false,
                        }} />
                    )}
                    modalFooter={(
                        <div className={styles.redBtn + ' ' + stylesModal.modalActionBtn} onClick={this.handleHouseAdd.bind(this)}>선택하기</div>
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
})(withRouter(RequestSellView));
