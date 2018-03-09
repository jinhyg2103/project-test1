import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//Component
import GlobalMenu from './globalMenu';
import GlobalUserMenu from './globalUserMenu';
import UserBox from '../../Common/UserBox';

// Styles
import styles from '../../Styles/Components/Header.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

const mql = window.matchMedia('(min-width: 768px)');

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            dropDownOpen: false,
            userMenuOpen: false,
            mediaQuery: !mql.matches,
            imgUrl: 'Sellev/assets/img/img_user.png',
        };
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleUserMenu = this.handleUserMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.setState({
            mql: mql,
        });
        mql.addListener(this.handleChange);
    }
    handleChange() {
        this.setState({
            mql: mql,
        });
        if (this.state.mql.matches) {
            this.setState({
                mediaQuery: false,
            });
        } else {
            this.setState({
                mediaQuery: true,
            });
        }
    }
    handleDropdown() {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }
    handleUserMenu() {
        this.setState({
            userMenuOpen: !this.state.userMenuOpen,
        });
    }
    render() {
        return (
            <div>
                <div className={styles.headerContainer}>
                    <div className={styles.headerBox}>
                        <div className={styles.leftBox}>
                            <div className={styles.logo}>
                                <img className={styles.logoWhite} src={'Sellev/assets/img/logo_sellev_white.png'} alt={''} />
                                <img className={styles.logoBlack} src={'Sellev/assets/img/logo_sellev_black.png'} alt={''} />
                            </div>
                            <div className={styles.toggleIcon} onClick={this.handleDropdown}>
                                <div />
                            </div>
                            <ul className={(this.state.dropDownOpen ? styles.toggleMenu : styles.leftList)}>
                                <li><Link to={'/home'}>Home</Link></li>
                                <li><Link to={'/hashtag'}>해시태그</Link></li>
                                <li><Link to={'/product'}>펀딩&마켓</Link></li>
                                <li><Link to={'/media'}>동영상</Link></li>
                                <li><Link to={'/myhome'}>마이홈</Link></li>
                            </ul>
                        </div>
                        <div className={styles.rightBox}>
                            <ul className={styles.rightList}>
                                <li><div className={(this.state.mediaQuery ? styles.searchBlack : styles.searchWhite)} /></li>
                                <li><div className={(this.state.mediaQuery ? styles.notifyBlack : styles.notifyWhite)} /></li>
                            </ul>
                            <div className={styles.iconBox}>
                                <div onClick={this.handleUserMenu}><UserBox imgUrl={this.state.imgUrl} /></div>
                                <ul className={styles.userMenu + (this.state.userMenuOpen ? '' : ' ' + styles.hide)}>
                                    <li><Link to={'/home'}>관심펀딩/상품</Link></li>
                                    <li><Link to={'/hashtag'}>참여 펀딩 현황</Link></li>
                                    <li><Link to={'/product'}>주문내역 조회</Link></li>
                                    <li><Link to={'/media'}>코인충전</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.dropDownOpen ? <GlobalMenu /> : null }
                { this.state.userMenuOpen ? <GlobalUserMenu /> : null }
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));

