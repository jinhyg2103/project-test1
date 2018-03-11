import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import SocialBtn from '../../Common/SocialButton';

// Styles
import stylesSignup from '../../Styles/Components/Signup.css';

class SignupBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className={stylesSignup.signupBody}>
              <div className={stylesSignup.signupLogo}>
                  <img src="/Sellev/assets/img/logo_sellev_black_lg.png" alt="" />
              </div>
              <div className={stylesSignup.signupBox}>
                  <div className={stylesSignup.title}>
                      회원가입,<br />
                      SNS로 빠른 가입하기
                  </div>
                  <SocialBtn type={'kakao'} />
                  <SocialBtn type={'naver'} />
                  <SocialBtn type={'facebook'} />
                  <div className={stylesSignup.border}><span>&#8211;</span>OR<span>&#8211;</span></div>
                  <SocialBtn />
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
