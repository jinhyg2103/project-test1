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
import stylesPush from './PushPage.css';

// Actions
import * as ActionPush from '../../Data/Push/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

// Component
import TableComponent from '../../Components/Table';

class PushPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            push: '',
        };
        this.handleSendPush = this.handleSendPush.bind(this);
    }
    handleSendPush() {
        if (confirm('모든 회원에게 푸쉬알람이 갑니다. 정말 보내시겠습니까?')) {
            this.props.dispatch(ActionPush.creatPush2All({
                description: this.state.push,
            })).then((data) => {
                alert('모든 회원에게 푸쉬알람이 전송되었습니다.');
            }).catch((err) => {
                alert('푸쉬알람 전송이 실패하였습니다. 계속 실패할 경우, contact@codecrain.com으로 문의하여 주십시오.');
            });
        }
    }
    render() {
        return (
            <div className={stylesTable.tableContainer + ' ' + stylesPush.pushPageContainer}>
                <div className={stylesTable.tableHeaderBox}>
                    <div className={stylesTable.tableTitle}>{Config.PAGE_PUSH.TITLE}</div>
                </div>
                <div>
                    <textarea
                        className={stylesPush.textarea}
                        placeholder={'푸쉬할 메시지를 입력해주세요'}
                        value={this.state.push}
                        onChange={(e) => this.setState({ push: e.target.value })}
                    ></textarea>
                    <div
                        className={stylesPush.sendBtn}
                        onClick={() => this.handleSendPush()}
                    >
                        보내기
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
})(withRouter(PushPageContainer));
