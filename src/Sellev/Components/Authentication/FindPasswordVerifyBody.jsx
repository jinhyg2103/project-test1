import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import styles from '../../Styles/App.css';
import stylesAuth from '../../Styles/Components/Authentication.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authTest: true, /*인증 버튼 테스트용 임의로 넣어둠 */
            phoneNumber: '',

            isSmsSended: false,
            isSmsVerified: false,
            smsVerificationCode: '',
            smsVerificationCodeByUser: '',

            warnPhoneNumberNotValid: false,
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
        }

        this.sendSmsVerificationCode = this.sendSmsVerificationCode.bind(this);
        this.smsVerificationCodeCheck = this.smsVerificationCodeCheck.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }
    // 인증번호 요청
    sendSmsVerificationCode() {
        if (!this.state.phoneNumber || this.state.phoneNumber.length < 6 ) {
            this.setState({ warnPhoneNumberNotValid: true });
            return;
        }

        if (this.state.isSmsSended) {
            return; // 이미 SMS 전송 중임
        }

        this.setState({
            isSmsSended: true,
        });

        //----------test------------------
        this.setState({
            smsVerificationCode: '123123',
            warnPhoneNumberNotValid: false,
            isSmsSended: false,
        });
        alert('인증번호가 SMS로 전송되었습니다.');
        /* ActionAuth.isIdDuplicated({
             phoneNumber: this.state.phoneNumber,
         }).then((response) => {
             if (response.code == 200) {
                 ActionAuth.getVerificationCode({
                     phoneNumber: this.state.phoneNumber,
                 }).then((response) => {
                     this.setState({
                         smsVerificationCode: data.verificationCode,
                         warnPhoneNumberNotValid: false,
                         isSmsSended: false,
                     });
                     alert('인증번호가 SMS로 전송되었습니다.');
                 }).catch((err) => {
                     this.setState({ isSmsSended: false });
                     if (err) {
                         console.log(err);
                     }
                 });
             } else {
                 this.setState({ isSmsSended: false });
                 alert('이미 가입한 핸드폰번호입니다.');
             }
         });*/
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

        if (!this.state.isSmsVerified) {
            this.setState({ warnPhoneNumberNotValid: true });
        }
    }
    verifyUser() {
        this.setState({
            warnPhoneNumberNotValid: false,
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
        });
        // 휴대폰 인증완료되었는가?
        if (!this.state.isSmsVerified) {
            this.setState({ warnPhoneNumberNotValid: true });
        }
        setTimeout(() => {
            if (this.state.warnPhoneNumberNotValid
                || this.state.warnPhoneNumber6digitWrong
            ) {
                return;
            }

            this.props.onVerified(true);
            /*// 가입시작
            this.props.dispatch(ActionAuth.signup({
                phoneNumber: this.state.phoneNumber,
                password: this.state.password,
            })).then((response) => {
                console.log(response);
            }).catch((err) => {
                alert('회원가입이 실패하였습니다. \n잠시 후, 다시 시도해주세요.');
            });*/
        }, 100);
    }
    render() {
        return (
            <div className={stylesAuth.authBody}>
                <div className={stylesAuth.authLogo}>
                    <img src="/Sellev/assets/img/logo_sellev_auth.png" alt="" />
                </div>
                <div className={stylesAuth.authBox}>
                    <div className={stylesAuth.authTitle}>비밀번호를 잊으셨나요?</div>
                    <div className={styles.formGroup}>
                        { this.state.isSmsVerified ? (
                            <div className={styles.formRow}>
                                <div className={styles.formInputName}>핸드폰번호</div>
                                <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                                <div className={styles.inputVerifyBox}>인증완료</div>
                            </div>
                        ) : (
                            <div>
                            <div className={styles.formRow}>
                                <div className={styles.formInputName}>핸드폰번호</div>
                                { this.state.smsVerificationCode.length > 0
                                    ? <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                                    : <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} placeholder={'핸드폰번호를 입력해주세요.'} value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                                }
                                {/*인증버튼 활성화 .formRow .inputVerifyBox.black */}
                                <div className={styles.inputVerifyBox + ' ' + (this.state.authTest ? styles.activeBlack : styles.disabled)} onClick={this.sendSmsVerificationCode}>인증</div>
                            </div>
                                { this.state.warnPhoneNumberNotValid ? <div className={styles.formInputWarn}>핸드폰 인증을 받으세요.</div> : null }
                                { this.state.warnPhoneNumberNotExist ? <div className={styles.formInputWarn}>가입 안된 핸드폰번호입니다.</div> : null }
                            </div>
                        ) }
                        <div className={styles.formRow + ( this.state.smsVerificationCode.length > 0 ? '' : ' ' + styles.disabled )}>
                            <div className={styles.formInputName}>인증번호</div>
                            <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} autoComplete={'off'} placeholder={this.state.smsVerificationCode.length > 0 ? '' : '위의 인증버튼 선택 후 인증번호를 입력해주세요.' } value={this.state.smsVerificationCodeByUser} onChange={(e) => this.setState({ smsVerificationCodeByUser: e.target.value })} disabled={ this.state.smsVerificationCode.length <= 0 }/>
                            { this.state.smsVerificationCode.length > 0 ? <div className={styles.inputVerifyBox + ' ' + styles.activeWhite} onClick={this.smsVerificationCodeCheck}>인증하기</div> : null }
                        </div>
                        { this.state.warnPhoneNumber6digitWrong ? <div className={styles.formInputWarn}>인증번호가 틀립니다.</div> : null }
                    </div>
                    <div>
                        <div className={stylesAuth.authBtn + ' ' + stylesAuth.loginBtn} onClick={this.verifyUser}>다음</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));