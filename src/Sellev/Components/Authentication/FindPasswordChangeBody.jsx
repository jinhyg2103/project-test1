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


class LoginView extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className={stylesAuth.changeBody}>
                <div>비밀번호 재설정</div>
                <div className={styles.formGroup}>
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>새 비밀번호</div>
                        <input className={styles.formInputWithVerify} type={'password'} placeholder={'비밀번호는 6~18문자로 구성해주세요.'} />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formInputName}>새 비밀번호 확인</div>
                        <input className={styles.formInput} type={'password'} placeholder={'새 비밀번호를 다시 입력해주세요.'} />
                    </div>
                </div>
                <div>
                    <div className={stylesAuth.authBtn} onClick={this.verifyUser}>비밀번호 변경</div>
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