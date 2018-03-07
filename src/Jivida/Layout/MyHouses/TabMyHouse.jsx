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
import InfiniteList from '../../Common/InfiniteList';
import Modal from '../../Common/Modal/Modal';

// Styles
import styles from '../JividaLayout.css';
import stylesMyHouses from './MyHouses.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

class TabAllView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {},

            memoUpdatedAt: new Date(),
            memoUpdatedTimer: 0,
        };
        this.handleOpenEdit = this.handleOpenEdit.bind(this);
        this.onMemoChange = this.onMemoChange.bind(this);
        this.handlePublicChange = this.handlePublicChange.bind(this);
    }
    componentWillMount() {
        this.params = {
            includeMine: (this.props.location.pathname == '/myHouses/all' || this.props.location.pathname == '/myHouses/mine'),
            includeCustomer: (this.props.location.pathname == '/myHouses/all' || this.props.location.pathname == '/myHouses/customer'),
            includeAgency: (this.props.location.pathname == '/myHouses/all' || this.props.location.pathname == '/myHouses/agency'),
        };
    }
    openMemo(house) {
        this.setState({ house: house });
        this.modal.setState({ isOpened: true });
    }
    deleteHouse(house) {
        if (confirm('정말 삭제하시겠습니까? 삭제한 집은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionHouse.deleteMyHouse({ hId: house.id })).then((data) => {
                this.houseList.setState({
                    list: this.houseList.state.list.filter((data) => {
                        return data.id != house.id;
                    }),
                });
            });
        }
    }
    handleOpenEdit(house) {
        this.props.history.push('/form/sell?hId=' + house.id + '&edit=true');
    }
    onMemoChange(e) {
        // update house
        let house = this.state.house;
        let memoUpdatedTimer = this.state.memoUpdatedTimer + 1;
        house.memo = e.target.value;
        this.setState({
            house: house,
            memoUpdatedTimer: memoUpdatedTimer,
        });
        setTimeout(() => {
            if (memoUpdatedTimer == this.state.memoUpdatedTimer) {
                ActionHouse.updateHouse({ hId: this.state.house.id, memo: this.state.house.memo }).then(() => {
                    this.setState({ memoUpdatedTimer: 0, memoUpdatedAt: new Date() });
                });
            }
        }, 1000);
    }
    handlePublicChange(house, e) {
        let isPublic = e.target.value;
        ActionHouse.updateHouse({ hId: house.id, isPublic: isPublic }).then(() => {
            if (isPublic == 'true') {
                alert('매물이 공개되었습니다.');
            } else {
                alert('매물이 비공개되었습니다. 더 이상 노출되지 않습니다.');
            }
        });
    }
    render() {
        let leftItem = (house) => {
            if ( house.houseStatus == 1 ) {
                return (
                    <div className={stylesHouseList.myHouse}>
                        <i className={'icon icon-ic_sell'}></i>나의 매물
                    </div>
                );
            } else if (house.houseStatus == 2) {
                return (
                    <div className={stylesHouseList.customer}>
                        <i className={'icon icon-ic_user_thin'}></i>고객중개 매물
                    </div>
                );
            } else {
                return (
                    <div className={stylesHouseList.common}>
                        <i className={'icon icon-ic_request_thin'}></i>공동중개 매물
                    </div>
                );
            }
        }
        let dropdownItem = (house) => {
            return (
                <select className={stylesHouseList.publicSelector} onChange={(e) => { this.handlePublicChange(house, e); }} disabled={(house.houseStatus == 3)}>
                    <option value={true} selected={house.isPublic}>공개</option>
                    <option value={false} selected={(house.houseStatus == 3 ? true : !house.isPublic)}>비공개</option>
                </select>
            );
        }
        let updateBtnItem = (house) => {
            if ( house.houseStatus == 3 ) {
                return (
                    <div className={stylesHouseList.btnActive + ' ' + styles.inactiveBorderBtn}>
                        수정
                    </div>
                );
            } else {
                return (
                    <div className={stylesHouseList.btnActive + ' ' + styles.grayBorderBtn} onClick={() => { this.handleOpenEdit(house); }}>
                        수정
                    </div>
                );
            }
        }
        let houseListItem = (house, index) => {
            if (house.userOwner) house.user = house.userOwner;
            if (house.agencyOwner) house.agency = house.agencyOwner;
            return (
                <div key={index} className={stylesHouseList.houseMyItemContainerWithToolBox}>
                    <div className={stylesHouseList.toolBox}>
                        <div className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.category}>
                                {leftItem(house)}
                            </div>
                            <div className={stylesHouseList.btnBox}>
                                {dropdownItem(house)}
                                <div className={stylesHouseList.memo} onClick={this.openMemo.bind(this, house)}>메모<i className={'icon icon-ic_add'}></i></div>
                            </div>
                            <div className={stylesHouseList.number}>매물번호:{house.id}</div>
                        </div>
                        <div className={stylesHouseList.toolBoxBody}>
                            {updateBtnItem(house)}
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteHouse.bind(this, house)}>
                                삭제
                            </div>
                        </div>
                    </div>
                    { <HouseListItem house={house} />}
                    <div className={stylesHouseList.talkBox}>
                        <div className={stylesHouseList.talkBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + house.user.profileUrl + ')' }}>
                            </div>
                            { house.houseStatus != 2 ? (
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
                            { house.houseStatus == 1 ?
                                <div className={stylesHouseList.btnTalk + ' ' + styles.grayBorderBtn + ' ' + styles.inactiveBorderBtn}>
                                    <i className={'icon icon-ic_talk'}></i>대화
                                </div> :
                                <Link to={'/chat?uId=' + house.user.id} className={stylesHouseList.btnTalk + ' ' + styles.grayBorderBtn}>
                                    <i className={'icon icon-ic_talk'}></i>대화
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={stylesMyHouses.myHousesContainer}>
                <InfiniteList onRef={(ref) => { this.houseList = ref; }} ListItem={houseListItem} Get={ActionHouse.getMyHouses} Reset={ActionHouse.resetMyHouses} GetParams={this.params} />
                <Modal
                    onRef={(ref) => { this.modal = ref; }}
                    modalHeader={'메모 (자동 저장)'}
                    modalBody={(
                        <div className={stylesMyHouses.myHousesModal}>
                            <textarea value={this.state.house.memo} onChange={this.onMemoChange}>
                            </textarea>
                            <div className={stylesMyHouses.memoUpdated}>
                                { DateUtil.format('llll', this.state.memoUpdatedAt) }에 업데이트 되었습니다.
                            </div>
                        </div>
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
})(withRouter(TabAllView));
