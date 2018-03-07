import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionRequest from '../Data/Request/actions';
import * as ActionUser from '../Data/User/actions';
import * as ActionHouse from '../Data/House/actions';

// Component
import UserListItem from './UserList/UserListItem';
import InfiniteList from './InfiniteList';
import Modal from './Modal/Modal';

// CSS
import styles from '../Layout/JividaLayout.css';
import stylesAgencyFinder from './AgencyFinder.css';
import stylesForm from '../Layout/Forms/Form.css';
import stylesModal from './Modal/Modal.css';

// Util
import * as Converter from '../Lib/Utils/converter';
import * as ActionGeoLocation from '../Data/GeoLocation/actions';

/*
* this.props.onRef
*/
class AgencyFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            si: this.props.si,
            gu: [],
            dong: [],

            selectedSi: null,
            selectedGu: null,
            selectedDong: null,

            uIds: [],
            uIdsFavorites: [],

            warnAgenciesNotValid: false,
        };
        this.agencies = [];
        this.getNearAgencyIds = this.getNearAgencyIds.bind(this);
        this.handleSiChanged = this.handleSiChanged.bind(this);
        this.handleGuChanged = this.handleGuChanged.bind(this);
        this.handleDongChanged = this.handleDongChanged.bind(this);
        this.handleAddAgencies = this.handleAddAgencies.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    getNearAgencyIds() {
        ActionUser.getNearAgencyIds({
            si: this.state.selectedSi,
            gu: this.state.selectedGu,
            dong: this.state.selectedDong,
        }).then((uIds) => {
            this.setState({ uIds: uIds });
        }).catch((err) => {
            this.setState({ uIds: [] });
        });
    }
    openUserSelectModal() {
        this.modal.open();
    }
    validation(callback) {
        this.setState({
            warnAgenciesNotValid: false,
        });
        if (this.state.uIds.length == 0 && this.state.uIdsFavorites.length == 0) {
            alert('요청을 보낼 중개 회원을 선택해주세요.');
            this.setState({ warnAgenciesNotValid: true });
        }
        setTimeout(() => {
            if (this.state.warnAgenciesNotValid) {
                callback(false);
            } else {
                callback(true);
            }
        }, 100);
    }
    handleSiChanged(e) {
        if (e.target.value == '') { // 설정 없음
            this.setState({
                selectedSi: null,
                selectedGu: null,
                selectedDong: null,
            });
        } else {
            this.setState({
                selectedSi: this.state.si[e.target.value].lowestAdmCodeNm,
            });
            this.props.dispatch(ActionGeoLocation.loadGu(this.state.si[e.target.value].admCode)).then((gu) => {
                this.setState({ gu: gu });
            });
        }
    }
    handleGuChanged(e) {
        if (e.target.value == '') { // 설정 없음
            this.setState({
                selectedGu: null,
                selectedDong: null,
                uIds: [], // 시/도만 선택했을 때는 중개사 선택 안됨
            });
        } else {
            this.setState({
                selectedGu: this.state.gu[e.target.value].lowestAdmCodeNm,
            }, () => {
                this.getNearAgencyIds();
            });
            this.props.dispatch(ActionGeoLocation.loadDong(this.state.gu[e.target.value].admCode)).then((dong) => {
                this.setState({ dong: dong });
            });
        }
    }
    handleDongChanged(e) {
        if (e.target.value == '') { // 설정 없음
            this.setState({
                selectedDong: null,
            }, () => {
                this.getNearAgencyIds();
            });
        } else {
            this.setState({
                selectedDong: this.state.dong[e.target.value].lowestAdmCodeNm,
            }, () => {
                this.getNearAgencyIds();
            });
        }
    }
    handleAddAgencies() {
        let selectedList = [];
        for (let i = 0; i < this.agencies.length; i++) {
            if (this.agencies[i].state.isSelected) {
                selectedList = [...selectedList, this.agencies[i].props.user.id];
            }
        }
        this.modal.setState({
            isOpened: false,
        }, () => {
            this.setState({ uIdsFavorites: selectedList });
        });
    }
    render() {
        let agencyItem = (user, index) => {
            return (
                <UserListItem key={index} user={user} selectable={true} isSelected={this.state.uIdsFavorites.indexOf(user.id) > -1} onRef={(ref) => { this.agencies[index] = ref; }} />
            );
        };
        let SiOptions = this.state.si.map((type, index) => {
            return <option key={index} value={index}>{type.lowestAdmCodeNm}</option>;
        });
        let GuOptions = this.state.gu.map((type, index) => {
            return <option key={index} value={index}>{type.lowestAdmCodeNm}</option>;
        });
        let DongOptions = this.state.dong.map((type, index) => {
            return <option key={index} value={index}>{type.lowestAdmCodeNm}</option>;
        });
        return (
            <div className={stylesForm.requestContainer + ' ' + stylesAgencyFinder.agencyFinderContainer}>
                <div className={stylesForm.formGroupName}>지역선택 (시/군/구까지는 필수입니다)</div>
                <div className={stylesForm.formGroup} style={{ marginBottom: 0 }}>
                    <select className={stylesAgencyFinder.selectGeoLocation} onChange={this.handleSiChanged}>
                        <option value={''}>시/도</option>
                        { SiOptions }
                    </select>
                    <select className={stylesAgencyFinder.selectGeoLocation} onChange={this.handleGuChanged}>
                        <option value={''}>시/군/구</option>
                        { GuOptions }
                    </select>
                    <select className={stylesAgencyFinder.selectGeoLocation} onChange={this.handleDongChanged}>
                        <option value={''}>읍/면/동</option>
                        { DongOptions }
                    </select>
                </div>
                <div className={stylesForm.requestAgenciesInfo}>
                    <div className={stylesForm.requestAgenciesInRange}>
                        <span>
                            {this.state.selectedSi && this.state.selectedGu ? this.state.selectedSi + ' ' : null}
                            {this.state.selectedGu ? this.state.selectedGu + ' ' : null}
                            {this.state.selectedDong ? this.state.selectedDong + ' ' : null}
                            {this.state.selectedSi && this.state.selectedGu ? '안에 ' : null}
                        </span>
                        <b>요청 가능한 중개 회원은 총 </b>
                        <b className={styles.red}>{this.state.uIds.length}</b>
                        <b>명 입니다</b>
                    </div>
                    <div className={stylesForm.requestFavoriteAgencies}>
                        <span className={styles.red}><i className={'icon icon-ic_check'}></i>즐겨찾는 중개 회원이 {this.state.uIdsFavorites.length}명 추가되었습니다</span>
                    </div>
                </div>
                <div className={stylesForm.requestAddFavoriteBtn} onClick={this.openUserSelectModal.bind(this)}><i className={'icon icon-ic_add'}></i>즐겨찾는 중개 회원 추가하기</div>
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'즐겨찾는 중개 회원을 선택하세요'}
                    modalBody={(
                        <InfiniteList onRef={(ref) => { this.agencyList = ref; }} ListItem={agencyItem} Get={ActionUser.getFavoriteAgencies} GetParams={{}} />
                    )}
                    modalFooter={(
                        <div className={styles.redBtn + ' ' + stylesModal.modalActionBtn} onClick={this.handleAddAgencies.bind(this)}>선택하기</div>
                    )}
                />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        si: state.data.geoLocation.si,
        author: state.data.auth.author,
    };
})(withRouter(AgencyFinder));

