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
import * as ActionHouse from '../../Data/House/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';
import * as ConvertUtil from '../../Lib/Utils/converter';

// Config
import Config from '../../Lib/Api/config';

// Component
import TableComponent from '../../Components/Table';

class HousePageContainer extends React.Component {
    changeSearchQuery(e) {
        this.tableComponent.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.tableComponent.loadCount();
            this.tableComponent.loadList(0);
        }
    }
    detailHouse(house) {
        window.open('/house?id=' + house.id, '_blank');
    }
    deleteHouse(house) {
        let deleteConfirm = confirm('삭제하시겠습니까? 복구는 불가능합니다');
        if (deleteConfirm == true) {
            this.props.dispatch( ActionHouse.deleteHouse({ hId: house.id })).then((data) => {
                this.tableComponent.setState({
                    list: this.tableComponent.state.list.filter((data) => {
                        return data.id != house.id;
                    }),
                });
            });
        }
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
        let renderTableHeader = Config.PAGE_HOUSE.COLUMN_SIZE.map((size, index) => {
            return (
                <div
                    className={stylesTable.column}
                    style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[index] }}
                    key={index}
                >
                    {Config.PAGE_HOUSE.COLUMN_NAME[index]}
                </div>
            );
        });
        let renderTableContent = (house, index) => {
            return (
                <div key={index} className={stylesTable.tableContentItem}>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[0] }}
                    >
                        {house[Config.PAGE_HOUSE.COLUMN_FIELD[0]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[1] }}
                    >
                        {house[Config.PAGE_HOUSE.COLUMN_FIELD[1]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[2] }}
                    >
                        {ConvertUtil.convertNumber2Won(house[Config.PAGE_HOUSE.COLUMN_FIELD[2]])}원
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[3] }}
                    >
                        { ActionHouse.HOUSE_TYPE[house[Config.PAGE_HOUSE.COLUMN_FIELD[3]]] }
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[4] }}
                    >
                        {house[Config.PAGE_HOUSE.COLUMN_FIELD[4]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[5] }}
                    >
                        {DateUtil.format('llll', house[Config.PAGE_HOUSE.COLUMN_FIELD[5]])}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[6] }}
                    >
                        <div
                            className={stylesTable.columnBtn}
                            onClick={this.detailHouse.bind(this, house)}
                        >
                            보기
                        </div>
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_HOUSE.COLUMN_SIZE[7] }}
                    >
                        <div
                            className={stylesTable.columnBtn}
                            onClick={this.deleteHouse.bind(this, house)}
                        >
                            삭제
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={stylesTable.tableContainer}>
                <div className={stylesTable.tableHeaderBox}>
                    <div className={stylesTable.tableTitle}>{Config.PAGE_HOUSE.TITLE}</div>
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
                            placeholder={'검색어를 입력하세요.'}
                        />
                    </div>
                </div>
                <TableComponent
                    onRef={(ref) => { this.tableComponent = ref; }}
                    Get={ActionHouse.getSearch}
                    GetCount={ActionHouse.getSearchCount}
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
})(withRouter(HousePageContainer));
