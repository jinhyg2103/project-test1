import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionChat from '../../Data/Chat/actions';

// Components
import HouseListItem from '../../Common/HouseList/HouseListItem';
import InfiniteList from '../../Common/InfiniteList';

// Styles
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class TabSellView extends React.Component {
    componentWillMount() {
        this.params = {
            uIdTo: this.props.author.id,
        };
    }
    acceptRequest(house) {
        ActionRequest.acceptRequestSell({
            rsId: house.rsId,
            hId: house.id,
        }).then((data) => {
            alert('매물 관리에서 확인하실 수 있습니다!');
            this.houseList.setState({
                list: this.houseList.state.list.filter((data) => {
                    return data.id != house.id;
                }),
            });
        });
    }
    deleteHouse(house) {
        if (confirm('정말 거절하시겠습니까? 거절한 집은 복구가 불가능합니다.')) {
            this.props.dispatch(ActionRequest.deleteRequestSell({ hId: house.id })).then((data) => {
                this.houseList.setState({
                    list: this.houseList.state.list.filter((data) => {
                        return data.id != house.id;
                    }),
                });
            });
        }
    }
    render() {
        let houseListItem = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithToolBox}>
                    { <HouseListItem house={house} />}
                    <div className={stylesHouseList.toolBox}>
                        <Link to={'/user?id=' + house.user.id} className={stylesHouseList.toolBoxHeader}>
                            <div className={stylesHouseList.profile} style={{ backgroundImage: 'url(' + house.user.profileUrl + ')' }}>
                            </div>
                            <div className={stylesHouseList.agency}>
                                <div className={stylesHouseList.authorName}>{house.user.name}</div>
                            </div>
                        </Link>
                        <div className={stylesHouseList.toolBoxBody}>
                            { house.isAccepted ? (
                                <Link to={'/chat?uId=' + house.user.id} className={stylesHouseList.btnActive + ' ' + styles.redBorderBtn}>
                                    <i className={'icon icon-ic_talk'}></i>대화
                                </Link>
                            ) : (
                                <div className={stylesHouseList.btnActive + ' ' + styles.grayBorderBtn} onClick={this.acceptRequest.bind(this, house)}>
                                    <i className={'icon icon-ic_check'}></i>수락
                                </div>
                            )}
                            <div className={stylesHouseList.btnCancel + ' ' + styles.grayBorderBtn} onClick={this.deleteHouse.bind(this, house)}>
                                <i className={'icon icon-ic_delete'}></i>거절
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={stylesRequest.requestContainer}>
                <InfiniteList onRef={(ref) => { this.houseList = ref; }} ListItem={houseListItem} Get={ActionRequest.getSells} GetParams={this.params} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TabSellView));
