import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


// Styles
import styles from './RecordLayout.css';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

const mql = window.matchMedia('(min-width: 768px)');

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBgColor: 'transparent',
            navOpen: false,
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    }
    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        console.log(mql);
        this.setState({ mql: mql });
    }
    componentDidMount() {
        $('.nav-item').click(function() {
            if ($('.navbar-toggler').css('display') != 'none') {
                $('.navbar-toggler').click();
            }
        }) // 추후 수정 필요
    }
    logout() {
        this.props.dispatch(ActionAuth.logout()).then(() => {
            this.props.history.push('/');
        });
    }
    mediaQueryChanged() {
        console.log(this.state.mql.matches);
        if (this.state.navOpen) {
            if (this.state.mql.matches && this.state.navBgColor !== 'transparent') {
                this.setState({ navBgColor: 'transparent' });
            } else if (!this.state.mql.matches && this.state.navBgColor !== '#1b1b1b'){
                this.setState({ navBgColor: '#1b1b1b' });
            }
        }
    }
    goScroll(hash) {
        let scrollTo = '#' + hash;
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 500);
    } // 추후 수정 필요
    changeNavBgColor() {
        if (this.state.navBgColor === 'transparent') {
            this.setState({
                navBgColor: '#1b1b1b',
                navOpen: true,
            });
        } else if (this.state.navBgColor === '#1b1b1b') {
            this.setState({
                navBgColor: 'transparent',
                navOpen: false,
            });
        }
    }
    render() {
        return (
            <nav className={styles.headerContainer + ' navbar navbar-expand-md px-3'} style={{ height: 'auto', backgroundColor: this.state.navBgColor }}>
                <div className={styles.innerContainer}>
                    <Link className={styles.brand + ' navbar-brand'} to={'/'}>
                        <img alt={'RecordFoundation'} className={styles.headerLogo} src="/recordfoundation/assets/img/common/ic_logo.png" alt="logo" />
                    </Link>
                    <button className={styles.headerToggler + ' navbar-toggler'} onClick={this.changeNavBgColor.bind(this)} type={'button'} data-toggle={'collapse'} data-target={'#navbar-collapse-4'}>
                        <span className={'sr-only'}>Toggle Navigation</span>
                        <span className={styles.iconBar + ' ' + styles.firstIconBar}></span>
                        <span className={styles.iconBar}></span>
                        <span className={styles.iconBar}></span>
                    </button>
                    <div className={styles.menuList + ' collapse navbar-collapse'} id={'navbar-collapse-4'} style={{ height: 'auto' }}>
                        <ul className={'navbar-nav ml-auto'}>
                            <li className={'nav-item'}><Link onClick={this.goScroll.bind(this, 'section2')} to={'#'} className={styles.headerMenuItem + ' nav-link'}>ABOUT RECORD & RECORDFARM</Link></li>
                            <li className={'nav-item'}><Link to={'/'} className={styles.headerMenuItem + ' nav-link'}>WHITE PAPER</Link></li>
                            <li className={'nav-item'}><Link to={'/'} className={styles.headerMenuItem + ' nav-link'}>TOKEN SALE INFOS</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Header));

