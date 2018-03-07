// SellRequest는 일반고객이 중개사에게 자신의 집을 팔아달라고 보내는 요청이다.
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
            house: null,
            requestToAgency: '',
        };
    }
    componentWillMount() {
        if(!this.props.author.id) {
            this.props.history.push('/form/login');
        } else {
            let params = ParseUrlParameter.parse(this.props.location.search);
            if (!params.hId) this.props.history.push('/');
            else {
                this.setState({ hId: params.hId });
                ActionHouse.getHouseById({ hId: params.hId })
                    .then((house) => {
                        if (this.props.author.id != house.user.id) {
                            alert('나의 집이 아닙니다.');
                            this.props.history.push('/');
                        }
                        this.setState({
                            house: house,
                        });
                    })
                    .catch((err) => {
                        this.props.history.push('/');
                    });
            }
        }
    }
    startRequestSell() {
        this.agencyFinder.validation((isValid) => {
            if (isValid) {
                ActionRequest.createRequestSell({
                    uIdFrom: this.props.author.id,
                    uIdsTo: [...this.agencyFinder.state.uIds, ...this.agencyFinder.state.uIdsFavorites],
                    hId: this.state.house.id,
                    requestToAgency: this.state.requestToAgency,
                }).then((uIds) => {
                    this.props.history.push('/request/sell');
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    openUserSelectModal() {
        this.modal.open();
    }
    render() {
        return (
            <div className={stylesForm.requestContainer}>
                <div className={stylesForm.formTitle}>
                    <span className={stylesForm.bold}>집 내놓기 2단계</span>
                </div>
                <div className={stylesForm.formGroupName}>중개 회원에게 요청할 집</div>
                { this.state.house ? (
                    <div className={stylesHouseList.houseItemContainerWithoutToolBox}>
                        { <HouseListItem house={this.state.house} />}
                    </div>
                ) : null}
                <div className={stylesForm.formGroupName}>희망사항 <span className={stylesForm.optionCaption}>(선택)</span></div>
                <div className={stylesForm.formGroup}>
                    <textarea className={stylesForm.formTextarea} placeholder={'중개 회원에게 고객님의 희망사항을 입력해주세요'} value={this.state.requestToAgency || ''} onChange={(e) => this.setState({ requestToAgency: e.target.value })} />
                </div>
                <AgencyFinder onRef={(ref) => { this.agencyFinder = ref; }} />
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startRequestSell.bind(this)}>
                    <span>중개 회원에게 요청하기</span>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RequestSellView));
