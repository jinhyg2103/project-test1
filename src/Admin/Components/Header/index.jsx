import React from 'react';
import {
    Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

// Styles
import styles from './Header.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

class Header extends React.Component {
    logout() {
        this.props.dispatch(ActionAuth.logout()).then(() => {
            this.props.history.push('/admin/');
        });
    }

    render() {
        return (
            <div className={styles.headerContainer}>
                <Link
                    to={'/admin/user'}
                    className={styles.headerLogoBox}
                >
                    <img
                        className={styles.headerLogo}
                        src={'/jivida/assets/img/common/app_logo_codecrain.png'}
                        alt={'logo'}
                    />
                </Link>
                <div className={styles.headerRight}>
                    <div className={styles.headerName}>지비다 관리자</div>
                    {this.props.author.name ? (
                        <div
                            className={styles.headerLogout}
                            onClick={this.logout.bind(this)}
                        >
                            로그아웃
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));
