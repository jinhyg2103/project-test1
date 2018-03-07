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
import * as ActionUser from '../../Data/User/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

/*
* this.props.Get
* this.props.GetCount
* this.props.HeaderComponent
* this.props.ListComponent
* this.props.Params
*/
class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            searchQuery: '',
            count: 30,
            total: 0,
            isResetCount: true,
        };
    }
    componentWillMount() {
        this.loadCount();
        this.loadList(0);
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    reset() {
        this.setState({
            list: [],
            total: 0,
        }, () => {
            this.loadCount();
            this.loadList(0);
        });
    }
    loadList(page) {
        this.props.dispatch(this.props.Get(Object.assign({
            searchQuery: this.state.searchQuery,
            from: page * this.state.count,
            count: this.state.count,
        }, this.props.Params))).then((data) => {
            this.setState({
                list: data,
            });
        }).catch((err) => { });
    }
    loadCount() {
        this.setState({ isResetCount: true });
        this.props.dispatch(this.props.GetCount(Object.assign({
            searchQuery: this.state.searchQuery,
        }, this.props.Params))).then((total) => {
            this.setState({
                total: total,
                isResetCount: false,
            });
        }).catch((err) => { });
    }
    changeSearchQuery(e) {
        this.setState({ searchQuery: e.target.value });
    }
    searchKeyPress(e) {
        if (e.key == 'Enter') {
            this.loadCount();
            this.loadList(0);
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
        let renderList = this.state.list.map(this.props.ListComponent);
        return (
            <div>
                <div className={stylesTable.tableContentBox}>
                    <li className={stylesTable.tableContentHeader}>
                        { this.props.HeaderComponent }
                    </li>
                    { renderList }
                </div>
                { this.state.isResetCount ? null : (
                    <ReactPaginate
                        previousLabel={'이전'}
                        nextLabel={'다음'}
                        pageCount={this.state.total / this.state.count}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(data) => { this.loadList(data.selected); }}
                        containerClassName={stylesTable.pagination}
                        pageClassName={stylesTable.pageNav}
                        breakClassName={stylesTable.pageNav}
                        previousClassName={stylesTable.pageNav}
                        nextClassName={stylesTable.pageNav}
                        activeClassName={stylesTable.active}
                    />
                )}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TableComponent));
