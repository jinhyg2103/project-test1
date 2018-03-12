import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';

/*
* this.props.type
* this.props.btnText
* this.props.onClick
*/

class AuthButton extends React.Component {
    render() {
        let btnType = () => {
            switch (this.props.type) {
                case 'kakao':
                    return (
                        <div className={stylesAuth.kakaoBtn}>
                            <div className={stylesAuth.kakaoBody}>
                                <div />
                                <span>|</span>
                                <div>카카오 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'naver':
                    return (
                        <div className={stylesAuth.naverBtn}>
                            <div className={stylesAuth.naverBody}>
                                <div />
                                <span>|</span>
                                <div>네이버 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'facebook':
                    return (
                        <div className={stylesAuth.facebookBtn}>
                            <div className={stylesAuth.facebookBody}>
                                <div />
                                <span>|</span>
                                <div>페이스북 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'phone':
                    return (
                        <div className={stylesAuth.sellevBtn}>
                            <div className={stylesAuth.sellevBody}>
                                <div />
                                <span>|</span>
                                <div>핸드폰번호로 가입하기</div>
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className={stylesAuth.submitBtn}>
                            <div className={stylesAuth.submitBody}>{this.props.btnText ? this.props.btnText : ''}</div>
                        </div>
                    );
            }
        };
        return (
            <div className={stylesAuth.loginBtn}>
                {btnType()}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(AuthButton));
