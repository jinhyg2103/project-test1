import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

import { withRouter } from 'react-router';

// Styles
import stylesTable from '../../Styles/TableLayout.css';
import stylesForm from '../../Styles/FormLayout.css';
import stylesModal from '../../Components/Modal/Modal.css';
import stylesUnregisteredAgency from './UnregisteredAgency.css';

// Actions
import * as ActionUser from '../../Data/User/actions';

// Component
import ModalComponent from '../../Components/Modal';

class UnregisteredAgencyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agencyName: '',
            ceoName: '',
            phoneNumber1: '',
            phoneNumber2: '',
            phoneNumber3: '',
            officePhoneNumber1: '',
            officePhoneNumber2: '',
            officePhoneNumber3: '',

            warnAgencyNameNotValid: false, // 회사명은 30자 이하
            warnCeoNameNotValid: false, // CEO이름은 25자 이하
            warnPhoneNumberNotValid: false, // 전화번호 필수
            warnRegistrationNumber: false, // 개설 등록번호(사업자 등록번호)
            warnJusoNotValid: false, //

            juso: {},
        };
        this.handleAgencyRegister = this.handleAgencyRegister.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    handleAgencyRegister() {
        let phoneNumber = Number(this.state.phoneNumber1.replace(/\D/g, '') + this.state.phoneNumber2.replace(/\D/g, '') + this.state.phoneNumber3.replace(/\D/g, ''));
        let officePhoneNumber = this.state.officePhoneNumber1.replace(/\D/g, '') + '-' + this.state.officePhoneNumber2.replace(/\D/g, '') + '-' + this.state.officePhoneNumber3.replace(/\D/g, '');
        this.setState({
            warnAgencyNameNotValid: false,
            warnCeoNameNotValid: false,
            warnPhoneNumberNotValid: false,
            warnJusoNotValid: false,
        });

        if (this.state.agencyName == '' || this.state.agencyName.length == 0 || this.state.agencyName.length > 30) {
            this.setState({ warnAgencyNameNotValid: true });
        }
        if (this.state.ceoName == '' || this.state.ceoName.length == 0 || this.state.ceoName.length > 15) {
            this.setState({ warnCeoNameNotValid: true });
        }
        if (this.state.phoneNumber1 == '' || this.state.phoneNumber2 == '' || this.state.phoneNumber3 == '') {
            this.setState({ warnPhoneNumberNotValid: true });
        }
        if (this.state.juso.inputYn != 'Y') {
            this.setState({ warnJusoNotValid: true });
        }

        setTimeout(() => {
            if (this.state.warnAgencyNameNotValid
                || this.state.warnCeoNameNotValid
                || this.state.warnPhoneNumberNotValid
                || this.state.warnJusoNotValid
            ) {
                return;
            }
            // 가입시작
            this.props.dispatch(ActionUser.createUnregisteredAgency({
                agencyName: this.state.agencyName,
                ceoName: this.state.ceoName,
                countryDialCode: 82,
                phoneNumber: phoneNumber,
                officePhoneNumber: officePhoneNumber,
                state: this.state.juso.siNm,
                city: this.state.juso.sggNm,
                address1: this.state.juso.emdNm,
                address2: this.state.juso.addrDetail,
                addressFull: this.state.juso.roadFullAddr,
                longitude: this.state.juso.entX,
                latitude: this.state.juso.entY,
            })).then(() => {
                alert('등록되었습니다.');
                this.modal.close();
            }).catch( (err) => {
                alert('휴대폰번호가 중복이거나, 등록이 실패하였습니다. 반복적으로 발생할 경우 contact@codecrain.com으로 연락주세요.');
            });
        }, 100);
    }
    openSearchAddressPopup() {
        window.open('/popup/jusoPopup', 'pop', 'width=570,height=420, scrollbars=yes, resizable=yes');
        window.jusoCallBack = (juso) => {
            this.setState({ juso: juso });
        };
    }
    render() {
        return (
            <ModalComponent
                onRef={(ref) => { this.modal = ref; }}
                modalHeader={'비회원중개사 등록하기'}
                modalBody={(
                    <div className={stylesForm.formContainer}>
                        <div className={stylesForm.formGroupName}>중개사무소명</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput} type={'text'} placeholder={'중개사무소명을 입력해주세요'} value={this.state.agencyName} onChange={(e) => this.setState({ agencyName: e.target.value })} />
                                { this.state.warnAgencyNameNotValid ? <div className={stylesForm.formInputWarn}>중개사무소명은 최소 1자에서 최대 30자 입니다.</div> : null }
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>대표자 성명</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput} type={'text'} placeholder={'대표자 성명을 입력해주세요'} value={this.state.ceoName} onChange={(e) => this.setState({ ceoName: e.target.value })} />
                                { this.state.warnCeoNameNotValid ? <div className={stylesForm.formInputWarn}>대표자명은 최소 1자에서 최대 15자 입니다.</div> : null }
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>휴대폰 번호</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'010'} value={this.state.phoneNumber1} onChange={(e) => this.setState({ phoneNumber1: e.target.value })} />
                                <div className={stylesForm.formDividerPhoneNumber}>─</div>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.phoneNumber2} onChange={(e) => this.setState({ phoneNumber2: e.target.value })} />
                                <div className={stylesForm.formDividerPhoneNumber}>─</div>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.phoneNumber3} onChange={(e) => this.setState({ phoneNumber3: e.target.value })} />
                                { this.state.warnPhoneNumberNotValid ? <div className={stylesForm.formInputWarn}>휴대폰번호를 입력해주세요.</div> : null }
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>사무실 전화번호</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'02'} value={this.state.officePhoneNumber1} onChange={(e) => this.setState({ officePhoneNumber1: e.target.value })} />
                                <div className={stylesForm.formDividerPhoneNumber}>─</div>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.officePhoneNumber2} onChange={(e) => this.setState({ officePhoneNumber2: e.target.value })} />
                                <div className={stylesForm.formDividerPhoneNumber}>─</div>
                                <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.officePhoneNumber3} onChange={(e) => this.setState({ officePhoneNumber3: e.target.value })} />
                                { this.state.warnPhoneNumberNotValid ? <div className={stylesForm.formInputWarn}>사무실 유선번호</div> : null }
                            </div>
                        </div>
                        <div className={stylesForm.formGroupName}>사무실 주소</div>
                        <div className={stylesForm.formGroup}>
                            <div className={stylesForm.formRow}>
                                <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} placeholder={'주소를 입력해주세요.'} value={this.state.juso.roadFullAddr} onClick={this.openSearchAddressPopup.bind(this)} />
                                <div className={stylesForm.inputVerifyBox + ' ' + stylesForm.inputBtn} onClick={this.openSearchAddressPopup.bind(this)}>주소검색</div>
                                { this.state.warnJusoNotValid ? <div className={stylesForm.formInputWarn}>주소를 입력해주세요.</div> : null }
                            </div>
                        </div>
                    </div>
                )}
                modalFooter={(
                    <div
                        className={stylesUnregisteredAgency.unregisteredAgencyModalFooter + ' ' + stylesModal.modalActionBtn}
                        onClick={() => this.handleAgencyRegister()}
                    >
                        등록하기
                    </div>
                )}
            />
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(UnregisteredAgencyComponent));
