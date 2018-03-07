import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idText: '',
            password: '',

            isRemember: false,

            warnIdNotValid: false, // id는 4자이상 영문/숫자 조합
            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
        };
    }
    startLogin() {
        this.setState({
            warnIdNotValid: false, // id는 4자이상 영문/숫자 조합
            warnPasswordNotValid: false, // 비밀번호는 6자 이상 영문/숫자 조합
        });
        // 아이디 포맷이 맞는가?
        if (this.state.idText == null || this.state.idText.length < 4 || this.state.idText.length > 30) {
            this.setState({ warnIdNotValid: true });
        }
        // 비밀번호 포맷이 맞는가?
        if (this.state.password == null || this.state.password.length < 5 || this.state.password.length > 20) {
            this.setState({ warnPasswordNotValid: true });
        }

        setTimeout(() => {
            if (this.state.warnIdNotValid
                || this.state.warnPasswordNotValid
            ) {
                return;
            }
            // 가입시작
            this.props.dispatch(ActionAuth.login({
                idText: this.state.idText,
                password: this.state.password,
            })).then((response) => {
                this.props.history.push('/');
            }).catch((err) => {
                if (err.response.data == 'InvalidAuthenticationEmail') {
                    alert('아이디가 존재하지 않습니다.');
                } else if (err.response.data == 'InvalidAuthenticationPassword') {
                    alert('비밀번호가 틀립니다.');
                } else {
                    alert('로그인이 실패하였습니다. \n잠시 후, 다시 시도해주세요.');
                }
            });
        }, 100);
    }
    render() {
        return (
            <div className={stylesForm.loginContainer}>
                <Link to="/" className={stylesForm.logoBox}>
                    <img className={stylesForm.logoImg} src="/jivida/assets/img/common/ic_logo_283.png" alt="logo" />
                </Link>
                <div className={stylesForm.formGroup}>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'text'} autoComplete={'off'} placeholder={'아이디를 입력해주세요'} value={this.state.idText} onChange={(e) => this.setState({ idText: e.target.value })} />
                        { this.state.warnIdNotValid ? <div className={stylesForm.formInputWarn}>아이디는 4자 이상, 30자 이하, 영문 및 숫자입니다.</div> : null }
                    </div>
                    <div className={stylesForm.formRow}>
                        <input className={stylesForm.formInput} type={'password'} autoComplete={'off'} placeholder={'비밀번호를 입력해주세요'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        { this.state.warnPasswordNotValid ? <div className={stylesForm.formInputWarn}>비밀번호는 6자 이상, 30자 미만, 영문/숫자 조합입니다.</div> : null }
                    </div>
                </div>
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.startLogin.bind(this)}>로그인</div>
                <div className={stylesForm.findBox}>
                    <Link to="/form/findIdText" className={stylesForm.findIdBtn}>아이디 찾기</Link>
                    <div className={stylesForm.findDivider}></div>
                    <Link to="/form/findPassword" className={stylesForm.findPasswordBtn}>비밀번호 찾기</Link>
                </div>
                <div className={stylesForm.signupBox}>
                    <Link to="/form/signup" className={styles.redBorderBtn + ' ' + stylesForm.mediumBtn + ' ' + stylesForm.leftBtn}>일반회원 가입</Link>
                    <Link to="/form/signup?isAgency=1" className={styles.redBorderBtn + ' ' + stylesForm.mediumBtn + ' ' + stylesForm.rightBtn}>중개사 가입</Link>
                </div>
                <div className={stylesForm.copyrightBox}>JIVIDA, Inc. All rights reserved.</div>
            </div>
        );
    }
}

export default connect()(withRouter(LoginView));
