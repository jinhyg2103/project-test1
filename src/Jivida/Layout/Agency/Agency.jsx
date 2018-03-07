import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionUser from '../../Data/User/actions';

// Utils
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';
import * as ConvertUtil from '../../Lib/Utils/converter';

// Components
import Iframe from '../../Common/Iframe';
import HouseListItem from '../../Common/HouseList/HouseListItem';

// CSS
import styles from '../JividaLayout.css';
import stylesAgency from './Agency.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class HouseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isProcessingFavorite: false,

            from: 0,
            count: 20,
            hasMore: true,
            isLoading: false,
            houses: [],
        };
    }
    componentWillMount() {
        let params = ParseUrlParameter.parse(this.props.location.search);
        ActionUser.getUserById({ uId: params.id })
            .then((user) => {
                this.setState({
                    user: user,
                });
            })
            .catch((err) => {
                alert('존재하지 않는 중개 회원입니다.');
                this.props.history.push('/');
            });
        this.getHouses();
    }
    getHouses() {
        let params = ParseUrlParameter.parse(this.props.location.search);
        let query = {
            from: this.state.from,
            count: this.state.count,
            uIdAgency: params.id,
        };
        if (!this.state.isLoading) {
            this.setState({
                from: this.state.from + this.state.count,
                isLoading: true,
            });
            ActionHouse.getAgencyOhterHouses(query)
                .then((houses) => {
                    this.setState({
                        houses: houses,
                        isLoading: false,
                    });
                })
                .catch((err) => {
                    this.setState({
                        hasMore: false,
                        isLoading: false,
                    });
                });
        }
    }
    handleFavorite() {
        if (!this.props.author.id) {
            alert('로그인을 해주세요');
            return;
        }
        if (!this.state.isProcessingFavorite && this.state.user.id) {
            this.setState({ isProcessingFavorite: true });
            ActionUser.setFavorite({ uIdTo: this.state.user.id })
                .then((isFavorite) => {
                    let user = this.state.user;
                    user.isFavorite = isFavorite;
                    this.setState({
                        user: user,
                        isProcessingFavorite: false,
                    });
                })
                .catch((err) => {
                    alert('실패하였습니다. 다시 시도해주세요.');
                    this.setState({ isProcessingFavorite: false });
                });
        }
    }
    render() {
        let houses = this.state.houses.map((house, index) => {
            console.log(house);
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox + ' ' + stylesAgency.houseSectionBoxItem}>
                    { <HouseListItem house={house} />}
                </div>
            );
        });
        return (
            <div className={stylesAgency.agencyContainer}>
                { this.state.user.id ? (
                    <div className={'row'}>
                        <div className={stylesAgency.agencySection + ' col-md-5'}>
                            <div className={stylesAgency.agencySectionBox}>
                                <div className={stylesAgency.agencyBanner} style={{ backgroundImage: 'url(' + this.state.user.coverUrl + ')' }}>
                                    <div className={stylesAgency.agencyProfileImg} style={{ backgroundImage: 'url(' + this.state.user.profileUrl + ')' }} ></div>
                                </div>
                                <div className={stylesAgency.agencyName}>{this.state.user.agency.agencyName}</div>
                                <div className={stylesAgency.name}>{this.state.user.name}</div>
                                <div className={stylesAgency.ceoName}>대표 : {this.state.user.agency.ceoName}</div>
                                <div className={stylesAgency.phoneNumber}>대표 전화 : 0{this.state.user.agency.phoneNumber}</div>
                                <div className={stylesAgency.address}>{this.state.user.agency.addressFull}</div>
                                { this.state.user.id != this.props.author.id ? (
                                    <div>
                                        { this.state.user.isFavorite
                                            ? <div className={stylesAgency.favoriteBtn + ' ' + stylesAgency.active} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_full'}></i> 중개 회원 즐겨찾기</div>
                                            : <div className={stylesAgency.favoriteBtn} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_line'}></i> 중개 회원 즐겨찾기</div>
                                        }
                                    </div>
                                ) : null}
                            </div>
                            <div className={stylesAgency.agencySectionBox}>
                                <div className={stylesAgency.agencySectionBoxTitle}>
                                    위치
                                </div>
                                <div className={stylesAgency.locationMap}>
                                    <Iframe
                                        width={'100%'}
                                        height={'450px'}
                                        position={'relative'}
                                        url={'https://www.google.com/maps/embed/v1/place?key=AIzaSyBrX5inDtBtnJIYbhJ2eTkWNuYhc7yiigE&q=' + this.state.user.agency.addressFull.split('(')[0].split(',')[0] + '&language=ko'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={stylesAgency.houseSection + ' col-md-7'}>
                            <div className={stylesAgency.houseSectionBox}>
                                <div className={stylesAgency.houseSectionBoxTitle}>
                                    해당 중개 회원의 보유 매물
                                </div>
                                <InfiniteScroll loadMore={this.getHouses.bind(this)} initialLoad={false} hasMore={this.state.hasMore} useWindow={false}>
                                    {houses}
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                ) : null }
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HouseView));

