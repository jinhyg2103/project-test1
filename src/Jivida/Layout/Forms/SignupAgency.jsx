import React from 'react';
import {
    Link, withRouter,
} from 'react-router-dom';

// Actions
import * as ActionUser from '../../Data/User/actions';
import * as ActionAuth from '../../Data/Authentification/actions';

// Utils
import * as UploadImageUtil from '../../Lib/UploadManager/UploadImage';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';
import {connect} from "react-redux";

class SignupAgencyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agencyName: '',
            ceoName: '',
            registrationNumber: '',
            phoneNumber1: '',
            phoneNumber2: '',
            phoneNumber3: '',
            type: 1, // 1: 개설 공인중개사, 2: 소속 공인중개사, 3: 중개 보조원
            isAgreeTerms: false,

            imageUrls: [null, null], // 0은 자격증, 1은 등록증
            imageFiles: [null, null], // 0은 자격증, 1은 등록증

            warnAgencyNameNotValid: false, // 회사명은 30자 이하
            warnCeoNameNotValid: false, // CEO이름은 25자 이하
            warnPhoneNumberNotValid: false, // 전화번호 필수
            warnRegistrationNumber: false, // 개설 등록번호(사업자 등록번호)
            warnJusoNotValid: false, //
            warnCertificateNotExist: false,
            warnRegistrationNotExist: false,
            warnAgreeTerms: false,

            juso: {},
        };
    }
    componentWillMount() {
        if (!this.props.author.id) {
            this.props.history.push('/form/login');
        }
    }
    addCertificateImage(e) { // 자격증
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageFiles: [file, this.state.imageFiles[1]],
                imageUrls: [reader.result, this.state.imageUrls[1]],
            });
        };
        reader.readAsDataURL(file);
    }
    addRegistrationImage(e) { // 등록증
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageFiles: [this.state.imageFiles[0], file],
                imageUrls: [this.state.imageUrls[0], reader.result],
            });
        };
        reader.readAsDataURL(file);
    }
    deleteCertificateImage() {
        this.setState({
            imageFiles: [null, this.state.imageFiles[1]],
            imageUrls: [null, this.state.imageUrls[1]],
        });
    }
    deleteRegistrationImage() {
        this.setState({
            imageFiles: [this.state.imageFiles[0], null],
            imageUrls: [this.state.imageUrls[0], null],
        });
    }
    openSearchAddressPopup() {
        window.open('/popup/jusoPopup', 'pop', 'width=570,height=420, scrollbars=yes, resizable=yes');
        window.jusoCallBack = (juso) => {
            console.log(juso);
            this.setState({ juso: juso });
        };
    }
    startCreateAgency() {
        let phoneNumber = this.state.phoneNumber1.replace(/\D/g, '') + '-' + this.state.phoneNumber2.replace(/\D/g, '') + '-' + this.state.phoneNumber3.replace(/\D/g, '');
        let registrationNumber = this.state.registrationNumber.replace(/\D/g, '');
        this.setState({
            warnAgencyNameNotValid: false,
            warnCeoNameNotValid: false,
            warnPhoneNumberNotValid: false,
            warnRegistrationNumber: false,
            warnJusoNotValid: false,
            warnCertificateNotExist: false,
            warnRegistrationNotExist: false,
            warnAgreeTerms: false,
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
        if (registrationNumber == '' || registrationNumber.toString().length < 4 || registrationNumber.toString().length > 30) {
            this.setState({ warnRegistrationNumber: true });
        }
        if (this.state.juso.inputYn != 'Y') {
            this.setState({ warnJusoNotValid: true });
        }
        if (!this.state.imageFiles[0]) {
            this.setState({ warnCertificateNotExist: true });
        }
        if (!this.state.imageFiles[1]) {
            this.setState({ warnRegistrationNotExist: true });
        }
        if (!this.state.isAgreeTerms) {
            this.setState({ warnAgreeTerms: true });
        }

        setTimeout(() => {
            if (this.state.warnAgencyNameNotValid
                || this.state.warnCeoNameNotValid
                || this.state.warnPhoneNumberNotValid
                || this.state.warnRegistrationNumber
                || this.state.warnJusoNotValid
                || this.state.warnCertificateNotExist
                || this.state.warnRegistrationNotExist
                || this.state.warnAgreeTerms
            ) {
                return;
            }
            // 가입시작
            ActionAuth.createAgency({
                agencyName: this.state.agencyName,
                ceoName: this.state.ceoName,
                registrationNumber: registrationNumber,
                phoneNumber: phoneNumber,
                state: this.state.juso.siNm,
                city: this.state.juso.sggNm,
                address1: this.state.juso.emdNm,
                address2: this.state.juso.addrDetail,
                addressFull: this.state.juso.roadFullAddr,
                longitude: this.state.juso.entX,
                latitude: this.state.juso.entY,
                type: this.state.type,
            }).then((aId) => {
                let promises = [];
                promises.push(UploadImageUtil.uploadByFile(this.state.imageFiles[0])
                    .then((url) => {
                        ActionAuth.createAgencyLicense({
                            aId: aId,
                            url: url,
                        }).then((response) => {
                            return Promise.resolve(null);
                        }).catch((err) => {
                            return Promise.resolve(null);
                        });
                    }));
                promises.push(UploadImageUtil.uploadByFile(this.state.imageFiles[1])
                    .then((url) => {
                        ActionAuth.createAgencyRegistrationCertificate({
                            aId: aId,
                            url: url,
                        }).then((response) => {
                            return Promise.resolve(null);
                        }).catch((err) => {
                            return Promise.resolve(null);
                        });
                    }));
                setTimeout(() => {
                    Promise.all(promises).then(() => {
                        this.props.history.push('/search');
                    }).catch( (err) => {
                        console.log('Err :: /Forms/SignupAgency.jsx :: Upload Images Failed');
                    });
                }, 100);
            }).catch((err) => {
                alert('업로드 실패');
            });
        }, 100);
    }
    render() {
        let agencyTypeOptions = ActionUser.AGENCY_TYPE_ARRAY.map((type, index) => {
            return <option key={index} value={type.value}>{type.label}</option>;
        });
        return (
            <div className={stylesForm.signupAgencyContainer}>
                <div className={stylesForm.formTitle}>
                    중개 회원 <span className={stylesForm.bold}>등록</span>
                </div>
                <div className={stylesForm.formGroupName}>구분</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <select className={stylesForm.formSelect} value={this.state.type} onChange={(e) => this.setState({ type: e.target.value })}>
                            { agencyTypeOptions }
                        </select>
                    </div>
                </div>
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
                <div className={stylesForm.formGroupName}>사무실 전화번호</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'02'} value={this.state.phoneNumber1} onChange={(e) => this.setState({ phoneNumber1: e.target.value })} />
                        <div className={stylesForm.formDividerPhoneNumber}>─</div>
                        <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.phoneNumber2} onChange={(e) => this.setState({ phoneNumber2: e.target.value })} />
                        <div className={stylesForm.formDividerPhoneNumber}>─</div>
                        <input className={stylesForm.formInputPhoneNumber} type={'text'} placeholder={'1111'} value={this.state.phoneNumber3} onChange={(e) => this.setState({ phoneNumber3: e.target.value })} />
                        { this.state.warnPhoneNumberNotValid ? <div className={stylesForm.formInputWarn}>사무실 유선번호 혹은 휴대폰번호를 입력해주세요.</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>개설 등록번호 (사업자 등록번호)</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'text'} placeholder={'개설 등록번호를 입력해주세요( - 제외)'} value={this.state.registrationNumber} onChange={(e) => this.setState({ registrationNumber: e.target.value })} />
                        { this.state.warnRegistrationNumber ? <div className={stylesForm.formInputWarn}>개설 등록번호(사업자 등록번호)를 입력해주세요.</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroupName}>사무실 주소</div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} placeholder={'주소를 입력해주세요.'} value={this.state.juso.roadFullAddr} onClick={this.openSearchAddressPopup.bind(this)} />
                        <div className={stylesForm.inputVerifyBox + ' ' + styles.inputBtn} onClick={this.openSearchAddressPopup.bind(this)}>주소검색</div>
                        { this.state.warnJusoNotValid ? <div className={stylesForm.formInputWarn}>주소를 입력해주세요.</div> : null }
                    </div>
                </div>
                <div className={'row ' + stylesForm.row}>
                    <div className={'col-6 ' + stylesForm.col6}>
                        <div className={stylesForm.formGroupName}>공인중개사 자격증</div>
                        <div className={stylesForm.formUploadImageBox} style={{ backgroundImage: 'url(' + this.state.imageUrls[0] + ')' }}>
                            { this.state.imageUrls[0] ? (
                                <div className={stylesForm.formUploadCancelBtn + ' ' + styles.inputBtn} onClick={this.deleteCertificateImage.bind(this)}>
                                    <i className={'icon icon-ic_delete'}></i>
                                </div>
                            ) : (
                                <div className={stylesForm.formUploadBtn + ' ' + styles.inputBtn}>
                                    <label htmlFor={'upoadCertificate'}>사진 업로드</label>
                                    <input id={'upoadCertificate'} type={'file'} className={stylesForm.formUploadHiddenInput} accept={'image/*'} onChange={this.addCertificateImage.bind(this)} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'col-6 ' + stylesForm.col6}>
                        <div className={stylesForm.formGroupName}>개설등록증(사업자등록증)</div>
                        <div className={stylesForm.formUploadImageBox} style={{ backgroundImage: 'url(' + this.state.imageUrls[1] + ')' }}>
                            { this.state.imageUrls[1] ? (
                                <div className={stylesForm.formUploadCancelBtn + ' ' + styles.inputBtn} onClick={this.deleteRegistrationImage.bind(this)}>
                                    <i className={'icon icon-ic_delete'}></i>
                                </div>
                            ) : (
                                <div className={stylesForm.formUploadBtn + ' ' + styles.inputBtn}>
                                <label htmlFor={'upoadRegistration'}>사진 업로드</label>
                                <input id={'upoadRegistration'} type={'file'} className={stylesForm.formUploadHiddenInput} accept={'image/*'} onChange={this.addRegistrationImage.bind(this)} />
                                </div>
                            )}
                        </div>
                    </div>
                    { this.state.warnCertificateNotExist ? <div className={stylesForm.formInputWarn}>공인중개사 자격증을 찍어서 올려주세요.</div> : null }
                    { this.state.warnRegistrationNotExist ? <div className={stylesForm.formInputWarn}>개설 등록증(사업자등록증)을 찍어서 올려주세요.</div> : null }
                </div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input id={'terms'} className={stylesForm.formCheckbox} type={'checkbox'} value={this.state.isAgreeTerms} onChange={(e) => this.setState({ isAgreeTerms: e.target.checked })} />
                        <label htmlFor={'terms'}>중개회원 <Link to={'/policies/agency'}>약관 모두동의</Link><span className={stylesForm.required}>(필수)</span></label>
                        { this.state.warnAgreeTerms ? <div className={stylesForm.formInputWarn}>약관에 동의하세요.</div> : null }
                    </div>
                </div>
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startCreateAgency.bind(this)}>중개사 회원가입</div>
            </div>
        );
    }
}
export default  connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SignupAgencyView));
