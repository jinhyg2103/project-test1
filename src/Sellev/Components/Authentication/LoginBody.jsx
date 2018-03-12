import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import AuthBtn from './AuthButton';

// Styles
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
                    <AuthBtn type={'kakao'} />
                    <AuthBtn type={'naver'} />
                    <AuthBtn type={'facebook'} />
                    <div className={stylesAuth.border}><span>&#8211;</span>OR<span>&#8211;</span></div>
{/*
                     ----------이 부분 스타일 수정해주세요 (findpassword.jsx, 지비다 참조)-------------------
*/}
                    <form className={stylesAuth.loginForm}>
                        <label>
                            핸드폰번호
                            <input type="text" placeholder="핸드폰번호를 입력해주세요" />
                        </label>
                        <label>
                            비밀번호
                            <input type="text" placeholder="비밀번호를 입력해주세요" />
                        </label>
                    </form>
{/*
                     -----------------------------------------------------------------------------------------
*/}
                    <AuthBtn btnText={'로그인'} />
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

