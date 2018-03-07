import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionInquiry from '../../Data/Inquiry/actions';

// Components
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';

// CSS
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class TabInquiryView extends React.Component {
    componentWillMount() {
        this.params = {};
        if (this.props.author.type == 1) this.params.uIdUser = this.props.author.id;
        if (this.props.author.type == 2) this.params.uIdAgency = this.props.author.id;
    }
    acceptInquiry(inquiry) {
        this.props.dispatch(ActionInquiry.acceptInquiry({ ihId: inquiry.ihId }));
    }
    cancelInquiry(inquiry) {
        if (confirm('정말 취소하시겠습니까?')) {
            this.props.dispatch(ActionInquiry.cancelInquiry({ ihId: inquiry.ihId })).then((data) => {
                this.inquiryList.setState({
                    list: this.inquiryList.state.list.filter((data) => {
                        return data.id != inquiry.id;
                    }),
                });
            });
        }
    }
    render() {
        let acceptBtn = (inquiry) => {
            if ( inquiry.isAccepted ) {
                return (
                    <Link to={'/chat?uId=' + inquiry.userFrom.id} className={stylesHouseList.btnActive + ' ' + styles.redBorderBtn}>
                        <i className={'icon icon-ic_talk'}></i>대화
                    </Link>
                );
            } else {
                return (
                    <div className={stylesHouseList.btnActive + ' ' + styles.grayBorderBtn} onClick={this.acceptInquiry.bind(this, inquiry)}>
                        <i className={'icon icon-ic_check'}></i>수락
                    </div>
                );
            }
        }
        let inquiryListItem = (inquiry, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    { <HouseListItem house={inquiry} />}
                    <div className={stylesHouseList.toolBox}>
                        <Link to={'/user?id=' + inquiry.userFrom.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + inquiry.userFrom.profileUrl + ')' }}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{inquiry.userFrom.name}</div>
                            </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            {acceptBtn(inquiry)}
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.cancelInquiry.bind(this, inquiry)}>
                                <i className={'icon icon-ic_delete'}></i>거절
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={stylesRequest.requestContainer}>
                <div className={stylesRequest.expiredDate}>2017년 8월 21일 이전에 등록된 문의는 내일 삭제됩니다. </div>
                <InfiniteList onRef={(ref) => { this.inquiryList = ref; }} ListItem={inquiryListItem} Get={ActionInquiry.getInquiries} Reset={ActionInquiry.resetInquiries} GetParams={this.params} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        inquiries: state.data.inquiry.inquiries,
        from: state.data.inquiry.from,
        author: state.data.auth.author,
    };
})(withRouter(TabInquiryView));
