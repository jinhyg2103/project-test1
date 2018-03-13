import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import AuthBtn from '../../Components/Authentication/AuthButton';

// Styles
import styles from '../../Styles/App.css';
import stylesAuth from '../../Styles/Components/Authentication.css';

class SignupBody extends React.Component {
    constructor(props) {
        super(props);
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
                      <div className={styles.formRow}>
                          <div className={styles.formInputName}>핸드폰번호</div>
                          <input className={styles.formInputWithVerify} type={'text'} placeholder={'핸드폰번호를 입력해주세요.'} />
                          <div className={styles.formInputVerifyBtn}>인증</div>
                      </div>
                      <div className={styles.formRow}> {/*인증 전에는 다른 스타일 따로 하나 만들어주세요. ex) styles.formRow + ' ' + styles.notVerified */}
                          <div className={styles.formInputName}>인증번호</div>
                          <input className={styles.formInputWithVerify} type={'text'} placeholder={'위의 인증버튼 선택 후 인증번호를 입력해주세요.'} />
                      </div>
{/*
                      <div>인증시간이 2:58 남았습니다</div>
*/}
                      <div className={styles.formRow}>
                          <div className={styles.formInputName}>비밀번호</div>
                          <input className={styles.formInputWithVerify} type={'password'} placeholder={'비밀번호 확인'} />
                      </div>
                      <div className={styles.formRow}>
                          <div className={styles.formInputName}>비밀번호확인</div>
                          <input className={styles.formInputWithVerify} type={'password'} placeholder={'비밀번호 확인'} />
                      </div>
                      <div className={styles.formRow}>
                          <div className={styles.agreeLabel}> {/* 체크박스 부분은 formGroup 안에 넣으셔도 되고 밖으로 빼셔도 됩니다. */}
                              <input type={'checkbox'} />
                              <label>이용약관과 개인정보취급방침에 동의합니다.</label>
                          </div>
                      </div>
                  </div>
                  <div>
                      <AuthBtn btnText={'가입하기'} />
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
