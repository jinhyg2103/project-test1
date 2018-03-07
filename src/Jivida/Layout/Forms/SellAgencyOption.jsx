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

class SellOptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: null,
            relationOfRights: null,
            loan: null,
            loanValue: null,
            cctv: null,
            security: null,
            managementCost: null,
            managementCostValue: null,
            managementCompany: null,
            builtYear: null,
            builtBy: null,
            /*playground: null,
            kidHospital: null,
            hospital: null,
            elementarySchool: null,
            middleSchool: null,
            highSchool: null,
            university: null,*/
            subway: null,
            /*bus: null,
            departmentStore: null,
            mart: null,
            supermarket: null,
            convenienceStore: null,*/

            houseType: 1,

            moreLoadRightRelation: false,
            moreLoadManagement: false,
            moreLoadEnvironment: false,

            btnTextRightRelation: '추가',
            btnTextManagement: '추가',
            btnTextEnvironment: '추가',
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    updateState(house) {
        if (house) {
            this.setState({
                owners: house.owners,
                relationOfRights: house.relationOfRights,
                loan: house.loan,
                loanValue: house.loanValue,
                cctv: house.cctv,
                security: house.security,
                managementCost: house.managementCost,
                managementCostValue: house.managementCostValue,
                managementCompany: house.managementCompany,
                builtYear: house.builtYear,
                builtBy: house.builtBy,
                /*subway: house.subway,*/
            });
        } else {
            this.setState({
                owners: null,
                relationOfRights: null,
                loan: null,
                loanValue: null,
                cctv: null,
                security: null,
                managementCost: null,
                managementCostValue: null,
                managementCompany: null,
                builtYear: null,
                builtBy: null,

                houseType: 1,

                moreLoadRightRelation: false,
                moreLoadManagement: false,
                moreLoadEnvironment: false,

                btnTextRightRelation: '추가',
                btnTextManagement: '추가',
                btnTextEnvironment: '추가',
            })
        }
    }
    initialState(nextType) {
        if (nextType >= 1 && nextType <= 10) {
            this.setState({
                houseType: 1,
            });
        } else if (nextType >= 11 && nextType <= 15) {
            this.setState({
                houseType: 2,
            });
        } else {
            this.setState({
                houseType: 3,
            });
        }
    }
    handleContainer(param) {
        if (param == 1) {
            if (this.state.moreLoadRightRelation == false) {
                this.setState({
                    moreLoadRightRelation: true,
                    btnTextRightRelation: '접기',
                });
            } else if (this.state.moreLoadRightRelation == true) {
                this.setState({
                    moreLoadRightRelation: false,
                    btnTextRightRelation: '추가',
                });
            }
        } else if (param == 2) {
            if (this.state.moreLoadManagement == false) {
                this.setState({
                    moreLoadManagement: true,
                    btnTextManagement: '접기',
                });
            } else if (this.state.moreLoadManagement == true) {
                this.setState({
                    moreLoadManagement: false,
                    btnTextManagement: '추가',
                });
            }
        } else if (param == 3) {
            if (this.state.moreLoadEnvironment == false) {
                this.setState({
                    moreLoadEnvironment: true,
                    btnTextEnvironment: '접기',
                });
            } else if (this.state.moreLoadEnvironment == true) {
                this.setState({
                    moreLoadEnvironment: false,
                    btnTextEnvironment: '추가',
                });
            }
        }
    }
    render() {
        let ownersOptions = ActionHouse.HOUSE_OWNERS_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let relationOfRightsOptions = ActionHouse.HOUSE_RELATION_OF_RIGHTS_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let loanOptions = ActionHouse.HOUSE_LOAN_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let cctvOptions = ActionHouse.HOUSE_CCTV_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let securityOptions = ActionHouse.HOUSE_SECURITY_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let managementCompanyOptions = ActionHouse.HOUSE_MANAGEMENT_COMPANY_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let managementCostOptions = ActionHouse.HOUSE_MANAGEMENT_COST_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        /*let playgroundOptions = ActionHouse.HOUSE_PLAYGROUND_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let kidHospitalOptions = ActionHouse.HOUSE_KID_HOSPITAL_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let hospitalOptions = ActionHouse.HOUSE_HOSPITAL_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let elementarySchoolOptions = ActionHouse.HOUSE_ELEMENTARY_SCHOOL_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let middleSchoolOptions = ActionHouse.HOUSE_MIDDLE_SCHOOL_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let highSchoolOptions = ActionHouse.HOUSE_HIGH_SCHOOL_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let universityOptions = ActionHouse.HOUSE_UNIVERSITY_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });*/
        let subwayOptions = ActionHouse.HOUSE_SUBWAY_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        /*let busOptions = ActionHouse.HOUSE_BUS_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let departmentStoreOptions = ActionHouse.HOUSE_DEPARTMENT_STORE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let martOptions = ActionHouse.HOUSE_MART_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let supermarketOptions = ActionHouse.HOUSE_SUPERMARKET_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        let convenienceStoreOptions = ActionHouse.HOUSE_CONVENIENCE_STORE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });*/
        return (
            <div>
                <div className={(this.state.houseType == 3 ? styles.hide + ' ' : '') + 'rightRelation'}>
                    <div className={stylesForm.moreOption}>
                        <div className={stylesForm.optionTitle}><b>권리관계</b> <span className={stylesForm.optionCaption}>(선택)</span></div>
                        <button className={stylesForm.optionBtn} onClick={this.handleContainer.bind(this, 1)}>{this.state.btnTextRightRelation}</button>
                    </div>
                    <div className={(this.state.moreLoadRightRelation ? '' : styles.hide + ' ') + stylesForm.sellContainer} >
                        <div className={stylesForm.formGroupName}>소유</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.owners || ''} onChange={(e) => this.setState({ owners: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { ownersOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>권리관계</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.relationOfRights || ''} onChange={(e) => this.setState({ relationOfRights: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { relationOfRightsOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>선순위 대출 금액</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.loan || ''} onChange={(e) => this.setState({ loan: e.target.value, loanValue: null })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { loanOptions }
                                </select>
                            </div>
                            { this.state.loan == 2 ?
                                <div className={stylesForm.formRow}>
                                    <input className={stylesForm.formInput} type={'number'} placeholder={'대출 금액을 입력해주세요'} value={this.state.loanValue || ''} onChange={(e) => this.setState({ loanValue: e.target.value })} />
                                    <div className={stylesForm.formInputUnit}>원</div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className={(this.state.houseType == 3 ? styles.hide + ' ' : '') + 'management'}>
                    <div className={stylesForm.moreOption}>
                        <div className={stylesForm.optionTitle}><b>관리</b> <span className={stylesForm.optionCaption}>(선택)</span></div>
                        <button className={stylesForm.optionBtn} onClick={this.handleContainer.bind(this, 2)}>{this.state.btnTextManagement}</button>
                    </div>
                    <div className={(this.state.moreLoadManagement ? '' : styles.hide + ' ') + stylesForm.sellContainer} >
                        <div className={stylesForm.formGroupName}>CCTV</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.cctv || ''} onChange={(e) => this.setState({ cctv: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { cctvOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>경비실</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.security || ''} onChange={(e) => this.setState({ security: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { securityOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>관리비</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.managementCost || ''} onChange={(e) => this.setState({ managementCost: e.target.value, managementCostValue: null })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { managementCostOptions }
                                </select>
                            </div>
                            { this.state.managementCost == 2 ?
                                <div className={stylesForm.formRow}>
                                    <input className={stylesForm.formInput} type={'number'} placeholder={'관리비를 입력해주세요'} value={this.state.managementCostValue || ''} onChange={(e) => this.setState({ managementCostValue: e.target.value })} />
                                    <div className={stylesForm.formInputUnit}>원</div>
                                </div>
                                : null
                            }
                        </div>
                        <div className={stylesForm.formGroupName}>관리 업체</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.managementCompany || ''} onChange={(e) => this.setState({ managementCompany: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { managementCompanyOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>준공년도</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput} type={'number'} placeholder={'준공년도를 입력해주세요'} value={this.state.builtYear || ''} onChange={(e) => this.setState({ builtYear: e.target.value })} />
                                <div className={stylesForm.formInputUnit}>년</div>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>시공사</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput} type={'text'} placeholder={'시공사를 입력해주세요'} value={this.state.builtBy || ''} onChange={(e) => this.setState({ builtBy: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className={'environment'}>
                    <div className={stylesForm.moreOption}>
                        <div className={stylesForm.optionTitle}><b>환경</b> <span className={stylesForm.optionCaption}>(선택)</span></div>
                        <button className={stylesForm.optionBtn} onClick={this.handleContainer.bind(this, 3)}>{this.state.btnTextEnvironment}</button>
                    </div>
                    <div className={(this.state.moreLoadEnvironment ? '' : styles.hide + ' ') + stylesForm.sellContainer} >
                        <div className={(this.state.houseType == 2 ? styles.hide : null)}>
                            <div className={stylesForm.formGroupName}>어린이 놀이터</div>
                            <div className={stylesForm.formGroup}>
                                <div className={stylesForm.formRow}>
                                    <select className={stylesForm.formSelect} value={this.state.playground || ''} onChange={(e) => this.setState({ playground: e.target.value })}>
                                        <option value={''}>항목을 선택해주세요.</option>
                                        { playgroundOptions }
                                    </select>
                                </div>
                            </div>
                            <div className={stylesForm.formGroupName}>소아과 병의원</div>
                            <div className={stylesForm.formGroup}>
                                <div className={stylesForm.formRow}>
                                    <select className={stylesForm.formSelect} value={this.state.kidHospital || ''} onChange={(e) => this.setState({ kidHospital: e.target.value })}>
                                        <option value={''}>항목을 선택해주세요.</option>
                                        { kidHospitalOptions }
                                    </select>
                                </div>
                            </div>
                            <div className={stylesForm.formGroupName}>종합 병원</div>
                            <div className={stylesForm.formGroup}>
                                <div className={stylesForm.formRow}>
                                    <select className={stylesForm.formSelect} value={this.state.hospital || ''} onChange={(e) => this.setState({ hospital: e.target.value })}>
                                        <option value={''}>항목을 선택해주세요.</option>
                                        { hospitalOptions }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>초등학교</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.elementarySchool || ''} onChange={(e) => this.setState({ elementarySchool: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { elementarySchoolOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>중학교</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.middleSchool || ''} onChange={(e) => this.setState({ middleSchool: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { middleSchoolOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>고등학교</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.highSchool || ''} onChange={(e) => this.setState({ highSchool: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { highSchoolOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>대학교</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.university || ''} onChange={(e) => this.setState({ university: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { universityOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>지하철</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.subway || ''} onChange={(e) => this.setState({ subway: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { subwayOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>버스 정류장</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.bus || ''} onChange={(e) => this.setState({ bus: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { busOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>백화점</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.departmentStore || ''} onChange={(e) => this.setState({ departmentStore: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { departmentStoreOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>대형 할인 마트</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.mart || ''} onChange={(e) => this.setState({ mart: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { martOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>슈퍼마켓</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.supermarket || ''} onChange={(e) => this.setState({ supermarket: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { supermarketOptions }
                                </select>
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>편의점</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <select className={stylesForm.formSelect} value={this.state.convenienceStore || ''} onChange={(e) => this.setState({ convenienceStore: e.target.value })}>
                                    <option value={''}>항목을 선택해주세요.</option>
                                    { convenienceStoreOptions }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author
    };
})(withRouter(SellOptionView));
