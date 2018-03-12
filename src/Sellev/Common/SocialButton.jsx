import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesSocial from '../Styles/Common/SocialButton.css';

class SocialBtn extends React.Component {
    render() {
        let btnType = () => {
            switch (this.props.type) {
                case 'kakao':
                    return (
                        <div className={stylesSocial.kakaoBtn}>
                            <div className={stylesSocial.kakaoBody}>
                                <div />
                                <span>|</span>
                                <div>카카오 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'naver':
                    return (
                        <div className={stylesSocial.naverBtn}>
                            <div className={stylesSocial.naverBody}>
                                <div />
                                <span>|</span>
                                <div>네이버 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'facebook':
                    return (
                        <div className={stylesSocial.facebookBtn}>
                            <div className={stylesSocial.facebookBody}>
                                <div />
                                <span>|</span>
                                <div>페이스북 계정으로 로그인</div>
                            </div>
                        </div>
                    );
                case 'login':
                    return (
                        <div className={stylesSocial.submitBtn}>
                            <div className={stylesSocial.submitBody}>로그인</div>
                        </div>
                    );
                default:
                    return (
                        <div className={stylesSocial.sellevBtn}>
                            <div className={stylesSocial.sellevBody}>
                                <div />
                                <span>|</span>
                                <div>핸드폰번호로 가입하기</div>
                            </div>
                        </div>
                    );
            }
        };
        return (
            <div className={stylesSocial.loginBtn}>
                {btnType()}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SocialBtn));

