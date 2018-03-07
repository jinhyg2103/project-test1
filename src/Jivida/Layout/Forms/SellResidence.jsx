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

class SellResidenceView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            room: null,
            bathroom: null,
            verandaExtension: null,
            direction: null,
            bay: null,
            boiler: null,
            interior: null,
            paper: null,
            floor: null,
            parkingLot: null,
            elevator: null,
            entrance: null,

            moreLoad: false,
            btnText: '추가',

            isRequestFind: false,

            warnRequiredNotValid: false,
            warnOptionNotValid: false,
            warnRoomNotValid: false,
            warnBathroomNotValid: false,
            warnVerandaExtensionNotValid: false,
            warnDirectionNotValid: false,
            warnBayNotValid: false,
            warnBoilerNotValid: false,
            warnInteriorNotValid: false,
            warnPaperNotValid: false,
            warnFloorNotValid: false,
            warnParkingLotNotValid: false,
            warnElevatorNotValid: false,
            warnEntranceNotValid: false,
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    updateState(house) {
        if (house) {
            this.setState({
                options: house.options || [],
                room: house.room,
                bathroom: house.bathroom,
                verandaExtension: house.verandaExtension,
                direction: house.direction,
                bay: house.bay,
                boiler: house.boiler,
                interior: house.interior,
                paper: house.paper,
                floor: house.floor,
                parkingLot: house.parkingLot,
                elevator: house.elevator,
                entrance: house.entrance,
            });
        } else {
            this.setState({
                options: [],
                room: null,
                bathroom: null,
                verandaExtension: null,
                direction: null,
                bay: null,
                boiler: null,
                interior: null,
                paper: null,
                floor: null,
                parkingLot: null,
                elevator: null,
                entrance: null,

                moreLoad: false,
                btnText: '추가',
            })
        }
    }
    handleCheckboxChange(e) {
        if (e.target.checked) {
            this.state.options.push(Number(e.target.value));
            console.log(e.target.value);
        } else {
            console.log(e.target.value);
            this.state.options.splice(this.state.options.indexOf(Number(e.target.value)), 1);
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
        this.state.warnOptionNotValid = false;
        this.state.warnRoomNotValid = false;
        this.state.warnBathroomNotValid = false;
        this.state.warnVerandaExtensionNotValid = false;
        this.state.warnDirectionNotValid = false;
        this.state.warnBayNotValid = false;
        this.state.warnBoilerNotValid = false;
        this.state.warnInteriorNotValid = false;
        this.state.warnPaperNotValid = false;
        this.state.warnFloorNotValid = false;
        this.state.warnParkingLotNotValid = false;
        this.state.warnElevatorNotValid = false;
        this.state.warnEntranceNotValid = false;

        if (this.state.options.length == 0 || this.state.options == null) {
            this.state.warnOptionNotValid = true;
        }
        if (this.state.room == '' || this.state.room == null) {
            this.state.warnRoomNotValid = true;
        }
        if (this.state.bathroom == '' || this.state.bathroom == null) {
            this.state.warnBathroomNotValid = true;
        }
        if (this.state.verandaExtension == '' || this.state.verandaExtension == null) {
            this.state.warnVerandaExtensionNotValid = true;
        }
        if (this.state.direction == '' || this.state.direction == null) {
            this.state.warnDirectionNotValid = true;
        }
        if (this.state.bay == '' || this.state.bay == null) {
            this.state.warnBayNotValid = true;
        }
        if (this.state.boiler == '' || this.state.boiler == null) {
            this.state.warnBoilerNotValid = true;
        }
        if (this.state.interior == '' || this.state.interior == null) {
            this.state.warnInteriorNotValid = true;
        }
        if (this.state.paper == '' || this.state.paper == null) {
            this.state.warnPaperNotValid = true;
        }
        if (this.state.floor == '' || this.state.floor == null) {
            this.state.warnFloorNotValid = true;
        }
        if (this.state.parkingLot == '' || this.state.parkingLot == null) {
            this.state.warnParkingLotNotValid = true;
        }
        if (this.state.elevator == '' || this.state.elevator == null) {
            this.state.warnElevatorNotValid = true;
        }
        if (this.state.entrance == '' || this.state.entrance == null) {
            this.state.warnEntranceNotValid = true;
        }
        if (this.state.warnOptionNotValid
            || this.state.warnRoomNotValid
            || this.state.warnBathroomNotValid
            || this.state.warnVerandaExtensionNotValid
            || this.state.warnDirectionNotValid
            || this.state.warnBayNotValid
            || this.state.warnBoilerNotValid
            || this.state.warnInteriorNotValid
            || this.state.warnPaperNotValid
            || this.state.warnFloorNotValid
            || this.state.warnParkingLotNotValid
            || this.state.warnElevatorNotValid
            || this.state.warnEntranceNotValid
        ) {
            this.state.warnRequiredNotValid = true;
        }
    }
    render() {
        /*let optionOptions = ActionHouse.HOUSE_OPTION_ARRAY.map((type, index) => {
            return <div key={index} className={stylesForm.detailBtn}><input type={'checkbox'} id={index} value={type.value} name={'options'} onChange={this.handleCheckboxChange.bind(this)}/><label htmlFor={index}>{type.label}</label></div>;
        })*/
        let optionOptions = () => {
            let count = 0;
            if (this.state.options) {
                this.state.options.sort((a, b) => {
                    return a - b;
                });
            }
            return ActionHouse.HOUSE_OPTION_ARRAY.map((type, index) => {
                if (this.state.options && this.state.options.length > 0) {
                    if (Number(this.state.options[count]) == Number(type.value)) {
                        count += 1;
                        return (
                            <div key={index} className={stylesForm.detailBtn}><input type={'checkbox'} checked={true} id={index} value={type.value} name={'options'} onChange={this.handleCheckboxChange.bind(this)}/><label htmlFor={index}>{type.label}</label></div>
                        );
                    } else {
                        return (
                            <div key={index} className={stylesForm.detailBtn}><input type={'checkbox'} id={index} value={type.value} name={'options'} onChange={this.handleCheckboxChange.bind(this)}/><label htmlFor={index}>{type.label}</label></div>
                        );
                    }
                } else {
                    return (
                        <div key={index} className={stylesForm.detailBtn}><input type={'checkbox'} id={index} value={type.value} name={'options'} onChange={this.handleCheckboxChange.bind(this)}/><label htmlFor={index}>{type.label}</label></div>
                    );
                }
            });
        }
        let roomOptions = ActionHouse.HOUSE_ROOM_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let bathroomOptions = ActionHouse.HOUSE_BATHROOM_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let directionOptions = ActionHouse.HOUSE_DIRECTION_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let bayOptions = ActionHouse.HOUSE_BAY_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let verandaExtensionOptions = ActionHouse.HOUSE_VERANDA_EXTENSION_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let interiorOptions = ActionHouse.HOUSE_INTERIOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let paperOptions = ActionHouse.HOUSE_PAPER_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let floorOptions = ActionHouse.HOUSE_FLOOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let boilerOptions = ActionHouse.HOUSE_BOILER_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let parkingLotOptions = ActionHouse.HOUSE_PARKING_LOT_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let elevatorOptions = ActionHouse.HOUSE_ELEVATOR_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let entranceOptions = ActionHouse.HOUSE_ENTRANCE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        return (
            <div>
                <div className={stylesForm.moreOption}>
                    <div className={stylesForm.optionTitle}><b>옵션/상세사항</b> <span className={stylesForm.optionCaption}>{/*{this.props.author.type == 1 || this.props.isRequestFind ? '(선택)' : '(필수)'}*/}(선택)</span></div>
                    <button className={stylesForm.optionBtn} onClick={this.handleContainer.bind(this)}>{this.state.btnText}</button>
                    { this.state.warnRequiredNotValid ? <div className={stylesForm.formInputWarn}>필수 항목을 입력해주세요.</div> : null }
                </div>
                <div className={(this.state.moreLoad ? '' : styles.hide + ' ') + stylesForm.sellContainer} >
                    <div className={stylesForm.optionFormGroup}>
                        <div className={stylesForm.optionFormRow}>
                            { optionOptions() }
                        </div>
                    </div>
                    { this.state.warnOptionNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>방</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.room || ''} onChange={(e) => this.setState({ room: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { roomOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnRoomNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>화장실</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.bathroom || ''} onChange={(e) => this.setState({ bathroom: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { bathroomOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnBathroomNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>베란다 확장</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.verandaExtension || ''} onChange={(e) => this.setState({ verandaExtension: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { verandaExtensionOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnVerandaExtensionNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>방향</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.direction || ''} onChange={(e) => this.setState({ direction: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { directionOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnDirectionNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>배치 구조</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.bay || ''} onChange={(e) => this.setState({ bay: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { bayOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnBayNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>보일러</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.boiler || ''} onChange={(e) => this.setState({ boiler: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { boilerOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnBoilerNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>인테리어</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.interior || ''} onChange={(e) => this.setState({ interior: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { interiorOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnInteriorNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>도배 여부</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.paper || ''} onChange={(e) => this.setState({ paper: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { paperOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnPaperNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>장판 여부</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.floor || ''} onChange={(e) => this.setState({ floor: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { floorOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnFloorNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>주차장</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.parkingLot || ''} onChange={(e) => this.setState({ parkingLot: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { parkingLotOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnParkingLotNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>승강기</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.elevator || ''} onChange={(e) => this.setState({ elevator: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { elevatorOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnElevatorNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                    <div className={stylesForm.formGroupName}>현관 구조</div>
                    <div className={stylesForm.formGroup + ' ' + stylesForm.selectGroup}>
                        <div className={stylesForm.formRow}>
                            <select className={stylesForm.formSelect} value={this.state.entrance || ''} onChange={(e) => this.setState({ entrance: e.target.value })}>
                                <option value={''}>항목을 선택해주세요.</option>
                                { entranceOptions }
                            </select>
                        </div>
                    </div>
                    { this.state.warnEntranceNotValid ? <div className={stylesForm.formInputWarn}>옵션을 선택해주세요.</div> : null }
                    <div className={stylesForm.selectGroupBlank}></div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author
    };
})(withRouter(SellResidenceView));
