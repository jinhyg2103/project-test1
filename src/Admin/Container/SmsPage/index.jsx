import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

import { withRouter } from 'react-router';
import InfiniteScroller from 'react-infinite-scroller';
import ReactPaginate from 'react-paginate';

// Styles
import stylesTable from '../../Styles/TableLayout.css';
import stylesSms from './SmsPage.css';

// Actions
import * as ActionSms from '../../Data/Sms/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

// Component
import TableComponent from '../../Components/Table';

class SmsPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usageThisMonth: 0,
            usageLastMonth: 0,
            isSend: true,
        };
        this.handleSmsSwitch = this.handleSmsSwitch.bind(this);
    }
    componentWillMount() {
        let date = new Date();
        let thisYear = date.getFullYear();
        let thisMonth = date.getMonth() + 1; // month는 0부터 시작해서 1을 더해주어야함 (1월이 0임)
        let lastYear = date.getFullYear();
        let lastMonth = date.getMonth();
        if (lastMonth == 0) {
            lastYear -= 1;
            lastMonth = 12;
        }
        this.props.dispatch(ActionSms.getUsage({
            month: thisMonth,
            year: thisYear,
        })).then((usage) => {
            this.setState({ usageThisMonth: usage.count });
        }).catch((err) => { });
        
        this.props.dispatch(ActionSms.getUsage({
            month: lastMonth,
            year: lastYear,
        })).then((usage) => {
            this.setState({ usageLastMonth: usage.count });
        }).catch((err) => { });
        
        this.props.dispatch(ActionSms.getSetting({})).then((data) => {
            console.log(data);
            this.setState({ isSend: data.isSend });
        }).catch((err) => { });
    }
    handleSmsSwitch() {
        let warn = 'SMS가 더 이상 전송되지 않습니다. 정말 끄시겠습니까?';
        if (!this.state.isSend) warn = 'SMS를 전송합니다. 정말 켜시겠습니까?';
        if (confirm(warn)) {
            this.props.dispatch(ActionSms.updateSetting({
                isSend: !this.state.isSend,
            })).then((data) => {
                if (!this.state.isSend) alert('SMS가 전송됩니다.');
                else alert('더 이상 SMS가 전송되지 않습니다.');
                this.setState({ isSend: !this.state.isSend });
            }).catch((err) => {
                alert('업데이트가 실패하였습니다. 계속 실패할 경우, contact@codecrain.com으로 문의하여 주십시오.');
            });
        }
    }
    render() {
        return (
            <div className={stylesTable.tableContainer + ' ' + stylesSms.smsPageContainer}>
                <div className={stylesTable.tableHeaderBox}>
                    <div className={stylesTable.tableTitle}>{Config.PAGE_SMS.TITLE}</div>
                </div>
                <div>
                </div>
                <div className={stylesTable.tableContentBox}>
                    <li className={stylesTable.tableContentHeader}>
                        <span className={stylesSms.line}>이번달 SMS 전송 개수 : {this.state.usageThisMonth}</span>
                    </li>
                    <li className={stylesTable.tableContentHeader}>
                        <span className={stylesSms.line}>지난달 SMS 전송 개수 : {this.state.usageLastMonth}</span>
                    </li>
                    <li className={stylesTable.tableContentHeader}>
                        <span
                            className={stylesSms.line + ' ' + stylesSms.lineBtn}
                            onClick={() => this.handleSmsSwitch()}
                        >
                            SMS 전송이 { this.state.isSend ? '켜져있습니다. ' : '꺼져있습니다. '} <span className={stylesSms.lineBtnBlue}>{ this.state.isSend ? '끄기' : '켜기'}</span>
                        </span>
                    </li>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SmsPageContainer));
