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

class SellLandView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roadType: null,
            roadWidth: null,
            roadLength: null,
            landShape: null,
            landCategory: null,
            landUsedFor: null,
            landUsedForValue: null,
            floorAreaRatio: null,
            buildingRatio: null,
            grave: null,
            graveMove: null,

            moreLoad: false,
            btnText: '추가',

            landUsedForWarning: '옵션을 선택해주세요',

            isRequestFind: false,

            warnRequiredNotValid: false,
            warnRoadTypeNotValid: false,
            warnRoadWidthNotValid: false,
            warnRoadLengthNotValid: false,
            warnLandShapeNotValid: false,
            warnLandCategoryNotValid: false,
            warnLandUsedForNotValid: false,
            warnFloorAreaRatioNotValid: false,
            warnBuildingRatioNotValid: false,
            warnGraveNotValid: false,
            warnGraveMoveNotValid: false,
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    updateState(house) {
        console.log(house);
        if (house) {
            this.setState({
                roadType: house.roadType,
                roadWidth: house.roadWidth,
                roadLength: house.roadLength,
                landShape: house.landShape,
                landCategory: house.landCategory,
                landUsedFor: house.landUsedFor,
                landUsedForValue: house.landUsedForValue,
                floorAreaRatio: house.floorAreaRatio,
                buildingRatio: house.buildingRatio,
                grave: house.grave,
                graveMove: house.graveMove,
            });
        } else {
            this.setState({
                roadType: null,
                roadWidth: null,
                roadLength: null,
                landShape: null,
                landCategory: null,
                landUsedFor: null,
                landUsedForValue: null,
                floorAreaRatio: null,
                buildingRatio: null,
                grave: null,
                graveMove: null,

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
    handleLandUsedForChange(e) {
        this.setState({
            landUsedFor: e.target.value,
        });
        if (e.target.value == 5) {
            this.setState({
                landUsedForWarning: '옵션을 입력해주세요',
            });
        } else {
            this.setState({
                landUsedForWarning: '옵션을 선택해주세요',
            });
        }
    }
    createCheck() {
        this.state.warnRequiredNotValid = false;
        this.state.warnRoadTypeNotValid = false;
        this.state.warnRoadWidthNotValid = false;
        this.state.warnRoadLengthNotValid = false;
        this.state.warnLandShapeNotValid = false;
        this.state.warnLandCategoryNotValid = false;
        this.state.warnLandUsedForNotValid = false;
        this.state.warnFloorAreaRatioNotValid = false;
        this.state.warnBuildingRatioNotValid = false;
        this.state.warnGraveNotValid = false;
        this.state.warnGraveMoveNotValid = false;

        if (this.state.roadType == '' || this.state.roadType == null) {
            this.state.warnRoadTypeNotValid = true;
        }
        if (this.state.roadWidth == '' || this.state.roadWidth == null) {
            this.state.warnRoadWidthNotValid = true;
        }
        if (this.state.roadLength == '' || this.state.roadLength == null) {
            this.state.warnRoadLengthNotValid = true;
        }
        if (this.state.landShape == '' || this.state.landShape == null) {
            this.state.warnLandShapeNotValid = true;
        }
        if (this.state.landCategory == '' || this.state.landCategory == null) {
            this.state.warnLandCategoryNotValid = true;
        }
        if (this.state.landUsedFor == '' || this.state.landUsedFor == null || (this.state.landUsedFor == 5 && (this.state.landUsedForValue == null || this.state.landUsedForValue == ''))) {
            this.state.warnLandUsedForNotValid = true;
        }
        if (!/^\d+(?:[.]?[\d]?[\d])?$/.test(this.state.floorAreaRatio) || this.state.floorAreaRatio > 1000000000000) {
            this.state.warnFloorAreaRatioNotValid = true;
        }
        if (!/^\d+(?:[.]?[\d]?[\d])?$/.test(this.state.buildingRatio) || this.state.buildingRatio > 1000000000000) {
            this.state.warnBuildingRatioNotValid = true;
        }
        if (this.state.grave == '' || this.state.grave == null) {
            this.state.warnGraveNotValid = true;
        }
        if (this.state.graveMove == '' || this.state.graveMove == null) {
            this.state.warnGraveMoveNotValid = true;
        }
        if (this.state.warnRoadTypeNotValid
            || this.state.warnRoadWidthNotValid
            || this.state.warnRoadLengthNotValid
            || this.state.warnLandShapeNotValid
            || this.state.warnLandCategoryNotValid
            || this.state.warnLandUsedForNotValid
            || this.state.warnFloorAreaRatioNotValid
            || this.state.warnBuildingRatioNotValid
            || this.state.warnGraveNotValid
            || this.state.warnGraveMoveNotValid
        ) {
            this.state.warnRequiredNotValid = true;
        }
    }
    render() {
        let roadTypeOptions = ActionHouse.HOUSE_ROAD_TYPE_LAND_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        })
        let roadWidthOptions = ActionHouse.HOUSE_ROAD_WIDTH_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let roadLengthOptions = ActionHouse.HOUSE_ROAD_LENGTH_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let landShapeOptions = ActionHouse.HOUSE_LAND_SHAPE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let landUsedForOptions = ActionHouse.HOUSE_LAND_USED_FOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let graveOptions = ActionHouse.HOUSE_GRAVE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let graveMoveOptions = ActionHouse.HOUSE_GRAVE_MOVE_ARRAY.map((type, index) => {
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
                    <div className={stylesForm.formGroupName}>도로 접함</div>
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
                    <div className={stylesForm.formGroupName}>도로 접한 길이</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.roadLength || ''} onChange={(e) => this.setState({ roadLength: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { roadLengthOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnRoadLengthNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>토지 모양</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.landShape || ''} onChange={(e) => this.setState({ landShape: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { landShapeOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnLandShapeNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>지목</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput} type={'text'} placeholder={'지목을 입력해주세요'} value={this.state.landCategory || ''} onChange={(e) => this.setState({ landCategory: e.target.value })} />
                        </div>
                    </div>
                    { this.state.warnLandCategoryNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>용도 지역</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.landUsedFor || ''} onChange={this.handleLandUsedForChange.bind(this)}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { landUsedForOptions }
                            </select>
                        </div>
                        { this.state.landUsedFor == 5 ?
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput} type={'text'} placeholder={'용도 지역을 입력해주세요'} value={this.state.landUsedForValue || ''} onChange={(e) => this.setState({ landUsedForValue: e.target.value })} />
                            </div>
                            : null
                        }
                    </div>
                    { this.state.warnLandUsedForNotValid ? <div className={stylesForm.formInputWarn}>{this.state.landUsedForWarning}</div> : null }
                    <div className={stylesForm.formGroupName}>용적률</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput} type={'number'} placeholder={'용적률을 입력해주세요'} value={this.state.floorAreaRatio || ''} onChange={(e) => this.setState({ floorAreaRatio: e.target.value })} />
                            <div className={stylesForm.formInputUnit}>%</div>
                        </div>
                    </div>
                    { this.state.warnFloorAreaRatioNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>건폐율</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput} type={'number'} placeholder={'건폐율을 입력해주세요'} value={this.state.buildingRatio || ''} onChange={(e) => this.setState({ buildingRatio: e.target.value })} />
                            <div className={stylesForm.formInputUnit}>%</div>
                        </div>
                    </div>
                    { this.state.warnBuildingRatioNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>토지 내 분묘</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.grave || ''} onChange={(e) => this.setState({ grave: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { graveOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnGraveNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.formGroupName}>분묘기지권</div>
                    <div className={stylesForm.formGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.graveMove || ''} onChange={(e) => this.setState({ graveMove: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { graveMoveOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnGraveMoveNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author
    };
})(withRouter(SellLandView));
