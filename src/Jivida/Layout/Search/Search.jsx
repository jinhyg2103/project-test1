import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import JividaMap from '../../Common/Map/GoogleMap';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionGeoLocation from '../../Data/GeoLocation/actions';

// CSS
import styles from '../JividaLayout.css';
import stylesSearch from './Search.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            si: this.props.si,
            gu: [],
            dong: [],
            searchQuery: '',
        };
        this.params = {
            leftTop: {
                longitude: 0,
                latitude: 0,
            },
            rightBottom: {
                longitude: 0,
                latitude: 0,
            },
            searchQuery: '',
        };
        this.handleCenterChanged = this.handleCenterChanged.bind(this);
        this.handleTypeChanged = this.handleTypeChanged.bind(this);
        this.handleDealingTypeChanged = this.handleDealingTypeChanged.bind(this);
        this.handlePyeongChanged = this.handlePyeongChanged.bind(this);
        this.handlePriceChanged = this.handlePriceChanged.bind(this);
        this.handleDepositChanged = this.handleDepositChanged.bind(this);
        this.handleSiChanged = this.handleSiChanged.bind(this);
        this.handleGuChanged = this.handleGuChanged.bind(this);
        this.handleDongChanged = this.handleDongChanged.bind(this);
    }
    handleCenterChanged(center) {
        this.params.leftTop = center.leftTop;
        this.params.rightBottom = center.rightBottom;
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handleTypeChanged(e) {
        if (e.target.value == '') { // 설정 없음
            delete this.params.type;
        } else {
            this.params.type = e.target.value;
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handleDealingTypeChanged(e) {
        if (e.target.value == '') { // 설정 없음
            delete this.params.dealingType;
        } else {
            this.params.dealingType = e.target.value;
            this.setState({ dealingType: e.target.value });
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handlePyeongChanged(e) { // e.target.value
        if (e.target.value == '') { // 설정 없음
            delete this.params.areaStart;
            delete this.params.areaEnd;
        } else if (e.target.value > 100000) { // 제한없음
            this.params.areaStart = 991;
            this.params.areaEnd = e.target.value;
        } else if (e.target.value == 66) {
            this.params.areaStart = 0;
            this.params.areaEnd = 66;
        } else if (e.target.value == 99) {
            this.params.areaStart = 66;
            this.params.areaEnd = 99;
        } else if (e.target.value == 132) {
            this.params.areaStart = 99;
            this.params.areaEnd = 132;
        } else if (e.target.value == 165) {
            this.params.areaStart = 132;
            this.params.areaEnd = 165;
        } else if (e.target.value == 198) {
            this.params.areaStart = 165;
            this.params.areaEnd = 198;
        } else if (e.target.value == 330) {
            this.params.areaStart = 198;
            this.params.areaEnd = 330;
        } else if (e.target.value == 991) {
            this.params.areaStart = 330;
            this.params.areaEnd = 991;
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handlePriceChanged(e) {
        if (e.target.value == '') { // 설정 없음
            delete this.params.price;
        } else {
            this.params.price = e.target.value;
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handleDepositChanged(e) {
        if (e.target.value == '') { // 설정 없음
            delete this.params.deposit;
        } else {
            this.params.deposit = e.target.value;
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
    }
    handleSiChanged(e) {
        delete this.params.gu;
        delete this.params.dong;
        if (e.target.value == '') { // 설정 없음
            delete this.params.si;
        } else {
            this.params.si = this.state.si[e.target.value].lowestAdmCodeNm;
            this.props.dispatch(ActionGeoLocation.loadGu(this.state.si[e.target.value].admCode)).then((gu) => {
                this.setState({ gu: gu });
            });
        }
        this.searchList.reset();
        setTimeout(() => {
            this.jividaMap.handleSelectAreaName(this.params);
            this.jividaMap.reset(this.params);
        }, 100);
    }
    handleGuChanged(e) {
        delete this.params.dong;
        if (e.target.value == '') { // 설정 없음
            delete this.params.gu;
        } else {
            this.params.gu = this.state.gu[e.target.value].lowestAdmCodeNm;
            this.props.dispatch(ActionGeoLocation.loadDong(this.state.gu[e.target.value].admCode)).then((dong) => {
                this.setState({ dong: dong });
            });
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
        this.jividaMap.handleSelectAreaName(this.params);
    }
    handleDongChanged(e) {
        if (e.target.value == '') { // 설정 없음
            delete this.params.dong;
        } else {
            this.params.dong = this.state.dong[e.target.value].lowestAdmCodeNm;
        }
        this.searchList.reset();
        this.jividaMap.reset(this.params);
        this.jividaMap.handleSelectAreaName(this.params);
    }
    changeSearchQuery(e) {
        this.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.params.searchQuery = this.state.searchQuery;
            this.searchList.reset();
            this.jividaMap.reset(this.params);
        }
    }
    render() {
        let searchResult = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox + ' ' + stylesSearch.houseItemContainer}>
                    { <HouseListItem house={house} />}
                </div>
            );
        };
        let typeResidenceOptions = ActionHouse.HOUSE_TYPE_RESIDENCE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let typeNonresidenceOptions = ActionHouse.HOUSE_TYPE_NONRESIDENCE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let typeLandOptions = ActionHouse.HOUSE_TYPE_LAND_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let dealingTypeOptions = ActionHouse.HOUSE_DEALING_TYPE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let pyeongForHouseOptions = ActionHouse.HOUSE_PYEONG_FOR_HOUSE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let priceOptions = ActionHouse.HOUSE_PRICE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let monthlyPriceOptions = ActionHouse.HOUSE_MONTHLY_PRICE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let depositOptions = ActionHouse.HOUSE_DEPOSIT_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
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
            <div className={stylesSearch.searchContainer}>
                <div className={stylesSearch.searchOptionBox}>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleTypeChanged}>
                        <option value={''}>집 종류</option>
                        <optgroup label={'주거'}>
                            { typeResidenceOptions }
                        </optgroup>
                        <optgroup label={'비주거'}>
                            { typeNonresidenceOptions }
                        </optgroup>
                        <optgroup label={'토지'}>
                            { typeLandOptions }
                        </optgroup>
                    </select>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleDealingTypeChanged}>
                        <option value={''}>거래 방법</option>
                        { dealingTypeOptions }
                    </select>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handlePyeongChanged}>
                        <option value={''}>면적</option>
                        { pyeongForHouseOptions }
                    </select>
                    { this.state.dealingType == 3 ? (
                        <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleDepositChanged}>
                            <option value={''}>보증금</option>
                            { depositOptions }
                        </select>
                    ) : null }
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handlePriceChanged}>
                        { this.state.dealingType == 3
                            ? (<option value={''}>월세</option>)
                            : (<option value={''}>가격</option>)
                        }
                        { this.state.dealingType == 3 ? monthlyPriceOptions : priceOptions }
                    </select>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleSiChanged}>
                        <option value={''}>시/도</option>
                        { SiOptions }
                    </select>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleGuChanged}>
                        <option value={''}>시/군/구</option>
                        { GuOptions }
                    </select>
                    <select className={stylesSearch.searchOptionItem + ' ' + stylesSearch.selectItem} onChange={this.handleDongChanged}>
                        <option value={''}>읍/면/동</option>
                        { DongOptions }
                    </select>
                    <div className={stylesSearch.searchBar}>
                        <input
                            className={styles.inputSearch}
                            placeholder={'매물번호로 검색하세요'}
                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            onKeyPress={this.searchKeyPress.bind(this)}
                        />
                        <span className={styles.searchBtn}><i className={'icon icon-ic_search_house_thin'}></i></span>
                    </div>
                </div>
                <div className={stylesSearch.mapBox}>
                    <JividaMap onRef={(jividaMap) => { this.jividaMap = jividaMap; }} onCenterChanged={this.handleCenterChanged} />
                </div>
                <div className={stylesSearch.searchBox}>
                    <div className={stylesSearch.searchBoxInside}>
                        <div className={stylesSearch.requestBox}>
                            <i className={stylesSearch.requestIcon + ' icon-ic_search_request'}></i>
                            <div className={stylesSearch.requestDescription}>
                                <div className={stylesSearch.requestDescriptionLine}>검색결과가 없어도 걱정마세요.</div>
                                <div className={stylesSearch.requestDescriptionLine}>중개 회원이 직접 고객님이 원하는 집을</div>
                                <div className={stylesSearch.requestDescriptionLine}>찾아드립니다.</div>
                            </div>
                            {
                                this.props.author.id ?
                                    <Link to={'/form/request/findHouse?requestType=' + (this.props.author.type == 1 ? 1 : 2)} className={stylesSearch.requestBtn + ' ' + styles.redBtn}>
                                        집 찾기 <i className={'icon-ic_arrow_right_line'}></i>
                                    </Link> :
                                    <Link to={'/form/login'} className={stylesSearch.requestBtn + ' ' + styles.redBtn}>
                                        집 찾기 <i className={'icon-ic_arrow_right_line'}></i>
                                    </Link>
                            }
                        </div>
                        <div className={stylesSearch.houseListBox} >
                            <InfiniteList onRef={(ref) => { this.searchList = ref; }} ListItem={searchResult} Get={ActionHouse.getSearchHouses} Reset={ActionHouse.resetSearchHouses} GetParams={this.params} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        searchHouses: state.data.house.searchHouses,
        si: state.data.geoLocation.si,
        author: state.data.auth.author,
    };
})(withRouter(SearchView));
