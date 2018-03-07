import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// Component
import PhoneNumberVerify from '../../Common/PhoneNumberVerify';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

class FindIdView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFindIdText() {
        this.phoneNumberVerify.setState({
            warnPhoneNumberValid: false, // 전화번호 필수입력/인증
            warnPhoneNumberAlreadyExist: false,
            warnPhoneNumber6digitWrong: false,
        });
        // 휴대폰 인증완료되었는가?
        if (!this.phoneNumberVerify.state.isSmsVerified) {
            this.phoneNumberVerify.setState({ warnPhoneNumberValid: true });
        }
        setTimeout(() => {
            if (this.phoneNumberVerify.state.warnPhoneNumberValid) {
                return;
            }
            ActionAuth.findIdText({
                countryDialCode: this.phoneNumberVerify.state.countryDialCode,
                phoneNumber: this.phoneNumberVerify.state.phoneNumber,
            }).then((idText) => {
                alert('고객님의 ID는 ' + idText + '입니다.');
                this.props.history.push('/form/login');
            }).catch((err) => {
                alert('존재하지 않는 아이디입니다.');
            });
        }, 100);
    }
    render() {
        return (
            <div className={stylesForm.findIdContainer}>
                <Link to="/" className={stylesForm.logoBox}>
                    <img className={stylesForm.logoImg} src="/jivida/assets/img/common/ic_logo_283.png" alt="logo" />
                </Link>
                <PhoneNumberVerify onRef={(ref) => { this.phoneNumberVerify = ref; }} force={true} />
                <div className={styles.redBtn + ' ' + stylesForm.largeBtn} onClick={this.onFindIdText.bind(this)}>아이디 찾기</div>
            </div>
        );
    }
}
export default connect()(withRouter(FindIdView));
