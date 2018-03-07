import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from './JividaLayout.css';
import stylesHouseList from '../Common/HouseList/HouseList.css';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';
import * as ActionHouse from '../Data/House/actions';
import InfiniteList from '../Common/InfiniteList';

//Component
import HouseListItem from '../Common/HouseList/HouseListItem';

class Header extends React.Component {
    componentWillMount() {
        this.houses = [];
    }
    settingClick() {
        alert('설정은 모바일앱에서만 가능합니다. 지비다 앱을 설치해주세요.');
    }
    logout() {
        this.props.dispatch(ActionAuth.logout()).then(() => {
            this.props.history.push('/');
        });
    }
    render() {
        let rightMenu = () => {
            switch (this.props.author.type) {
                case 1:
                    return (
                        <div className={styles.headerRight}>
                            <Link to="/form/request/findHouse?requestType=1" className={styles.registAgency + ' ' + styles.redBorderBtn}>집 찾기</Link>
                            <Link to="/form/sell" className={styles.registAgency + ' ' + styles.redBorderBtn}>집 내놓기</Link>
                            <Link to={'/form/signup/agency'} className={styles.registAgency + ' ' + styles.redBorderBtn}>공인중개사 가입</Link>
                            <div className={styles.profileBox + ' dropdown'}>
                                <div id="dropdownMenuButton" data-toggle="dropdown">
                                    <div className={styles.profileImg} style={{ backgroundImage: 'url(' + this.props.author.profileUrl + ')' }} ></div>
                                    <div className={styles.profileName}>{this.props.author.name}</div>
                                </div>
                                <div className={'dropdown-menu ' + styles.dropdownMenu} aria-labelledby="dropdownMenuButton">
                                    <div className={styles.dropdownItem + ' dropdown-item'} onClick={this.settingClick.bind(this)}><i className={'icon icon-ic_setting'}></i>설정</div>
                                    <div className={styles.dropdownItem + ' dropdown-item'} onClick={this.logout.bind(this)}><i className={'icon icon-ic_logout'}></i>로그아웃</div>
                                </div>
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className={styles.headerRight}>
                            <Link to="/form/sell" className={styles.registAgency + ' ' + styles.redBorderBtn}>매물 등록</Link>
                            <Link to="/form/request/findHouse?requestType=2" className={styles.registAgency + ' ' + styles.redBorderBtn}>매물 찾기</Link>
                            <div className={styles.profileBox + ' dropdown'}>
                                <div id="dropdownMenuButton" data-toggle="dropdown">
                                    <div className={styles.profileImg} style={{ backgroundImage: 'url(' + this.props.author.profileUrl + ')' }} ></div>
                                    <div className={styles.profileName}>{this.props.author.name} <i className={'icon icon-ic_arrow_down_line'}></i></div>
                                </div>
                                <div className={'dropdown-menu ' + styles.dropdownMenu} aria-labelledby="dropdownMenuButton">
                                    <div className={styles.dropdownItem + ' dropdown-item'} onClick={this.settingClick.bind(this)}><i className={'icon icon-ic_setting'}></i>설정</div>
                                    <div className={styles.dropdownItem + ' dropdown-item'} onClick={this.logout.bind(this)}><i className={'icon icon-ic_logout'}></i>로그아웃</div>
                                </div>
                            </div>
                        </div>
                    );
                default: // 로그인 되어있지 않음
                    return (
                        <div className={styles.headerRight}>
                            <Link to="/form/login" className={styles.loginBtn}>로그인</Link>
                            <Link to="/form/signup" className={styles.signupBtn}>회원가입</Link>
                        </div>
                    );
            }
        };
        return (
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <Link to="/" className={styles.headerMenuItemImg}>
                        <img className={styles.headerLogo} src="/jivida/assets/img/common/ic_logo_283.png" alt="logo" />
                    </Link>
                    <Link to="/search" className={styles.headerMenuItem + ' ' + (this.props.location.pathname.indexOf('/search') > -1 ? styles.active : null)}>검색</Link>
                    { this.props.author.id
                        ? <Link to="/chat" className={styles.headerMenuItem + ' ' + (this.props.location.pathname.indexOf('/chat') > -1 ? styles.active : null)}>메신저</Link>
                        : null}
                    { this.props.author.id
                        ? <Link to="/request/inquiry" className={styles.headerMenuItem + ' ' + (this.props.location.pathname.indexOf('/request') > -1 ? styles.active : null)}>요청함</Link>
                        : null}
                    { this.props.author.id
                        ? <Link to="/favorite/house" className={styles.headerMenuItem + ' ' + (this.props.location.pathname.indexOf('/favorite') > -1 ? styles.active : null)}>즐겨찾기</Link>
                        : null}
                    { this.props.author.id && this.props.author.type == 2
                        ? <Link to="/myHouses/all" className={styles.headerMenuItem + ' ' + (this.props.location.pathname.indexOf('/myHouses') > -1 ? styles.active : null)}>매물 관리</Link>
                        : null}
                </div>
                {rightMenu()}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));

