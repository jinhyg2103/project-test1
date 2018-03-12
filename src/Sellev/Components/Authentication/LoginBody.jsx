import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginBtn from './LoginBtn';

// Styles
import stylesLogin from '../../Styles/Components/Login.css';

class LoginBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesLogin.loginBody}>
                <div className={stylesLogin.loginLogo}>
                    <img src="/Sellev/assets/img/logo_sellev_black_lg.png" alt="" />
                </div>
                <div className={stylesLogin.loginBox}>
                    <LoginBtn type={'kakao'} />
                    <LoginBtn type={'naver'} />
                    <LoginBtn type={'facebook'} />
                    <div className={stylesLogin.border}><span>&#8211;</span>OR<span>&#8211;</span></div>
                    <form className={stylesLogin.loginForm}>
                        <label>
                            핸드폰번호
                            <input type="text" placeholder="핸드폰번호를 입력해주세요" />
                        </label>
                        <label>
                            비밀번호
                            <input type="text" placeholder="비밀번호를 입력해주세요" />
                        </label>
                    </form>
                    <LoginBtn type={'login'} />
                    <div className={stylesLogin.boxFooter}>
                        <span>아직 회원이 아니신가요?</span>
                        <Link to={'/signup'}> 셀레브 가입하기</Link>
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

