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
import stylesModal from '../../Components/Modal/Modal.css';
import stylesUser from './UserPage.css';

// Actions
import * as ActionUser from '../../Data/User/actions';

// Utils
import * as DateUtil from '../../Lib/Utils/date';

// Config
import Config from '../../Lib/Api/config';

// Component
import TableComponent from '../../Components/Table';
import ModalComponent from '../../Components/Modal';
import UnregisteredAgency from '../../Components/UnregisteredAgency';

class UserPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {},
            modalUser: {},
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    openModalDocument(user) {
        this.setState({ modalUser: user }, () => {
            this.modalDocument.open();
        });
    }
    openUnregisteredAgency() {
        this.unregisteredAgency.modal.open();
    }
    handleSearchChange(e) {
        this.tableComponent.setState({ searchQuery: e.target.value });
    }
    handleSearchKeyPress(e) {
        if (e.key == 'Enter') {
            this.tableComponent.loadCount();
            this.tableComponent.loadList(0);
        }
    }
    handleTabChange(params) {
        this.setState({ params: params }, () => {
            this.tableComponent.reset();
        });
    }
    handleAgencyCertified() {
        let deleteConfirm = confirm('중개사 인증 하시겠습니까?');
        if (deleteConfirm == true) {
            this.props.dispatch(ActionUser.updateAgency({ isCertified: true, uId: this.state.modalUser.id })).then(() => {
                alert('중개사 인증되었습니다.');
            }).catch(() => {
                alert('실패하였습니다. 반복적으로 발생할 경우 contact@codecrain.com으로 연락주세요.');
            });
        }
    }
    handleDeleteUser(user) {
        let deleteConfirm = confirm('삭제하시겠습니까? 복구는 불가능합니다');
        if (deleteConfirm == true) {
            this.props.dispatch( ActionUser.deleteUser({ uId: user.id })).then((data) => {
                this.tableComponent.setState({
                    list: this.tableComponent.state.list.filter((data) => {
                        return data.id != user.id;
                    }),
                });
            }).catch(() => {
                alert('실패하였습니다. 반복적으로 발생할 경우 contact@codecrain.com으로 연락주세요.');
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
        let userType = (user) => {
            switch (user.type) {
                case 1:
                    return '일반사용자';
                case 2:
                    if (user.agency) {
                        return ActionUser.AGENCY_TYPE[user.agency.type];
                    }
                    return '공인중개업자';
                case 9:
                    return '비회원 중개업자';
                default:
                    return '일반사용자';
            }
        }
        let renderTableHeader = Config.PAGE_USER.COLUMN_SIZE.map((size, index) => {
            return (
                <div
                    className={stylesTable.column}
                    style={{ width: Config.PAGE_USER.COLUMN_SIZE[index] }}
                    key={index}
                >
                    {Config.PAGE_USER.COLUMN_NAME[index]}
                </div>
            );
        });
        let renderTableContent = (user, index) => {
            return (
                <div key={index} className={stylesTable.tableContentItem}>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[0] }}
                    >
                        {user[Config.PAGE_USER.COLUMN_FIELD[0]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[1] }}
                    >
                        {user[Config.PAGE_USER.COLUMN_FIELD[1]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[2] }}
                    >
                        0{user[Config.PAGE_USER.COLUMN_FIELD[2]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[3] }}
                    >
                        {user[Config.PAGE_USER.COLUMN_FIELD[3]]}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[4] }}
                    >
                        {DateUtil.format('llll', user[Config.PAGE_USER.COLUMN_FIELD[4]])}
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[5] }}
                    >
                        { userType(user) }
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[6] }}
                    >
                        { user.agency ? (
                            <div
                                className={stylesTable.columnBtn}
                                onClick={this.openModalDocument.bind(this, user)}
                            >
                                문서
                            </div>
                        ) : null }
                    </div>
                    <div
                        className={stylesTable.column}
                        style={{ width: Config.PAGE_USER.COLUMN_SIZE[6] }}
                    >
                        <div
                            className={stylesTable.columnBtn}
                            onClick={this.handleDeleteUser.bind(this, user)}
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
                    <div className={stylesTable.tableTitle}>{Config.PAGE_USER.TITLE}</div>
                    <div
                        className={stylesTable.tableAddBtn}
                        onClick={this.openUnregisteredAgency.bind(this)}
                    >
                        중개사 등록
                    </div>
                    <div className={stylesTable.tableSearch}>
                        <img
                            className={stylesTable.tableSearchIcon}
                            onClick={this.handleSearchKeyPress.bind(this, { key: 'Enter' })}
                            src={'/jivida/assets/img/common/ic_search.png'}
                            alt={'검색'}
                        />
                        <input
                            className={stylesTable.tableSearchInput}
                            type={'text'}
                            onChange={this.handleSearchChange.bind(this)}
                            onKeyPress={this.handleSearchKeyPress.bind(this)}
                            placeholder={'검색어를 입력하세요.'}
                        />
                    </div>
                </div>
                <div className={stylesTable.tableTabBox}>
                    <div
                        className={stylesTable.tableTab + ' ' + (Object.keys(this.state.params).length == 0 ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange({})}
                    >
                        <div className={stylesTable.tableTabText}>
                            회원
                        </div>
                    </div>
                    <div
                        className={stylesTable.tableTab + ' ' + (this.state.params.isCertified == false ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange({ isCertified: false })}
                    >
                        <div className={stylesTable.tableTabText}>
                            미인증 중개 회원
                        </div>
                    </div>
                    <div
                        className={stylesTable.tableTab + ' ' + (this.state.params.notRegistered ? stylesTable.active : null )}
                        onClick={() => this.handleTabChange({ notRegistered: true })}
                    >
                        <div className={stylesTable.tableTabText}>
                            비회원 중개업자
                        </div>
                    </div>
                </div>
                <TableComponent
                    onRef={(ref) => { this.tableComponent = ref; }}
                    Get={ActionUser.getSearch}
                    GetCount={ActionUser.getSearchCount}
                    HeaderComponent={renderTableHeader}
                    ListComponent={renderTableContent}
                    Params={this.state.params}
                />
                <ModalComponent
                    onRef={(ref) => { this.modalDocument = ref; }}
                    modalHeader={'개설등록증 및 공인중개사 자격증'}
                    modalBody={(
                        <div className={stylesUser.userModalBody}>
                            <div className={stylesUser.photoTitle}>사업자등록번호: {this.state.modalUser.agency ? this.state.modalUser.agency.registrationNumber : null}</div>
                            <div className={stylesUser.photoTitle}>개설증(사업자등록증)</div>
                            <img
                                className={stylesUser.photo}
                                src={this.state.modalUser.agencyRegistrationCertificate}
                                alt={'개설등록증(사업자등록증)'}
                            />
                            <div className={stylesUser.photoTitle}>공인중개사 자격증</div>
                            <img
                                className={stylesUser.photo}
                                src={this.state.modalUser.agencyLicense}
                                alt={'공인중개사 자격증'}
                            />
                        </div>
                    )}
                    modalFooter={this.state.modalUser.agency && this.state.modalUser.agency.isCertified ? null : (
                        <div
                            className={stylesUser.userModalFooter + ' ' + stylesModal.modalActionBtn}
                            onClick={this.handleAgencyCertified.bind(this)}
                        >
                            공인중개사 인증하기
                        </div>
                    )}
                />
                <UnregisteredAgency onRef={(ref) => { this.unregisteredAgency = ref; }} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(UserPageContainer));
