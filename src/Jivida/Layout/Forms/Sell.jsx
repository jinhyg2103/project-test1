import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import ResidenceForm from './SellResidence';
import NonResidenceForm from './SellNonResidence';
import LandForm from './SellLand';
import AgencyOptionForm from './SellAgencyOption';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionHouse from '../../Data/House/actions';

// Utils
import * as UploadImageUtil from '../../Lib/UploadManager/UploadImage';
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';
import * as ConvertUtil from '../../Lib/Utils/converter';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class SellView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            deposit: '',
            area: '', // 공금면적
            areaForExclusiveUse: '', // 전용면적
            type: 1, // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
            dealingType: 1, //매매(1), 전세(2), 월세(3),

            imageUrls: [],
            imageFiles: [],

            warnTitleNotValid: false, // 제목은 70자 이하
            warnPriceNotValid: false, // 가격은 숫자만
            warnDepositNotValid: false, // 보증금은 숫자만
            warnAreaNotValid: false, // 공급 면적은 숫자만
/*
            warnAreaForExclusiveUseNotValid: false, // 전용 면적은 숫자만
*/
            warnJusoNotValid: false, //
            warnPhotoNotExist: false,

            warnAgencyRequiredNotValid: false,

            juso: {
                roadFullAddr: '',
            },
        };
    }
    componentWillMount() {
        if(!this.props.author.id) {
            this.props.history.push('/form/login');
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.refresh(nextProps);

    }
    refresh(props) {
        let params;
        if (props) {
            params = ParseUrlParameter.parse(props.location.search);
        } else {
            params = ParseUrlParameter.parse(this.props.location.search);
        }
        console.log(params);
        if (params.hId && params.edit) {
            this.setState({
                hId: params.hId,
            });
            ActionHouse.getHouseById({ hId: params.hId })
                .then((house) => {
                    if (this.props.author.id != house.user.id) {
                        alert('나의 집이 아닙니다.');
                        this.props.history.push('/');
                    } else {
                        if (this.agencyOption) this.agencyOption.updateState(house);
                        this.setState({
                            title: house.title,
                            description: house.description,
                            price: house.price,
                            deposit: house.deposit,
                            area: house.area,
                            areaForExclusiveUse: house.areaForExclusiveUse,
                            type: house.type,
                            dealingType: house.dealingType,
                            juso: {
                                roadFullAddr: house.addressFull,
                                inputYn: 'Y',
                            },
                        });
                        if (house.photos) {
                            house.photos.forEach((photo, i) => {
                                this.setState({
                                    imageUrls: this.state.imageUrls.concat(photo.url),
                                    imageFiles: this.state.imageFiles.concat(null),
                                });
                            });
                        }
                        if (this.residence) this.residence.updateState(house);
                        if (this.nonResidence) this.nonResidence.updateState(house);
                        if (this.land) {
                            this.land.updateState(house);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.props.history.push('/');
                });
        } else {
            this.setState({
                hId: null,

                title: '',
                description: '',
                price: '',
                deposit: '',
                area: '',
                areaForExclusiveUse: '',
                type: 1,
                dealingType: 1,

                imageUrls: [],
                imageFiles: [],

                warnTitleNotValid: false,
                warnPriceNotValid: false,
                warnDepositNotValid: false,
                warnAreaNotValid: false,
/*
                warnAreaForExclusiveUseNotValid: false,
*/
                warnJusoNotValid: false,
                warnPhotoNotExist: false,

                warnAgencyRequiredNotValid: false,

                juso: {
                    roadFullAddr: '',
                },
            })
        }
        if (this.residence) this.residence.updateState();
        if (this.nonResidence) this.nonResidence.updateState();
        if (this.land) this.land.updateState();
        if (this.agencyOption) this.agencyOption.updateState();
    }
    handleType(e) {
        this.setState({
            type: e.target.value,
        });
        this.agencyOption.initialState(e.target.value);
    }
    addImages(e) {
        let reader = new FileReader();
        Array.prototype.forEach.call(e.target.files, (file, index) => {
            setTimeout(() => {
                reader.onloadend = () => {
                    this.setState({
                        imageFiles: [...this.state.imageFiles, file],
                        imageUrls: [...this.state.imageUrls, reader.result],
                    });
                }
                reader.readAsDataURL(file);
            }, 50 * index);
        });
    }
    deleteImages(index) {
        this.state.imageFiles.splice(index, 1);
        this.state.imageUrls.splice(index, 1);
        this.setState({
            imageFiles: this.state.imageFiles,
            imageUrls: this.state.imageUrls,
        });
    }
    openSearchAddressPopup() {
        window.open('/popup/jusoPopup', 'pop', 'width=570,height=420, scrollbars=yes, resizable=yes');
        window.jusoCallBack = (juso) => {
            this.setState({ juso: Object.assign({}, juso) });
        };
    }
    startCreateHouse() {
        this.setState({
            warnTitleNotValid: false,
            warnPriceNotValid: false,
            warnDepositNotValid: false,
            warnAreaNotValid: false,
/*
            warnAreaForExclusiveUseNotValid: false,
*/
            warnJusoNotValid: false,
            warnAgencyRequiredNotValid: false,
            warnPhotoNotExist: false,
        });
        if (this.state.title == null || this.state.title.length == 0 || this.state.title.length > 71) {
            this.setState({ warnTitleNotValid: true });
        }
        if (!/^\d+$/.test(this.state.price) || this.state.price > 1000000000000) {
            this.setState({ warnPriceNotValid: true });
        }
        if ((!/^\d+$/.test(this.state.deposit) || this.state.deposit > 1000000000000) && this.state.dealingType == 3) {
            this.setState({ warnDepositNotValid: true });
        }
        if (!/^\d+(?:[.]?[\d]?[\d])?$/.test(this.state.area) || this.state.area > 1000000000000) {
            this.setState({ warnAreaNotValid: true });
        }
/*        if (!/^\d+(?:[.]?[\d]?[\d])?$/.test(this.state.areaForExclusiveUse) || this.state.areaForExclusiveUse > 1000000000000) {
            this.setState({ warnAreaForExclusiveUseNotValid: true });
        }*/
        if (this.state.juso.inputYn != 'Y') {
            this.setState({ warnJusoNotValid: true });
        }
        if (this.state.imageUrls.length == 0) {
            this.setState({ warnPhotoNotExist: true });
        }
        // 필수 상세사항 validation 체크
        /*if (this.props.author.type == 2) {
            if (this.state.type >= 1 && this.state.type <= 10) {
                this.residence.createCheck();
                this.setState({
                    warnAgencyRequiredNotValid: this.residence.state.warnRequiredNotValid,
                });
            } else if (this.state.type >= 11 && this.state.type <= 15) {
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
            if (this.state.warnTitleNotValid
                || this.state.warnAreaNotValid
                || this.state.warnPriceNotValid
                || this.state.warnDepositNotValid
/*                || this.state.warnAreaForExclusiveUseNotValid*/
                || this.state.warnJusoNotValid
                || this.state.warnAgencyRequiredNotValid
                || this.state.warnPhotoNotExist
            ) {
                return;
            }
            // 가입시작
            let params = {
                uId: this.props.author.id,
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                deposit: this.state.deposit,
                type: this.state.type,
                area: this.state.area,
                areaForExclusiveUse: this.state.areaForExclusiveUse,
                dealingType: this.state.dealingType,
                state: this.state.juso.siNm,
                city: this.state.juso.sggNm,
                address1: this.state.juso.emdNm,
                address2: this.state.juso.addrDetail,
                addressFull: this.state.juso.roadFullAddr,
                longitude: this.state.juso.entX,
                latitude: this.state.juso.entY,
            };
            let optionParams = {};
            if (this.state.type >= 1 && this.state.type <= 10) { // 주거
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
            } else if (this.state.type >= 11 && this.state.type <= 15) { // 비주거
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
                optionParams['landUsedForValue'] = this.land.state.landUsedForValue;
                optionParams['floorAreaRatio'] = this.land.state.floorAreaRatio;
                optionParams['buildingRatio'] = this.land.state.buildingRatio;
                optionParams['grave'] = this.land.state.grave;
                optionParams['graveMove'] = this.land.state.graveMove;
            }

            if (this.props.author.type == 2) {
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
            }
            let updatePhotos = (hId) => {
                let promises = [];
                let photos = [];

                this.state.imageFiles.map((file, index) => {
                    if (file) {
                        promises.push(UploadImageUtil.uploadByFile(file)
                            .then((url) => {
                                photos.push({
                                    hId: hId,
                                    order: index,
                                    url: url,
                                });
                                return Promise.resolve(null);
                            })
                            .catch((err) => {
                                return Promise.resolve(null);
                            }));
                    } else {
                        photos.push({
                            hId: hId,
                            order: index,
                            url: this.state.imageUrls[index],
                        });
                        return null;
                    }
                });
                setTimeout(() => {
                    Promise.all(promises).then(() => {
                        ActionHouse.updateHousePhotos({ photos: photos }).then((data) => {
                            if (this.props.author.type == 1 ) {
                                this.props.history.push('/form/request/sell?hId=' + hId);
                            } else {
                                this.props.history.push('/myHouses/all');
                            }
                        }).catch((err) => {
                            console.log(err);
                            alert('이미지 업로드 실패');
                        });
                    }).catch( (err) => {
                        console.log(err);
                        alert('이미지 업로드 실패');
                    });
                }, 100);
            }
            if ( !this.state.hId ) {
                ActionHouse.createHouse(params).then((hId) => {
                    optionParams['hId'] = hId;
                    ActionHouse.createHouseOptions(optionParams).then(() => {
                        updatePhotos(hId);
                    }).catch(() => { });
                }).catch((err) => {
                    alert('업로드 실패');
                });
            } else {
                params['hId'] = this.state.hId;
                ActionHouse.updateHouse(params).then((data) => {
                    optionParams['hId'] = this.state.hId;
                    ActionHouse.updateHouseOptions(optionParams).then(() => {
                        updatePhotos(this.state.hId);
                    }).catch(() => { });
                }).catch((err) => {
                    alert('수정 실패');
                });
            }
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
        let previewImages = this.state.imageUrls.map((url, index) => {
            return (
                <div key={index} className={stylesForm.previewImageBox}>
                    <img className={stylesForm.previewImage} src={url} />
                    <div className={stylesForm.previewImageDelete + ' ' + styles.inputBtn} onClick={this.deleteImages.bind(this, index)}><i className={'icon icon-ic_delete'}></i></div>
                </div>
            );
        });
        return (
            <div className={stylesForm.sellContainer}>
                <div className={stylesForm.formTitle}>
                    { this.props.author.type == 1 ? null : '매물' }
                    { this.props.author.type == 1 ? <span className={stylesForm.bold}>집 내놓기 1단계</span> : this.state.hId ? <span className={stylesForm.bold}> 수정하기</span> : <span className={stylesForm.bold}> 등록하기</span> }
                </div>
                <div className={stylesForm.formGroupName}>제목</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'text'} placeholder={'제목을 입력해주세요'} value={this.state.title || ''} onChange={(e) => this.setState({ title: e.target.value })} />
                        { this.state.warnTitleNotValid ? <div className={stylesForm.formInputWarn}>제목은 70자 이하입니다.</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>매물 종류</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <select className={stylesForm.formSelect} value={this.state.type || ''} onChange={this.handleType.bind(this)}>
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
                        <select className={stylesForm.formSelect} value={this.state.dealingType || ''} onChange={(e) => this.setState({ dealingType: e.target.value })}>
                            { dealingTypeOptions }
                        </select>
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>
                    { this.state.dealingType == 1 ? '매매 가격'
                        : this.state.dealingType == 2 ? '전세 가격' : '월세 가격' }
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
                <div className={stylesForm.formGroupName}>면적 1 [공급면적, 분양면적, 토지면적] <span className={stylesForm.optionCaption}>(필수)</span>{ this.state.area !== '' && this.state.area ? ' (' + ConvertUtil.convertm2ToPyeong(this.state.area) + '평)' : null }</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'number'} placeholder={'공급 면적을 입력해주세요'} value={this.state.area || ''} onChange={(e) => this.setState({ area: e.target.value })} />
                        <div className={stylesForm.formInputUnit}>m²</div>
                        { this.state.warnAreaNotValid ? <div className={stylesForm.formInputWarn}>공급 면적은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>면적 2 [전용면적, 연면적] <span className={stylesForm.optionCaption}>(선택)</span>{ this.state.areaForExclusiveUse !== '' && this.state.areaForExclusiveUse ? ' (' + ConvertUtil.convertm2ToPyeong(this.state.areaForExclusiveUse) + '평)' : null }</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'number'} placeholder={'전용 면적을 입력해주세요'} value={this.state.areaForExclusiveUse || ''} onChange={(e) => this.setState({ areaForExclusiveUse: e.target.value })} />
                        <div className={stylesForm.formInputUnit}>m²</div>
{/*
                        { this.state.warnAreaForExclusiveUseNotValid ? <div className={stylesForm.formInputWarn}>공급 면적은 숫자만 입력해주세요. (최대 1,000,000,000,000)</div> : null }
*/}
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>상세 주소</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} placeholder={'주소를 입력해주세요.'} value={this.state.juso.roadFullAddr || ''} onClick={this.openSearchAddressPopup.bind(this)} />
                        <div className={stylesForm.inputVerifyBox + ' ' + styles.inputBtn} onClick={this.openSearchAddressPopup.bind(this)}>주소검색</div>
                        { this.state.warnJusoNotValid ? <div className={stylesForm.formInputWarn}>주소를 입력해주세요.</div> : null }
                    </div>
                </div>
                { this.props.author.type == 1 ? null :
                    <div>
                        <div className={stylesForm.formGroupName}>상세설명</div>
                        <div className={stylesForm.formGroup}>
                            <textarea className={stylesForm.formTextarea} placeholder={'상세한 설명을 입력해주세요'} value={this.state.description || ''} onChange={(e) => this.setState({ description: e.target.value })} />
                        </div>
                    </div>
                }
                <div className={stylesForm.formGroupName}>사진 업로드</div>
                { this.state.warnPhotoNotExist ? <div className={stylesForm.formInputWarn}>사진을 올려주세요.</div> : null }
                <div className={stylesForm.formUploadImagesBox}>
                    <div className={stylesForm.formUploadBtn + ' ' + styles.inputBtn}>
                       <label htmlFor={'upoadImages'}>사진 등록</label>
                        <input id={'upoadImages'} type={'file'} className={stylesForm.formUploadHiddenInput} accept={'image/*'} onChange={this.addImages.bind(this)} multiple={true} />
                    </div>
                    <div className={stylesForm.formUploadDescription}>
                        <div className={stylesForm.formUploadDescriptionLine}>
                            - 사진은 가로로 찍은 사진을 권장드립니다.
                        </div>
                        <div className={stylesForm.formUploadDescriptionLine}>
                            - 사진 용량은 1장 당 10MB까지 가능합니다
                        </div>
                        <div className={stylesForm.formUploadDescriptionLine}>
                            - 사진은 최소 3장 이상, 최대 15장까지 등록할 수 있습니다.
                        </div>
                    </div>
                </div>
                <div className={stylesForm.formPreviewImages}>
                    <div className={stylesForm.formPreviewImagesDescription}>
                    </div>
                    {previewImages}
                </div>

                { this.state.type >= 1 && this.state.type <= 10 ? <ResidenceForm onRef={(ref) => { this.residence = ref; }} /> : null }
                { this.state.type >= 11 && this.state.type <= 15 ? <NonResidenceForm onRef={(ref) => { this.nonResidence = ref; }} /> : null }
                { this.state.type == 16 ? <LandForm onRef={(ref) => { this.land = ref; }} /> : null }
                { this.props.author.type == 2 ? <AgencyOptionForm onRef={(ref) => { this.agencyOption = ref; }} houseType={this.state.type} /> : null }
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startCreateHouse.bind(this)}>
                    <span>{ this.props.author.type == 1 ? '집 내놓기' : this.state.hId ? '매물 수정하기' : '매물 등록하기' }</span>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SellView));
