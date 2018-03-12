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

class LoginBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesAuth.loginBody}>
                <div className={stylesAuth.loginLogo}>
                    <img src="/Sellev/assets/img/logo_sellev_black_lg.png" alt="" />
                </div>
                <div className={stylesAuth.loginBox}>
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
                            <input className={styles.formInput} type={'text'} placeholder={'핸드폰번호를 입력해주세요.'} />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formInputName}>비밀번호</div>
                            <input className={styles.formInput} type={'password'} placeholder={'비밀번호를 입력해주세요.'} />
                        </div>
                    </div>
{/*
                     -----------------------------------------------------------------------------------------
*/}
                    <div className={stylesAuth.authBtn}>로그인</div>
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

