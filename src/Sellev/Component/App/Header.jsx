import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


// Styles
import styles from './App.css';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

const mql = window.matchMedia('(min-width: 768px)');

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            sideMenuOpen: false,
        };
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleSideMenu = this.handleSideMenu.bind(this);
    }
    handleDropdown() {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }
    handleSideMenu() {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen,
        });
    }
    render() {
        return (
            <div className={styles.headerContainer}>
                <div className={styles.headerBox}>
                    <div className={styles.leftBox}>
                        <div className={styles.logo}>
                            <img src={'Sellev/assets/img/img_logo_black.png'} alt={''} />
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
                            <li><div /></li>
                            <li><div /></li>
                        </ul>
                        <div className={styles.iconBox}>
                            <div><img alt={''} src={'Sellev/assets/img/img_user.png'} /></div>
                            <div>김제니</div>
                            <div onClick={this.handleSideMenu} />
                            <ul className={styles.sideMenu + (this.state.sideMenuOpen ? ' ' + styles.active : '')}>
                                <li><Link to={'/home'}>관심펀딩/상품</Link></li>
                                <li><Link to={'/hashtag'}>참여 펀딩 현황</Link></li>
                                <li><Link to={'/product'}>주문내역 조회</Link></li>
                                <li><Link to={'/media'}>코인충전</Link></li>
                            </ul>
                        </div>
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
})(withRouter(Header));

