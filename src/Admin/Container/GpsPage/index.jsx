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

// Actions
import * as ActionGps from '../../Data/Gps/actions';

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
            tab: 'PAGE_GPS_ACCESS',

            Get: ActionGps.getGpsAccess,
            GetCount: ActionGps.getGpsAccessCount,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    changeSearchQuery(e) {
        this.tableComponent.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.tableComponent.loadCount();
            this.tableComponent.loadList(0);
        }
    }
    handleTabChange(tab) {
        let state = { tab: tab };
        if (tab == 'PAGE_GPS_ACCESS') {
            state.Get = ActionGps.getGpsAccess;
            state.GetCount = ActionGps.getGpsAccessCount;
            this.tableComponent.reset();
        } else if (tab == 'PAGE_GPS_USAGE') {
            this.props.dispatch(ActionGps.createAccess({
                uId: this.props.author.id,
                description: '위치정보 사용 내역 조회',
            })).then((data) => {}).catch((err) => {});
            state.Get = ActionGps.getGpsUsage;
            state.GetCount = ActionGps.getGpsUsageCount;
            this.tableComponent.reset();
        } else {
            this.props.dispatch(ActionGps.createAccess({
                uId: this.props.author.id,
                description: '위치정보 제공사실 열람 내역 조회',
            })).then((data) => {}).catch((err) => {});
            state.Get = ActionGps.getGpsRead;
            state.GetCount = ActionGps.getGpsReadCount;
            this.tableComponent.reset();
        }
        this.setState(state);
    }
    render() {
        let renderTableHeader = Config[this.state.tab].COLUMN_SIZE.map((size, index) => {
            return (
                <div
                    className={stylesTable.column}
                    style={{ width: Config[this.state.tab].COLUMN_SIZE[index] }}
                    key={index}
                >
                    {Config[this.state.tab].COLUMN_NAME[index]}
                </div>
            );
        });
        let renderTableContent = (data, index) => {
            switch (this.state.tab) {
                case 'PAGE_GPS_ACCESS':
                    return (
                        <div key={index} className={stylesTable.tableContentItem}>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[0] }}
                            >
                                {data.uId}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[1] }}
                            >
                                {data.description}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[2] }}
                            >
                                {DateUtil.format('llll', data.createdAt)}
                            </div>
                        </div>
                    );
                case 'PAGE_GPS_USAGE':
                    return (
                        <div key={index} className={stylesTable.tableContentItem}>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[0] }}
                            >
                                {data.uIdFrom}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[1] }}
                            >
                                {data.device}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[2] }}
                            >
                                {data.service}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[3] }}
                            >
                                {data.uIdTo}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[4] }}
                            >
                                {DateUtil.format('llll', data.createdAt)}
                            </div>
                        </div>
                    );
                case 'PAGE_GPS_READ':
                    return (
                        <div key={index} className={stylesTable.tableContentItem}>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[0] }}
                            >
                                {data.uIdMaster}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[1] }}
                            >
                                {data.uIdTo}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[2] }}
                            >
                                {data.description}
                            </div>
                            <div
                                className={stylesTable.column}
                                style={{ width: Config[this.state.tab].COLUMN_SIZE[3] }}
                            >
                                {DateUtil.format('llll', data.createdAt)}
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        };
        return (
            <div className={stylesTable.tableContainer}>
                <div className={stylesTable.tableHeaderBox}>
                    <div className={stylesTable.tableTitle}>위치기반 서비스</div>
                </div>
                <div className={stylesTable.tableTabBox}>
                    <div
                        className={stylesTable.tableTab + ' ' + (this.state.tab == 'PAGE_GPS_ACCESS' ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange('PAGE_GPS_ACCESS')}
                    >
                        <div className={stylesTable.tableTabText}>
                            {Config.PAGE_GPS_ACCESS.TITLE}
                        </div>
                    </div>
                    <div
                        className={stylesTable.tableTab + ' ' + (this.state.tab == 'PAGE_GPS_USAGE' ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange('PAGE_GPS_USAGE')}
                    >
                        <div className={stylesTable.tableTabText}>
                            {Config.PAGE_GPS_USAGE.TITLE}
                        </div>
                    </div>
                    <div
                        className={stylesTable.tableTab + ' ' + (this.state.tab == 'PAGE_GPS_READ' ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange('PAGE_GPS_READ')}
                    >
                        <div className={stylesTable.tableTabText}>
                            {Config.PAGE_GPS_READ.TITLE}
                        </div>
                    </div>
                </div>
                <TableComponent
                    onRef={(ref) => { this.tableComponent = ref; }}
                    Get={this.state.Get}
                    GetCount={this.state.GetCount}
                    HeaderComponent={renderTableHeader}
                    ListComponent={renderTableContent}
                    Params={{}}
                />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SmsPageContainer));
