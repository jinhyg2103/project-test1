import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// CSS
import styles from '../Layout/JividaLayout.css';
import stylesForm from '../Layout/Forms/Form.css';

/*
* this.props.force
*/
class PhoneNumberCertificateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryDialCode: 82,
            phoneNumber: '',
            phoneNumberCertificateNumber: '',

            isSmsSended: false,
            isSmsVerified: false,
            smsVerificationCode: '',
            smsVerificationCodeByUser: '',

            warnPhoneNumberValid: false, // 전화번호 필수입력/인증
            warnPhoneNumberAlreadyExist: false, // 전화번호로 이미 가입함
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
        };
    }

    componentDidMount() {
        this.props.onRef(this);
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
            force: this.props.force,
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

    render() {
        return (
            <div className={stylesForm.formGroup}>
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
        );
    }
}
export default connect()(withRouter(PhoneNumberCertificateView));
