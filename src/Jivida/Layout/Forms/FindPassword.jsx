import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// Component
import PhoneNumberVerify from '../../Common/PhoneNumberVerify';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class FindPasswordView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordRe: '',
            idText: '',

            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
            warnPasswordRetype: false, // 비밀번호 재입력 틀림
            warnIdNotValid: false,
        };
    }

    onChange() {
        this.setState({
            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
            warnPasswordRetype: false, // 비밀번호 재입력 틀림
            warnIdNotValid: false,
        });
        this.phoneNumberVerify.setState({
            warnPhoneNumberValid: false, // 전화번호 필수입력/인증
            warnPhoneNumberAlreadyExist: false,
            warnPhoneNumber6digitWrong: false,
        });
        // 비밀번호 재입력했는가?
        if (this.state.passwordRe != this.state.password) {
            this.setState({ warnPasswordRetype: true });
        }
        // 휴대폰 인증완료되었는가?
        if (!this.phoneNumberVerify.state.isSmsVerified) {
            this.phoneNumberVerify.setState({ warnPhoneNumberValid: true });
        }
        setTimeout(() => {
            if (this.state.warnPasswordNotValid
                || this.state.warnPasswordRetype
                || this.state.warnIdNotValid
                || this.phoneNumberVerify.state.warnPhoneNumberValid
            ) {
                return;
            }
            ActionAuth.changePassword({
                countryDialCode: this.phoneNumberVerify.state.countryDialCode,
                phoneNumber: this.phoneNumberVerify.state.phoneNumber,
                idText: this.state.idText,
                password: this.state.password,
            }).then((idText) => {
                alert('비밀번호가 변경되었습니다.');
                this.props.history.push('/form/login');
            }).catch((err) => {
                alert('존재하지 않는 아이디입니다.');
            });
        }, 100);
    }
    render() {
        return (
            <div className={stylesForm.findIdContainer}>
                <Link to="/" className={stylesForm.logoBox}>
                    <img className={stylesForm.logoImg} src="/jivida/assets/img/common/ic_logo_283.png" alt="logo" />
                </Link>
                <PhoneNumberVerify onRef={(ref) => { this.phoneNumberVerify = ref; }} force={true} />
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'text'} autoComplete={'off'} placeholder={'아이디를 입력해주세요'} value={this.state.idText} onChange={(e) => this.setState({ idText: e.target.value })} />
                        { this.state.warnIdNotValid ? <div className={stylesForm.formInputWarn}>아이디는 4자 이상, 30자 이하, 영문 및 숫자입니다.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'password'} autoComplete={'off'} placeholder={'변경할 비밀번호 6자 이상 영문,숫자 조합'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        { this.state.warnPasswordNotValid ? <div className={stylesForm.formInputWarn}>비밀번호는 6자 이상, 30자 미만, 영문/숫자 조합입니다.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'password'} autoComplete={'off'} placeholder={'비밀번호 재입력'} value={this.state.passwordRe} onChange={(e) => this.setState({ passwordRe: e.target.value })} />
                        { this.state.warnPasswordRetype ? <div className={stylesForm.formInputWarn}>비밀번호 재입력이 틀렸습니다.</div> : null }
                    </div>
                </div>
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.onChange.bind(this)}>비밀번호 변경</div>
            </div>
        );
    }
}
export default connect()(withRouter(FindPasswordView));
