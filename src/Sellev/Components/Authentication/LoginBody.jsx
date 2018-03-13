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

class LoginBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',

            warnPhoneNumberNotValid: false,
            warnPasswordNotValid: false,
        };

        this.login = this.login.bind(this);
    }
    login() {
        this.setState({
            warnPhoneNumberNotValid: false,
            warnPasswordNotValid: false,
        });

        // 핸드폰번호 포맷이 맞는가?
        if (this.state.phoneNumber == null || this.state.phoneNumber.length < 4 || this.state.phoneNumber.length > 30) {
            this.setState({ warnPhoneNumberNotValid: true });
        }
        // 비밀번호 포맷이 맞는가?
        if (this.state.password == null || this.state.password.length < 5 || this.state.password.length > 20) {
            this.setState({ warnPasswordNotValid: true });
        }

        setTimeout(() => {
            if (this.state.warnPhoneNumberNotValid
                || this.state.warnPasswordNotValid
            ) {
                return;
            }

            let params = {
                phoneNumber: this.state.phoneNumber,
                password: this.state.password,
            };

            // 셀레브 로그인 시작
            this.props.dispatch(ActionAuth.login(params))
                .then((data) => {
                    if (data.code == 200) {
                        this.props.history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 100);
    }
    render() {
        return (
            <div className={stylesAuth.authBody}>
                <div className={stylesAuth.authLogo}>
                    <img src="/Sellev/assets/img/logo_sellev_auth.png" alt="" />
                </div>
                <div className={stylesAuth.authBox}>
                    {/*<AuthBtn type={'kakao'} />
                    <AuthBtn type={'naver'} />
                    <AuthBtn type={'facebook'} />*/}
                    <div className={stylesAuth.authBtn + ' ' + stylesAuth.kakao}>| 카카오 계정으로 로그인</div>
                    <div className={stylesAuth.authBtn + ' ' + stylesAuth.naver}>| 네이버 계정으로 로그인</div>
                    <div className={stylesAuth.authBtn + ' ' + stylesAuth.facebook}>| 페이스북 계정으로 로그인</div>
                    <div className={stylesAuth.border}><span>&#8211;</span>OR<span>&#8211;</span></div>
{/*
                     ----------이 부분 스타일 수정해주세요 (findpassword.jsx, 지비다 참조)-------------------
*/}
                    <div className={styles.formGroup}>
                        <div className={styles.formRow}>
                            <div className={styles.formInputName}>핸드폰번호</div>
                            <input className={styles.formInput} type={'text'} value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} autoComplete={'off'} placeholder={'핸드폰번호를 입력해주세요.'} />
                            { this.state.warnPhoneNumberNotValid ? <div className={styles.formInputWarn}>핸드폰번호를 입력하세요.</div> : null }
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formInputName}>비밀번호</div>
                            <input className={styles.formInput} type={'password'} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} autoComplete={'off'} placeholder={'비밀번호를 입력해주세요.'} />
                            { this.state.warnPasswordNotValid ? <div className={styles.formInputWarn}>비밀번호를 입력하세요.</div> : null }
                        </div>
                    </div>
{/*
                     -----------------------------------------------------------------------------------------
*/}
                    <div className={stylesAuth.authBtn} onClick={this.login}>로그인</div>
                    <div className={stylesAuth.boxFooter}>
                        <span>아직 회원이 아니신가요?</span>
                        <Link to={'/auth/signup'}> 셀레브 가입하기</Link>
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
})(withRouter(LoginBody));

