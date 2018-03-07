import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CSS
import styles from '../JividaLayout.css';
import stylesHome from './Home.css';

/*<Link to="/form/login" className={stylesHome.requestBtn + ' ' + styles.redBtn}>
    중개 요청하기
    <i className={'icon icon-ic_arrow_right_line'}></i>
</Link>*/

class HomeView extends React.Component {
    render() {
        return (
            <div className={stylesHome.homeContainer}>
                <div className={stylesHome.homeBanner}>
                    <div className={stylesHome.homeSectionContainer}>
                        {/*{ this.props.author.id ? (
                            this.props.author.type == 1 ? (
                                <Link to="form/request/findHouse?requestType=2" className={stylesHome.requestBtn + ' ' + styles.redBtn}>요청하기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                            ) : (
                                <Link to="form/request/findHouse?requestType=1" className={stylesHome.requestBtn + ' ' + styles.redBtn}>요청하기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                            )
                        ) : (
                            <Link to="/form/login" className={stylesHome.requestBtn + ' ' + styles.redBtn}>요청하기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        )}*/}
                        <Link to="/search" className={stylesHome.searchBtn}><img src={'/jivida/assets/img/home/ic_find_house.png'} /></Link>
                    </div>
                </div>
                <div className={stylesHome.homeSection1}>
                    <div className={stylesHome.homeSectionContainer}>
                        <div className={stylesHome.sectionBanner}>
                        </div>
                        {/*{ this.props.author.id ? (
                            <Link to="/request/findHouse" className={stylesHome.requestBtn + ' ' + styles.redBtn}>집 찾기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        ) : (
                            <Link to="/form/login" className={stylesHome.requestBtn + ' ' + styles.redBtn}>집 찾기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        )}
                        <Link to="/search" className={stylesHome.searchBtn + ' ' + styles.redBtn}>검색하기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        { this.props.author.id ? (
                            <Link to="/form/sell" className={stylesHome.sellBtn + ' ' + styles.redBtn}>집 내놓기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        ) : (
                            <Link to="/form/login" className={stylesHome.sellBtn + ' ' + styles.redBtn}>집 내놓기 <i className={'icon icon-ic_arrow_right_line'}></i></Link>
                        )}*/}
                    </div>
                </div>
                <div className={stylesHome.homeSection2}>
                    <div className={stylesHome.homeSectionContainer}>
                        <div className={stylesHome.sectionBanner}>
                        </div>
                        <img className={stylesHome.sectionAndroidBtn} src={'/jivida/assets/img/home/home_android_btn.png'} />
                        <img className={stylesHome.sectionIOSBtn} src={'/jivida/assets/img/home/home_ios_btn.png'} />
                    </div>
                </div>
                {/*{ this.props.author.type == 2 ? null : (
                    <div className={stylesHome.homeSection3}>
                        <div className={stylesHome.homeSectionContainer}>
                            <div className={stylesHome.sectionBannerContainer}>
                                <div className={stylesHome.sectionBanner}>
                                    <Link to="/form/login" className={stylesHome.sectionSignBtn}>등록하기</Link>
                                </div>
                            </div>
                            <div className={stylesHome.sectionBg}></div>
                        </div>
                    </div>
                )}*/}
                <div className={stylesHome.homeFooter}>
                    <div className={stylesHome.homeFooterBox}>
                        <div className={stylesHome.footerLeft}>
                            <img className={stylesHome.footerLogo} src={'/jivida/assets/img/home/footer_logo.png'} />
                        </div>
                        <div className={stylesHome.footerMiddle}>
                            <div className={stylesHome.policyLine}>
                                <Link to={'/policies/terms'} className={stylesHome.policyLineBtn}>지비다 이용약관</Link>
                                <Link to={'/policies/privacy'} className={stylesHome.policyLineBtn}>개인정보취급방침</Link>
                                <Link to={'/policies/location'} className={stylesHome.policyLineBtn}>위치기반서비스 이용약관</Link>
                                <Link to={'/policies/agency'} className={stylesHome.policyLineBtn}>중개회원서비스 이용약관</Link>
                            </div>
                            <div className={stylesHome.companyLine}>
                                <div className={stylesHome.companyLineText}>
                                    <span>(주)아즈나</span>
                                    <span>대표:사공훈</span>
                                    <span>서비스 제휴 문의: azna@azna.co.kr</span>
                                    <span>Tel:1800-0740</span>
                                    <span>Fax:031-215-4774</span>
                                </div>
                                <div className={stylesHome.companyLineText}>
                                    <span>경기도 수원시 영통구 도청로 89번길 43 에듀프라자(광교신도시,이의동)</span>
                                    <span>사업자등록번호: 493-88-00350</span>
                                </div>
                                <div className={stylesHome.companyLineText}>
                                    <span>통신판매업신고번호:</span>
                                    <span>제2016-수원영통-0234호</span>
                                    <span>위치기반서비스신고: 1025</span>
                                </div>
                            </div>
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
})(withRouter(HomeView));


/*

                <div className={stylesHome.homeSection4}>
                    <div className={stylesHome.homeSectionContainer}>
                        <img className={stylesHome.sectionPhone} src={'/jivida/assets/img/home/home_phone_call.jpg'} />
                        <Link to="/form/login" className={stylesHome.sectionService}><i className={'icon icon-ic_inquiry'}></i>서비스제휴문의</Link>
                        <Link to="/form/login" className={stylesHome.sectionPolicy}><i className={'icon icon-ic_search_house'}></i>매물관리정책</Link>
                        <Link to="/form/signup" className={stylesHome.sectionSignin}><i className={'icon icon-ic_user'}></i>회원가입</Link>
                        { this.props.author.type == 2 ? null : (
                            <Link to="/form/signup?isAgency=1" className={stylesHome.sectionSignup}><i className={'icon icon-ic_request'}></i>공인중개사 회원가입</Link>
                        )}
                    </div>
                </div>
* */
