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

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

class SignupBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            password: '',
            passwordRe: '',

            isSmsSended: false,
            isSmsVerified: false,
            smsVerificationCode: '',
            smsVerificationCodeByUser: '',

            isAgreeTerms: false,

            warnPhoneNumberNotValid: false,
            warnPhoneNumberAlreadyExist: false,
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
            warnPasswordNotValid: false,
            warnPasswordRetype: false,
            warnAgreeTerms: false, // 약관 동의해라
        }

        this.sendSmsVerificationCode = this.sendSmsVerificationCode.bind(this);
        this.smsVerificationCodeCheck = this.smsVerificationCodeCheck.bind(this);
        this.signup = this.signup.bind(this);
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
            warnPhoneNumberAlreadyExist: false,
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
    }
    signup() {
        this.setState({
            warnPhoneNumberNotValid: false,
            warnPhoneNumberAlreadyExist: false,
            warnPhoneNumber6digitWrong: false, // 6자리 인증번호가 틀립니다
            warnPasswordNotValid: false,
            warnPasswordRetype: false,
            warnAgreeTerms: false, // 약관 동의해라
        });


        // 휴대폰 인증완료되었는가?
        if (!this.state.isSmsVerified) {
            this.setState({ warnPhoneNumberNotValid: true });
        }
        // 비밀번호 포맷이 맞는가?
        if (this.state.password == null || this.state.password.length < 5 || this.state.password.length > 20) {
            this.setState({ warnPasswordNotValid: true });
        }
        // 비밀번호 재입력했는가?
        if (this.state.passwordRe != this.state.password) {
            this.setState({ warnPasswordRetype: true });
        }
        // 약관에 동의하였는가?
        if (!this.state.isAgreeTerms) {
            this.setState({ warnAgreeTerms: true });
        }
        setTimeout(() => {
            if (this.state.warnPhoneNumberNotValid
                || this.state.warnPhoneNumberAlreadyExist
                || this.state.warnPasswordNotValid
                || this.state.warnPasswordRetype
                || this.state.warnPhoneNumber6digitWrong
                || this.state.warnAgreeTerms
            ) {
                return;
            }
            alert('회원가입 성공');
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
          <div className={stylesAuth.signupBody}>
              <div className={stylesAuth.signupLogo}>
                  <img src="/Sellev/assets/img/logo_sellev_black_lg.png" alt="" />
              </div>
              <div className={stylesAuth.signupBox}>
                  <div>핸드폰번호로 셀레브 회원가입</div>
                  <div className={styles.formGroup}>
                      {/*<div className={styles.formRow}>
                          <div className={styles.formInputName}>핸드폰번호</div>
                          <input className={styles.formInputWithVerify} type={'text'} value={this.state.phoneNumber} autoComplete={'off'} onChange={(e) => this.setState({ phoneNumber: e.target.value })} placeholder={'핸드폰번호를 입력해주세요.'} />
                          <div className={styles.formInputVerifyBtn + (this.state.phoneNumber.length < 6 ? ' ' + styles.disabled : '')} onClick={this.sendSmsVerificationCode}>인증</div>
                      </div>*/}
                      { this.state.isSmsVerified ? (
                          <div className={styles.formRow}>
                              <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                              <div className={styles.inputVerifyBox}>인증완료</div>
                          </div>
                      ) : (
                          <div className={styles.formRow}>
                              <div className={styles.formInputName}>핸드폰번호</div>
                              { this.state.smsVerificationCode.length > 0
                                  ? <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} value={this.state.phoneNumber} disabled />
                                  : <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} placeholder={'핸드폰번호를 입력해주세요.'} value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                              }
                              <div className={styles.inputVerifyBox} onClick={this.sendSmsVerificationCode.bind(this)}>인증</div>
                              { this.state.warnPhoneNumberNotValid ? <div className={styles.formInputWarn}>핸드폰 인증을 받으세요.</div> : null }
                              { this.state.warnPhoneNumberAlreadyExist ? <div className={styles.formInputWarn}>이미 가입한 휴대폰입니다. 비밀번호를 찾아보세요.</div> : null }
                          </div>
                      ) }
                      <div className={styles.formRow + ( this.state.smsVerificationCode.length > 0 ? '' : ' ' + styles.disabled )}>
                          <div className={styles.formInputName}>인증번호</div>
                          <input className={styles.formInput + ' ' + styles.inputWithVerify} type={'text'} autoComplete={'off'} placeholder={ this.state.smsVerificationCode.length > 0 ? '' : '위의 인증버튼 선택 후 인증번호를 입력해주세요.' } value={this.state.smsVerificationCodeByUser} onChange={(e) => this.setState({ smsVerificationCodeByUser: e.target.value })} disabled={ this.state.smsVerificationCode.length <= 0 }/>
                          { this.state.smsVerificationCode.length > 0 ? <div className={styles.inputVerifyBox} onClick={this.smsVerificationCodeCheck.bind(this)}>인증하기</div> : null }
                          { this.state.warnPhoneNumber6digitWrong ? <div className={styles.formInputWarn}>인증번호가 틀립니다.</div> : null }
                      </div>
                      { this.state.smsVerificationCode.length > 0 ? (
                          <div>인증시간이 <span>2:58</span> 남았습니다</div>
                      ) : null }
                      <div className={styles.formRow}>
                          <div className={styles.formInputName}>비밀번호</div>
                          <input className={styles.formInputWithVerify} type={'password'} autoComplete={'off'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder={'비밀번호 확인'} />
                          { this.state.warnPasswordNotValid ? <div className={styles.formInputWarn}>비밀번호는 6자 이상, 30자 미만, 영문/숫자 조합입니다.</div> : null }
                      </div>
                      <div className={styles.formRow}>
                          <div className={styles.formInputName}>비밀번호확인</div>
                          <input className={styles.formInputWithVerify} type={'password'} autoComplete={'off'} value={this.state.passwordRe} onChange={(e) => this.setState({ passwordRe: e.target.value })} placeholder={'비밀번호 확인'} />
                          { this.state.warnPasswordRetype ? <div className={styles.formInputWarn}>비밀번호 재입력이 틀렸습니다.</div> : null }
                      </div>
                      <div className={styles.formRow}>
                          <div className={styles.agreeLabel}> {/* 체크박스 부분은 formGroup 안에 넣으셔도 되고 밖으로 빼셔도 됩니다. */}
                              <input type={'checkbox'} value={this.state.isAgreeTerms} onChange={(e) => this.setState({ isAgreeTerms: e.target.checked })} />
                              <label>이용약관과 개인정보취급방침에 동의합니다.</label>
                          </div>
                      </div>
                  </div>
                  <div>
                      <div className={stylesAuth.authBtn} onClick={this.signup}>가입하기</div>
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
})(withRouter(SignupBody));
