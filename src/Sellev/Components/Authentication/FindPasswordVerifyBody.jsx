import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import AuthBtn from './AuthButton';

// Styles
import styles from '../../Styles/App.css';
import stylesAuth from '../../Styles/Components/Authentication.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.verifyUser = this.verifyUser.bind(this);
    }
    verifyUser() {
        console.log('dfsf');
        this.props.onVerified(true);
    }
    render() {
        return (
            <div className={stylesAuth.verifyBody}>
                <div>비밀번호를 잊으셨나요?</div>
                <div className={styles.formGroup}>
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>핸드폰번호</div>
                        <input className={styles.formInputWithVerify} type={'text'} placeholder={'핸드폰번호를 입력해주세요.'} />
                        <div className={styles.formInputVerifyBtn}>인증</div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>인증번호</div>
                        <input className={styles.formInput} type={'text'} placeholder={'위의 인증버튼 선택 후 인증번호를 입력해주세요.'} />
                    </div>
                </div>
                <div>
                    <AuthBtn btnText={'다음'} onClick={this.verifyUser}/>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));