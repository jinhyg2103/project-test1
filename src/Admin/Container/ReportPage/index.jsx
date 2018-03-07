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
import * as ActionReport from '../../Data/Report/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

// Component
import TableComponent from '../../Components/Table';

class ReportContainer extends React.Component {
    changeSearchQuery(e) {
        this.tableComponent.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.tableComponent.loadCount();
            this.tableComponent.loadUsers(0);
        }
    }
    detailReport(report) {
        alert('제목 : ' + report.title + '\n\n내용 : ' + report.description);
    }
    render() {
        let renderLoadingBox = (
            <div className={stylesTable.tableLoadingBox}>
                <img
                    src={'/admin/assets/img/loading.gif'}
                    className={stylesTable.tableLoadingIcon}
                    alt={'loading'}
                />
            </div>
        );
        let renderTableHeader = Config.PAGE_REPORT.COLUMN_SIZE.map((size, index) => {
            return (
                <div
                    className={stylesTable.column}
                    style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[index] }}
                    key={index}
                >
                    {Config.PAGE_REPORT.COLUMN_NAME[index]}
                </div>
            );
        });
        let renderTableContent = (report, index) => {
            return (
                <div key={index} className={stylesTable.tableContentItem}>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[0] }}
                    >
                        {report[Config.PAGE_REPORT.COLUMN_FIELD[0]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[1] }}
                    >
                        {report[Config.PAGE_REPORT.COLUMN_FIELD[1]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[2] }}
                    >
                        {report[Config.PAGE_REPORT.COLUMN_FIELD[2]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[3] }}
                    >
                        {report[Config.PAGE_REPORT.COLUMN_FIELD[3]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[4] }}
                    >
                        {DateUtil.format('llll', report[Config.PAGE_REPORT.COLUMN_FIELD[4]])}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_REPORT.COLUMN_SIZE[5] }}
                    >
                        <div
                            className={stylesTable.columnBtn}
                            onClick={this.detailReport.bind(this, report)}
                        >
                            보기
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={stylesTable.tableContainer}>
                <div className={stylesTable.tableHeaderBox}>
                    <div className={stylesTable.tableTitle}>{Config.PAGE_REPORT.TITLE}</div>
                    <div className={stylesTable.tableSearch}>
                        <img
                            className={stylesTable.tableSearchIcon}
                            onClick={this.searchKeyPress.bind(this, { key: 'Enter' })}
                            src={'/jivida/assets/img/common/ic_search.png'}
                            alt={'검색'}
                        />
                        <input
                            className={stylesTable.tableSearchInput}
                            type={'text'}
                            onChange={this.changeSearchQuery.bind(this)}
                            onKeyPress={this.searchKeyPress.bind(this)}
                        />
                    </div>
                </div>
                <TableComponent
                    onRef={(ref) => { this.tableComponent = ref; }}
                    Get={ActionReport.getSearch}
                    GetCount={ActionReport.getSearchCount}
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
})(withRouter(ReportContainer));
