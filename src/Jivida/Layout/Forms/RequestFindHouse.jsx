// SellRequest는 일반고객이 중개사에게 자신의 집을 팔아달라고 보내는 요청이다.
import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import ResidenceForm from './SellResidence';
import NonResidenceForm from './SellNonResidence';
import LandForm from './SellLand';
import AgencyOptionForm from './SellAgencyOption';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionUser from '../../Data/User/actions';
import * as ActionHouse from '../../Data/House/actions';

// Component
import AgencyFinder from '../../Common/AgencyFinder';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

// Util
import * as ConvertUtil from '../../Lib/Utils/converter';
import * as UploadImageUtil from '../../Lib/UploadManager/UploadImage';
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';

class RequestFindView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memo: '',
            price: '',
            deposit: '',
            area: '', // 공금면적
            areaForExclusiveUse: '', // 전용면적
            houseType: 1, // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
            dealingType: 1, //매매(1), 전세(2), 월세(3),
            requestType: 1, // 1은 고객 -> 중개사(집찾기), 2는 중개사 -> 중개사 (매물요청)

            warnPriceNotValid: false, // 가격은 숫자만
            warnDepositNotValid: false, // 보증금은 숫자만
            warnAreaNotValid: false, // 공급 면적은 숫자만
/*
            warnAreaForExclusiveUseNotValid: false, // 전용 면적은 숫자만
*/

            warnAgencyRequiredNotValid: false,
        };
    }
    componentWillMount() {
        if(!this.props.author.id) {
            this.props.history.push('/form/login');
        } else {
            let params = ParseUrlParameter.parse(this.props.location.search);
            if (!params.requestType) {
                this.props.history.push('/');
            } else {
                this.setState({requestType: params.requestType});
            }
        }
    }
    handleHouseType(e) {
        this.setState({
            houseType: e.target.value,
        });
        this.agencyOption.initialState(e.target.value);
    }
    startRequestSell() {
        this.setState({
            warnPriceNotValid: false,
            warnDepositNotValid: false,
            warnAreaNotValid: false,
/*
            warnAreaForExclusiveUseNotValid: false,
*/
        });
        if (!/^\d+$/.test(this.state.price) || this.state.price > 1000000000000) {
            this.setState({ warnPriceNotValid: true });
        }
        if ((!/^\d+$/.test(this.state.deposit) || this.state.deposit > 1000000000000) && this.state.dealingType == 3) {
            this.setState({ warnDepositNotValid: true });
        }
        if (!/^\d+$/.test(this.state.area) || this.state.area > 1000000000000) {
            this.setState({ warnAreaNotValid: true });
        }
/*        if (!/^\d+$/.test(this.state.areaForExclusiveUse) || this.state.areaForExclusiveUse > 1000000000000) {
            this.setState({ warnAreaForExclusiveUseNotValid: true });
        }*/
/*        // 필수 상세사항 validation 체크
        if (this.props.author.type == 2) {
            if (this.state.houseType >= 1 && this.state.houseType <= 10) {
                this.residence.createCheck();
                this.setState({
                    warnAgencyRequiredNotValid: this.residence.state.warnRequiredNotValid,
                });
            } else if (this.state.houseType >= 11 && this.state.houseType <= 15) {
                this.nonResidence.createCheck();
                this.setState({
                    warnAgencyRequiredNotValid: this.nonResidence.state.warnRequiredNotValid,
                });
            } else {
                this.land.createCheck();
                this.setState({
                    warnAgencyRequiredNotValid: this.land.state.warnRequiredNotValid,
                });
            }
        }*/
        setTimeout(() => {
            if (this.state.warnPriceNotValid
                || this.state.warnDepositNotValid
                || this.state.warnAreaNotValid
/*
                || this.state.warnAreaForExclusiveUseNotValid
*/
/*                || this.state.warnAgencyRequiredNotValid*/
            ) {
                return;
            }
            this.agencyFinder.validation((isValid) => {
                if (isValid) {
                    // 가입시작
                    let params = {
                        uIdsTo: [...this.agencyFinder.state.uIds, ...this.agencyFinder.state.uIdsFavorites],
                        price: this.state.price,
                        deposit: this.state.deposit,
                        houseType: this.state.houseType,
                        dealingType: this.state.dealingType,
                        area: this.state.area,
                        areaForExclusiveUse: this.state.areaForExclusiveUse,
                        state: this.agencyFinder.state.selectedSi,
                        city: this.agencyFinder.state.selectedGu,
                        address1: this.agencyFinder.state.selectedDong,
                        address2: '',
                        addressFull: this.agencyFinder.state.selectedSi + this.agencyFinder.state.selectedGu + this.agencyFinder.state.selectedDong,
                        requestType: this.state.requestType,
                        memo: this.state.memo,
                    };
                    /*let optionParams = {};
                    if (this.state.houseType >= 1 && this.state.houseType <= 10) { // 주거
                        optionParams['options'] = this.residence.state.options;
                        optionParams['room'] = this.residence.state.room;
                        optionParams['bathroom'] = this.residence.state.bathroom;
                        optionParams['verandaExtension'] = this.residence.state.verandaExtension;
                        optionParams['direction'] = this.residence.state.direction;
                        optionParams['bay'] = this.residence.state.bay;
                        optionParams['boiler'] = this.residence.state.boiler;
                        optionParams['interior'] = this.residence.state.interior;
                        optionParams['paper'] = this.residence.state.paper;
                        optionParams['floor'] = this.residence.state.floor;
                        optionParams['entrance'] = this.residence.state.entrance;
                        optionParams['parkingLot'] = this.residence.state.parkingLot;
                        optionParams['elevator'] = this.residence.state.elevator;
                    } else if (this.state.houseType >= 11 && this.state.houseType <= 15) { // 비주거
                        optionParams['roadWidth'] = this.nonResidence.state.roadWidth;
                        optionParams['signboard'] = this.nonResidence.state.signboard;
                        optionParams['veranda'] = this.nonResidence.state.veranda;
                        optionParams['landShare'] = this.nonResidence.state.landShare;
                        optionParams['buildingUsedFor'] = this.nonResidence.state.buildingUsedFor;
                        optionParams['interior'] = this.nonResidence.state.interior;
                        optionParams['parkingLot'] = this.nonResidence.state.parkingLot;
                        optionParams['elevator'] = this.nonResidence.state.elevator;
                        optionParams['roadType'] = this.nonResidence.state.roadType;
                    } else { // 토지
                        optionParams['roadType'] = this.land.state.roadType;
                        optionParams['roadWidth'] = this.land.state.roadWidth;
                        optionParams['roadLength'] = this.land.state.roadLength;
                        optionParams['landShape'] = this.land.state.landShape;
                        optionParams['landCategory'] = this.land.state.landCategory;
                        optionParams['landUsedFor'] = this.land.state.landUsedFor;
                        optionParams['floorAreaRatio'] = this.land.state.floorAreaRatio;
                        optionParams['buildingRatio'] = this.land.state.buildingRatio;
                        optionParams['grave'] = this.land.state.grave;
                        optionParams['graveMove'] = this.land.state.graveMove;
                    }*/

                    /* if (this.props.author.type == 2) {
                         optionParams['owners'] = this.agencyOption.state.owners;
                         optionParams['relationOfRights'] = this.agencyOption.state.relationOfRights;
                         optionParams['loan'] = this.agencyOption.state.loan;
                         optionParams['cctv'] = this.agencyOption.state.cctv;
                         optionParams['security'] = this.agencyOption.state.security;
                         optionParams['managementCost'] = this.agencyOption.state.managementCost;
                         optionParams['managementCompany'] = this.agencyOption.state.managementCompany;
                         optionParams['builtYear'] = this.agencyOption.state.builtYear;
                         optionParams['builtBy'] = this.agencyOption.state.builtBy;
                         //optionParams['playground'] = this.agencyOption.state.playground;
                         //optionParams['kidHospital'] = this.agencyOption.state.kidHospital;
                         //optionParams['hospital'] = this.agencyOption.state.hospital;
                         // optionParams['elementarySchool'] = this.agencyOption.state.elementarySchool;
                         //optionParams['middleSchool'] = this.agencyOption.state.middleSchool;
                         //optionParams['highSchool'] = this.agencyOption.state.highSchool;
                         //optionParams['university'] = this.agencyOption.state.university;
                         optionParams['subway'] = this.agencyOption.state.subway;
                         //optionParams['bus'] = this.agencyOption.state.bus;
                         //optionParams['departmentStore'] = this.agencyOption.state.departmentStore;
                         //optionParams['mart'] = this.agencyOption.state.mart;
                         //optionParams['supermarket'] = this.agencyOption.state.supermarket;
                         //optionParams['convenienceStore'] = this.agencyOption.state.convenienceStore;

                         if (optionParams['loan'] == 2) {
                             optionParams['loanValue'] = this.agencyOption.state.loanValue;
                         }
                         if (optionParams['managementCost'] == 2) {
                             optionParams['managementCostValue'] = this.agencyOption.state.managementCostValue;
                         }
                     }*/
                    ActionRequest.createRequestFindHouse(params).then((rfhId) => {
                        let promises = [];
                        /*optionParams['rfhId'] = rfhId;

                        promises.push(ActionHouse.createHouseOptions(optionParams).then(() => { return Promise.resolve(null); }).catch(() => { return Promise.resolve(null); }));
        */
                        setTimeout(() => {
                            Promise.all(promises).then(() => {
                                this.props.history.push('/find/house?id=' + rfhId);
                            }).catch( (err) => {
                                console.log(err);
                            });
                        }, 100);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        }, 100);
    }
    render() {
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
        return (
            <div className={stylesForm.requestContainer}>
                <div className={stylesForm.formTitle}>
                    { this.props.author.type == 1 ? <span className={stylesForm.bold}>집</span> : '(공동중개) 매물' } <span className={stylesForm.bold}>찾기</span>
                </div>
                <div className={stylesForm.formGroupName}>매물 종류</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <select className={stylesForm.formSelect} value={this.state.houseType} onChange={this.handleHouseType.bind(this)}>
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
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>거래 방법</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <select className={stylesForm.formSelect} value={this.state.dealingType} onChange={(e) => this.setState({ dealingType: e.target.value })}>
                            { dealingTypeOptions }
                        </select>
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>
                    {/*{ this.state.dealingType == 1 ? '매매 가격'
                        : this.state.dealingType == 2 ? '전세 가격' : '월세 가격' }*/}
                        (최대) 금액
                    { this.state.price > 10000 ? ' (' + ConvertUtil.convertNumber2Won(this.state.price) + ')' : null }
                </div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input
                            className={stylesForm.formInput}
                            type={'number'}
                            placeholder={'가격을 입력해주세요'}
                            value={this.state.price}
                            onChange={(e) => this.setState({ price: e.target.value })}
                        />
                        <div className={stylesForm.formInputUnit}>원</div>
                        { this.state.warnPriceNotValid ? <div className={stylesForm.formInputWarn}>가격은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
                    </div>
                </div>
                { this.state.dealingType == 3 ? (
                    <div>
                        <div className={stylesForm.formGroupName}>
                            보증금{ this.state.deposit > 10000 ? ' (' + ConvertUtil.convertNumber2Won(this.state.deposit) + ')' : null }
                        </div>
                        <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                        <input
                        className={stylesForm.formInput}
                        type={'number'}
                        placeholder={'보증금을 입력해주세요'}
                        value={this.state.deposit}
                        onChange={(e) => this.setState({ deposit: e.target.value })}
                        />
                        <div className={stylesForm.formInputUnit}>원</div>
                    </div>
                { this.state.warnDepositNotValid ? <div className={stylesForm.formInputWarn}>보증금은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
                    </div>
                    </div>
                ) : null }
                <div className={stylesForm.formGroupName}>(최소) 면적{ this.state.area !== '' && this.state.area ? ' (' + ConvertUtil.convertm2ToPyeong(this.state.area) + '평)' : null }</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'number'} placeholder={'공급 면적을 입력해주세요'} value={this.state.area} onChange={(e) => this.setState({ area: e.target.value })} />
                        <div className={stylesForm.formInputUnit}>m²</div>
                        { this.state.warnAreaNotValid ? <div className={stylesForm.formInputWarn}>공급 면적은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>(최대) 면적{ this.state.areaForExclusiveUse !== '' && this.state.areaForExclusiveUse ? ' (' + ConvertUtil.convertm2ToPyeong(this.state.areaForExclusiveUse) + '평)' : null }</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'number'} placeholder={'전용 면적을 입력해주세요'} value={this.state.areaForExclusiveUse} onChange={(e) => this.setState({ areaForExclusiveUse: e.target.value })} />
                        <div className={stylesForm.formInputUnit}>m²</div>
{/*
                        { this.state.warnAreaForExclusiveUseNotValid ? <div className={stylesForm.formInputWarn}>전용 면적은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
*/}
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>희망사항 <span className={stylesForm.optionCaption}>(선택)</span></div>
                <div className={stylesForm.formGroup}>
                    <textarea className={stylesForm.formTextarea} placeholder={'중개 회원에게 고객님의 희망사항을 입력해주세요'} value={this.state.memo} onChange={(e) => this.setState({ memo: e.target.value })} />
                </div>
                <AgencyFinder onRef={(ref) => { this.agencyFinder = ref; }} />
                {/*{ this.state.houseType >= 1 && this.state.houseType <= 10 ? <ResidenceForm onRef={(ref) => { this.residence = ref; }} isRequestFind={true} /> : null }
                { this.state.houseType >= 11 && this.state.houseType <= 15 ? <NonResidenceForm onRef={(ref) => { this.nonResidence = ref; }} isRequestFind={true} /> : null }
                { this.state.houseType == 16 ? <LandForm onRef={(ref) => { this.land = ref; }} isRequestFind={true} /> : null }*/}
                {/*{ this.props.author.type == 2 ? <AgencyOptionForm onRef={(ref) => { this.agencyOption = ref; }} houseType={this.state.houseType} /> : null }*/}
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startRequestSell.bind(this)}>
                    <span>요청하기</span>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RequestFindView));
