import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionHouse from '../../Data/House/actions';

// Utils
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class SellNonResidenceView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roadType: null,
            roadWidth: null,
            signboard: null,
            veranda: null,
            landShare: null,
            buildingUsedFor: null,
            interior: null,
            parkingLot: null,
            elevator: null,

            moreLoad: false,
            btnText: '추가',

            isRequestFind: false,

            warnRequiredNotValid: false,
            warnRoadTypeNotValid: false,
            warnRoadWidthNotValid: false,
            warnSignboardNotValid: false,
            warnVerandaNotValid: false,
            warnLandShareNotValid: false,
            warnBuildingUsedForNotValid: false,
            warnInteriorNotValid: false,
            warnParkingLotNotValid: false,
            warnElevatorNotValid: false,
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    updateState(house) {
        if (house) {
            this.setState({
                roadType: house.roadType,
                roadWidth: house.roadWidth,
                signboard: house.signboard,
                veranda: house.veranda,
                landShare: house.landShare,
                buildingUsedFor: house.buildingUsedFor,
                interior: house.interior,
                parkingLot: house.parkingLot,
                elevator: house.elevator,
            });
        } else {
            this.setState({
                roadType: null,
                roadWidth: null,
                signboard: null,
                veranda: null,
                landShare: null,
                buildingUsedFor: null,
                interior: null,
                parkingLot: null,
                elevator: null,

                moreLoad: false,
                btnText: '추가',
            });
        }
    }
    handleContainer() {
        if (this.state.moreLoad == false) {
            this.setState({
                moreLoad: true,
                btnText: '접기',
            });
        } else {
            this.setState({
                moreLoad: false,
                btnText: '추가',
            });
        }
    }

    createCheck() {
        this.state.warnRequiredNotValid = false;
        this.state.warnRoadTypeNotValid = false;
        this.state.warnRoadWidthNotValid = false;
        this.state.warnSignboardNotValid = false;
        this.state.warnVerandaNotValid = false;
        this.state.warnLandShareNotValid = false;
        this.state.warnBuildingUsedForNotValid = false;
        this.state.warnInteriorNotValid = false;
        this.state.warnParkingLotNotValid = false;
        this.state.warnElevatorNotValid = false;

        if (this.state.roadType == '' || this.state.roadType == null) {
            this.state.warnRoadTypeNotValid = true;
        }
        if (this.state.roadWidth == '' || this.state.roadWidth == null) {
            this.state.warnRoadWidthNotValid = true;
        }
        if (this.state.signboard == '' || this.state.signboard == null) {
            this.state.warnSignboardNotValid = true;
        }
        if (this.state.veranda == '' || this.state.veranda == null) {
            this.state.warnVerandaNotValid = true;
        }
        if (!/^\d+(?:[.]?[\d]?[\d])?$/.test(this.state.landShare) || this.state.landShare > 1000000000000) {
            this.state.warnLandShareNotValid = true;
        }
        if (this.state.buildingUsedFor == '' || this.state.buildingUsedFor == null) {
            this.state.warnBuildingUsedForNotValid = true;
        }
        if (this.state.interior == '' || this.state.interior == null) {
            this.state.warnInteriorNotValid = true;
        }
        if (this.state.parkingLot == '' || this.state.parkingLot == null) {
            this.state.warnParkingLotNotValid = true;
        }
        if (this.state.elevator == '' || this.state.elevator == null) {
            this.state.warnElevatorNotValid = true;
        }
        if (this.state.warnRoadTypeNotValid
            || this.state.warnRoadWidthNotValid
            || this.state.warnSignboardNotValid
            || this.state.warnVerandaNotValid
            || this.state.warnLandShareNotValid
            || this.state.warnBuildingUsedForNotValid
            || this.state.warnInteriorNotValid
            || this.state.warnParkingLotNotValid
            || this.state.warnElevatorNotValid
        ) {
            this.state.warnRequiredNotValid = true;
        }
    }
    render() {
        let roadTypeOptions = ActionHouse.HOUSE_ROAD_TYPE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        })
        let roadWidthOptions = ActionHouse.HOUSE_ROAD_WIDTH_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let signboardOptions = ActionHouse.HOUSE_SIGNBOARD_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let verandaOptions = ActionHouse.HOUSE_VERANDA_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let interiorOptions = ActionHouse.HOUSE_INTERIOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let parkingLotOptions = ActionHouse.HOUSE_PARKING_LOT_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let elevatorOptions = ActionHouse.HOUSE_ELEVATOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        return (
            <div>
                <div className={stylesForm.moreOption}>
                    <div className={stylesForm.optionTitle}><b>옵션/상세사항</b> <span className={stylesForm.optionCaption}>{/*{this.props.author.type == 1 || this.props.isRequestFind ? '(선택)' : '(필수)'}*/}(선택)</span></div>
                    <button className={stylesForm.optionBtn} onClick={this.handleContainer.bind(this)}>{this.state.btnText}</button>
                    { this.state.warnRequiredNotValid ? <div className={stylesForm.formInputWarn}>필수 항목을 입력해주세요.</div> : null }
                </div>
                <div className={(this.state.moreLoad ? '' : styles.hide + ' ') + stylesForm.sellContainer}>
                    <div className={stylesForm.formGroupName}>접한 도로 상태</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.roadType || ''} onChange={(e) => this.setState({ roadType: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { roadTypeOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnRoadTypeNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>접한 도로 폭</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.roadWidth || ''} onChange={(e) => this.setState({ roadWidth: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { roadWidthOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnRoadWidthNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>간판설치</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.signboard || ''} onChange={(e) => this.setState({ signboard: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { signboardOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnSignboardNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>베란다,테라스</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.veranda || ''} onChange={(e) => this.setState({ veranda: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { verandaOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnVerandaNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>대지 지분</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput} type={'number'} placeholder={'대지 지분을 입력해주세요'} value={this.state.landShare || ''} onChange={(e) => this.setState({ landShare: e.target.value })} />
                            <div className={stylesForm.formInputUnit}>m²</div>
                        </div>
                    </div>
                    { this.state.warnLandShareNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>건축물 대장 용도</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput} type={'text'} placeholder={'건축물 대장 용도를 입력해주세요'} value={this.state.buildingUsedFor || ''} onChange={(e) => this.setState({ buildingUsedFor: e.target.value })} />
                        </div>
                    </div>
                    { this.state.warnBuildingUsedForNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>기존 인테리어</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.interior || ''} onChange={(e) => this.setState({ interior: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { interiorOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnInteriorNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>주차장</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.parkingLot || ''} onChange={(e) => this.setState({ parkingLot: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { parkingLotOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnParkingLotNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>승강기</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.elevator || ''} onChange={(e) => this.setState({ elevator: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { elevatorOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnElevatorNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SellNonResidenceView));
