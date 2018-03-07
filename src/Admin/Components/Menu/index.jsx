import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Utils

// Styles
import * as StylesAdmin from '../../Styles/AdminLayout.css';
import * as StylesMenu from './Menu.css';

class Menu extends React.Component {
    render() {
        return (
            <div className={StylesMenu.menuContainer}>
                <div className={StylesMenu.menuHeader}>
                    <Link to={'/admin/user'}><img className={StylesMenu.menuHeaderIcon} src='/jivida/assets/img/common/ic_logo_283.png' /></Link>
                </div>
                <div className={StylesMenu.menuBox}>
                    <ul className={StylesMenu.menuBoxUl}>
                        <Link
                            className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/user' ? StylesMenu.active : null )}
                            to={'/admin/user'}
                        >
                            <div className={StylesMenu.menuText}>고객 관리</div>
                            <div className={StylesMenu.menuCount}></div>
                        </Link>
                        <Link
                            className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/house' ? StylesMenu.active : null )}
                            to={'/admin/house'}
                        >
                            <div className={StylesMenu.menuText}>매물 관리</div>
                            <div className={StylesMenu.menuCount}></div>
                        </Link>
                        <li className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/sms' ? StylesMenu.active : null )}>
                            <Link
                                className={StylesMenu.menuBoxLlnk}
                                to={'/admin/sms'}
                            >
                                <div className={StylesMenu.menuText}>SMS 관리</div>
                                <div className={StylesMenu.menuCount}></div>
                            </Link>
                        </li>
                        <li className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/push' ? StylesMenu.active : null )}>
                            <Link
                                className={StylesMenu.menuBoxLlnk}
                                to={'/admin/push'}
                            >
                                <div className={StylesMenu.menuText}>푸쉬 관리</div>
                                <div className={StylesMenu.menuCount}></div>
                            </Link>
                        </li>
                        <li className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/report' ? StylesMenu.active : null )}>
                            <Link
                                className={StylesMenu.menuBoxLlnk}
                                to={'/admin/report'}
                            >
                                <div className={StylesMenu.menuText}>문의</div>
                                <div className={StylesMenu.menuCount}></div>
                            </Link>
                        </li>
                        <li className={StylesMenu.menuBoxLl + ' ' + (this.props.location.pathname == '/admin/gps' ? StylesMenu.active : null )}>
                            <Link
                                className={StylesMenu.menuBoxLlnk}
                                to={'/admin/gps'}
                            >
                                <div className={StylesMenu.menuText}>위치기반 서비스</div>
                                <div className={StylesMenu.menuCount}></div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Menu));
