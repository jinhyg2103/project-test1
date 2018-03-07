import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// Utils
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idText: '',
            password: '',
            passwordRe: '',
            name: '',
            email: '',
            countryDialCode: 82,
            phoneNumber: '',
            phoneNumberCertificateNumber: '',

            isIdDuplicationChecked: false,
            isAgreeTerms: false,

            isSmsSended: false,
            isSmsVerified: false,
            smsVerificationCode: '',
            smsVerificationCodeByUser: '',

            warnCheckIdDuplication: false, // id 중복확인 해라
            warnIdNotValid: false, // id는 4자이상 영문/숫자 조합
            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
            warnPasswordRetype: false, // 비밀번호 재입력 틀림
            warnNameNotValid: false, // 최소 1글자 입력
            warnEmailNotValid: false, // 이메일 필수입력임
            warnPhoneNumberValid: false, // 전화번호 필수입력/인증
            warnPhoneNumberAlreadyExist: false, // 전화번호로 이미 가입함
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
            warnAgreeTerms: false, // 약관 동의해라

            isAgency: false,
        };
    }
    componentWillMount() {
        let params = ParseUrlParameter.parse(this.props.location.search);
        if (params.isAgency) {
            this.setState({ isAgency: true });
        }
    }
    isIdDuplicated() {
        if ( this.state.idText.length > 3) {
            ActionAuth.isIdDuplicated({
                idText: this.state.idText,
            }).then((response) => {
                this.setState({
                    isIdDuplicationChecked: true,
                    warnCheckIdDuplication: false,
                    warnIdNotValid: false,
                });
            }).catch((err) => {
                alert('아이디가 이미 존재합니다.');
                this.setState({
                    isIdDuplicationChecked: false,
                });
            });
        } else {
            this.setState({ warnIdNotValid: true });
        }
    }
    changeIdText(e) {
        this.setState({
            isIdDuplicationChecked: false,
            idText: e.target.value,
        });
    }

    // 인증번호 요청
    sendSmsVerificationCode() {
        if (!this.state.phoneNumber || this.state.phoneNumber.length < 4 ) {
            this.setState({ warnPhoneNumberValid: true });
            return;
        }
        if (this.state.isSmsSended) {
            return; // 이미 SMS 전송 중임
        }
        this.setState({
            isSmsSended: true,
            warnPhoneNumberAlreadyExist: false,
        });
        //////////////
        ActionAuth.getVerificationCode({
            phoneNumber: this.state.phoneNumber,
            countryDialCode: this.state.countryDialCode,
        }).then((data) => {
            this.setState({
                smsVerificationCode: data.verificationCode,
                warnPhoneNumberValid: false,
                isSmsSended: false,
            });
            alert('인증번호가 SMS로 전송되었습니다.');
        }).catch((err) => {
            this.setState({ isSmsSended: false });
            if (err.response.data == 'EmailAlreadyExists') {
                this.setState({ warnPhoneNumberAlreadyExist: true });
            }
        });
    }

    smsVerificationCodeCheck() {
        if ( this.state.smsVerificationCode.toString() != this.state.smsVerificationCodeByUser.toString()) {
            this.setState({ warnPhoneNumber6digitWrong: true });
            return;
        }
        this.setState({
            smsVerificationCode: '',
            isSmsSended: false,
            isSmsVerified: true,
            warnPhoneNumber6digitWrong: false,
        });
    }

    startSignup() {
        this.setState({
            warnCheckIdDuplication: false, // id 중복확인 해라
            warnIdNotValid: false, // id는 4자이상 영문/숫자 조합
            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
            warnPasswordRetype: false, // 비밀번호 재입력 틀림
            warnNameNotValid: false, // 최소 1글자 입력
            warnEmailNotValid: false, // 이메일 필수입력임
            warnPhoneNumberValid: false, // 전화번호 필수입력/인증
            warnPhoneNumberAlreadyExist: false,
            warnPhoneNumber6digitWrong: false,
            warnAgreeTerms: false, // 약관 동의해라
        });
        // ID 중복확인 했는가?
        if (!this.state.isIdDuplicationChecked) {
            this.setState({ warnCheckIdDuplication: true });
        }
        // 아이디 포맷이 맞는가?
        if (this.state.idText == null || this.state.idText.length < 4 || this.state.idText.length > 30) {
            this.setState({ warnIdNotValid: true });
        }
        // 비밀번호 포맷이 맞는가?
        if (this.state.password == null || this.state.password.length < 5 || this.state.password.length > 20) {
            this.setState({ warnPasswordNotValid: true });
        }
        // 비밀번호 재입력했는가?
        if (this.state.passwordRe != this.state.password) {
            this.setState({ warnPasswordRetype: true });
        }
        // 이름 포맷이 맞는가?
        if (this.state.name == null || this.state.name.length < 1 || this.state.name.length > 25) {
            this.setState({ warnNameNotValid: true });
        }
        // 이메일 포맷이 맞는가?
        if (this.state.email == null || this.state.email.length < 5 || this.state.email.length > 100) {
            this.setState({ warnEmailNotValid: true });
        }
        // 휴대폰 인증완료되었는가?
        if (!this.state.isSmsVerified) {
            this.setState({ warnPhoneNumberValid: true });
        }
        // 약관에 동의하였는가?
        if (!this.state.isAgreeTerms) {
            this.setState({ warnAgreeTerms: true });
        }

        setTimeout(() => {
            if (this.state.warnCheckIdDuplication
                || this.state.warnIdNotValid
                || this.state.warnPasswordNotValid
                || this.state.warnPasswordRetype
                || this.state.warnNameNotValid
                || this.state.warnEmailNotValid
                || this.state.warnPhoneNumberValid
                || this.state.warnAgreeTerms
            ) {
                return;
            }
            // 가입시작
            this.props.dispatch(ActionAuth.signup({
                countryDialCode: this.state.countryDialCode,
                idText: this.state.idText,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                type: this.state.type,
            })).then((response) => {
                if (this.state.isAgency) {
                    this.props.history.push('/form/signup/agency');
                } else {
                    this.props.history.push('/search');
                }
            }).catch((err) => {
                alert('회원가입이 실패하였습니다. \n잠시 후, 다시 시도해주세요.');
            });
        }, 100);
    }

    render() {
        return (
            <div className={stylesForm.signupContainer}>
                <Link to="/" className={stylesForm.logoBox}>
                    <img className={stylesForm.logoImg} src="/jivida/assets/img/common/ic_logo_283.png" alt="logo" />
                </Link>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'}autoComplete={'off'} placeholder={'아이디 4자 이상 영문/숫자'} value={this.state.idText} onChange={this.changeIdText.bind(this)} />
                        <div className={stylesForm.inputVerifyBox + ' ' + (this.state.isIdDuplicationChecked ? styles.greenBorderBtn : styles.redBorderBtn)} onClick={this.isIdDuplicated.bind(this)}>{this.state.isIdDuplicationChecked ? '사용가능' : '중복확인'}</div>
                        { this.state.warnIdNotValid ? <div className={stylesForm.formInputWarn}>아이디는 4자 이상, 30자 이하, 영문 및 숫자입니다.</div> : null }
                        { this.state.warnCheckIdDuplication ? <div className={stylesForm.formInputWarn}>아이디 중복확인을 해주세요.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'password'} autoComplete={'off'} placeholder={'비밀번호 6자 이상 영문,숫자 조합'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        { this.state.warnPasswordNotValid ? <div className={stylesForm.formInputWarn}>비밀번호는 6자 이상, 30자 미만, 영문/숫자 조합입니다.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'password'} autoComplete={'off'} placeholder={'비밀번호 재입력'} value={this.state.passwordRe} onChange={(e) => this.setState({ passwordRe: e.target.value })} />
                        { this.state.warnPasswordRetype ? <div className={stylesForm.formInputWarn}>비밀번호 재입력이 틀렸습니다.</div> : null }
                    </div>
                </div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'text'} placeholder={'이름'} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        { this.state.warnNameNotValid ? <div className={stylesForm.formInputWarn}>이름은 최소 1글자 이상 입니다.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'email'} placeholder={'이메일'} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                        { this.state.warnEmailNotValid ? <div className={stylesForm.formInputWarn}>이메일 주소를 제대로 입력해주세요. </div> : null }
                    </div>
                    { this.state.isSmsVerified ? (
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                            <div className={stylesForm.inputVerifyBox + ' ' + styles.greenBorderBtn}>인증완료</div>
                        </div>
                    ) : (
                        <div className={stylesForm.formRow}>
                            { this.state.smsVerificationCode.length > 0
                                ? <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                                : <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} placeholder={'전화번호(-제외)'} value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                            }
                            <div className={stylesForm.inputVerifyBox + ' ' + styles.redBorderBtn} onClick={this.sendSmsVerificationCode.bind(this)}>{ this.state.smsVerificationCode.length > 0 ? '재전송' : '인증번호' }</div>
                            { this.state.warnPhoneNumberValid ? <div className={stylesForm.formInputWarn}>휴대폰 인증을 받으세요.</div> : null }
                            { this.state.warnPhoneNumberAlreadyExist ? <div className={stylesForm.formInputWarn}>이미 가입한 휴대폰입니다. 비밀번호를 찾아보세요.</div> : null }
                        </div>
                    ) }
                    { this.state.smsVerificationCode.length > 0 ? (
                        <div className={stylesForm.formRow}>
                            <input className={stylesForm.formInput + ' ' + stylesForm.inputWithVerify} type={'text'} autoComplete={'off'} placeholder={'인증번호 6자리'} value={this.state.smsVerificationCodeByUser} onChange={(e) => this.setState({ smsVerificationCodeByUser: e.target.value })} />
                            <div className={stylesForm.inputVerifyBox} onClick={this.smsVerificationCodeCheck.bind(this)}>확인</div>
                            { this.state.warnPhoneNumber6digitWrong ? <div className={stylesForm.formInputWarn}>인증번호가 틀립니다.</div> : null }
                        </div>
                    ) : null }
                </div>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input id={'terms'} className={stylesForm.formCheckbox} type={'checkbox'} value={this.state.isAgreeTerms} onChange={(e) => this.setState({ isAgreeTerms: e.target.checked })} />
                        <label className={stylesForm.agreeLabel} htmlFor={'terms'}>JIVIDA <Link to={'/policies/terms'}>약관 모두동의</Link><span className={stylesForm.needed}>(필수)</span></label>
                        { this.state.warnAgreeTerms ? <div className={stylesForm.formInputWarn}>약관에 동의하세요.</div> : null }
                    </div>
                </div>
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startSignup.bind(this)}>회원가입</div>
                <div className={stylesForm.findBox}>
                    <Link to="/form/findIdText" className={stylesForm.findIdBtn}>아이디 찾기</Link>
                    <div className={stylesForm.findDivider}></div>
                    <Link to="/form/findPassword" className={stylesForm.findPasswordBtn}>비밀번호 찾기</Link>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(SignupView));
