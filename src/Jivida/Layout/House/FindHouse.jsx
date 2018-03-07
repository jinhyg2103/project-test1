import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionRequest from '../../Data/Request/actions';

// Utils
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';
import * as ConvertUtil from '../../Lib/Utils/converter';
import * as DateUtil from '../../Lib/Utils/date';


// Components
import Iframe from '../../Common/Iframe';
import HouseListItem from '../../Common/HouseList/HouseListItem';

// CSS
import styles from '../JividaLayout.css';
import stylesHouse from './House.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';

class HouseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {},
            otherHouses: [],

            showOption: false,
        };
    }
    componentWillMount() {
        let params = ParseUrlParameter.parse(this.props.location.search);
        this.props.dispatch(ActionRequest.getFindHouseById({ rfhId: params.id }))
            .then((request) => {
                this.setState({
                    request: request,
                });

                // 중개사의 다른 매물 불러오기
                ActionHouse.getAgencyOhterHouses({
                    from: 0,
                    count: 10,
                    uIdAgency: request.uId,
                    hId: request.id,
                })
                    .then((otherHouses) => {
                        this.setState({
                            otherHouses: otherHouses,
                        });
                    });
            })
            .catch((err) => {
                // 에러가 났으니 뒤로 보내야함
                alert('존재하지 않는 매물입니다.');
                this.props.history.push('/');
            });
    }
    showOptionTable() {
        this.setState({
            showOption: true,
        });
    }
    handleFavorite() {
        if (!this.props.author.id) {
            alert('로그인을 해주세요');
            return;
        }
        if (!this.state.isProcessingFavorite && this.state.house.id) {
            this.setState({ isProcessingFavorite: true });
            ActionHouse.setFavorite({ hId: this.state.house.id })
                .then((isFavorite) => {
                    let house = this.state.house;
                    house.isFavorite = isFavorite;
                    this.setState({
                        house: house,
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
        let agencyOtherHouses = this.state.otherHouses.map((house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox + ' ' + stylesHouse.otherHousesItem}>
                    { <HouseListItem house={house} />}
                </div>
            );
        });
        let houseOptions = () => {
            if (ActionHouse.HOUSE_OPTION_ARRAY) {
                let count = 0;
                if (this.state.request.options && this.state.request.options.length > 0) {
                    this.state.request.options.sort((a, b) => {
                        return a - b;
                    });
                }
                return ActionHouse.HOUSE_OPTION_ARRAY.map((option, index) => {
                    if (this.state.request.options && this.state.request.options.length > 0) {
                        if (Number(this.state.request.options[count]) == Number(option.value)) {
                            count += 1;
                            return (
                                <span key={index} className={stylesHouse.checkBox}><input type={'checkbox'} checked disabled /> {option.label}</span>
                            );
                        } else {
                            return (
                                <span key={index} className={stylesHouse.checkBox}><input type={'checkbox'} disabled /> {option.label}</span>
                            );
                        }
                    } else {
                        return (
                            <span key={index} className={stylesHouse.checkBox}><input type={'checkbox'} disabled /> {option.label}</span>
                        );
                    }
                });
            } else {
                return null;
            }
        }
        let infoTableResidence = () => {
            return (
                <table className={stylesHouse.infoTable}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>(최대) 금액</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>
                            {ConvertUtil.convertNumber2Won(this.state.request.price)}
                            {this.state.request.deposit > 0 ? ' / 보증금 ' + ConvertUtil.convertNumber2Won(this.state.request.deposit) : null}
                        </th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.request.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.request.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.request.houseType]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.area == null ? '-' : this.state.request.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.area) + '평' }) ~ { this.state.request.areaForExclusiveUse == null ? '-' : this.state.request.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    {/*<tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>방 개수</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.room == null ? '-' : ActionHouse.HOUSE_ROOM[this.state.request.room] }</th>
                        <th className={stylesHouse.infoTableThName}>주차장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.parkingLot == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.request.parkingLot] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>화장실</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.bathroom == null ? '-' : ActionHouse.HOUSE_BATHROOM[this.state.request.bathroom] }</th>
                        <th className={stylesHouse.infoTableThName}>방향</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.direction == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.request.direction] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>베란다<br />확장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.verandaExtension == null ? '-' : ActionHouse.HOUSE_VERANDA_EXTENSION[this.state.request.verandaExtension] }</th>
                        <th className={stylesHouse.infoTableThName}>배치 구조</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.bay == null ? '-' : ActionHouse.HOUSE_BAY[this.state.request.bay] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>승강기</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.elevator == null ? '-' : ActionHouse.HOUSE_ELEVATOR[this.state.request.elevator] }</th>
                        <th className={stylesHouse.infoTableThName}>현관 구조</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.entrance == null ? '-' : ActionHouse.HOUSE_ENTRANCE[this.state.request.entrance] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>보일러</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.boiler == null ? '-' : ActionHouse.HOUSE_BOILER[this.state.request.boiler] }</th>
                        <th className={stylesHouse.infoTableThName}>인테리어</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.interior == null ? '-' : ActionHouse.HOUSE_INTERIOR[this.state.request.interior] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도배 여부</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.paper == null ? '-' : ActionHouse.HOUSE_PAPER[this.state.request.paper] }</th>
                        <th className={stylesHouse.infoTableThName}>장판 여부</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.floor == null ? '-' : ActionHouse.HOUSE_FLOOR[this.state.request.floor] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>옵션</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{houseOptions()}</th>
                    </tr>*/}
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName + ' ' + stylesHouse.textArea}>희망사항</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue + ' ' + stylesHouse.textArea}>{ this.state.request.memo == null ? '-' : this.state.request.memo }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.createdAt == null ? '-' : DateUtil.format('llll', this.state.request.createdAt) }</th>
                    </tr>
                </table>
            );
        };
        /*let infoTableNonResidence = () => {
            return (
                <table className={stylesHouse.infoTable}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>가격정보</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>{ConvertUtil.convertNumber2Won(this.state.request.price)}</th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.request.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.request.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.request.houseType]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.area == null ? '-' : this.state.request.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.area) + '평' }) / { this.state.request.areaForExclusiveUse == null ? '-' : this.state.request.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />상태</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.roadType == null ? '-' : ActionHouse.HOUSE_ROAD_TYPE[this.state.request.roadType]}</th>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />폭</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.roadWidth == null ? '-' : ActionHouse.HOUSE_ROAD_WIDTH[this.state.request.roadWidth] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>간판 설치</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.signboard == null ? '-' : ActionHouse.HOUSE_SIGNBOARD[this.state.request.signboard] }</th>
                        <th className={stylesHouse.infoTableThName}>베란다·<br />테라스</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.veranda == null ? '-' : ActionHouse.HOUSE_VERANDA[this.state.request.veranda] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>대지 지분</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.landShare == null ? '-' : this.state.request.landShare + 'm² (' + ConvertUtil.convertm2ToPyeong(this.state.request.landShare) + '평)' }</th>
                        <th className={stylesHouse.infoTableThName}>인테리어</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.interior == null ? '-' : ActionHouse.HOUSE_INTERIOR[this.state.request.interior] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>주차장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.parkingLot == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.request.parkingLot] }</th>
                        <th className={stylesHouse.infoTableThName}>승강기</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.elevator == null ? '-' : ActionHouse.HOUSE_ELEVATOR[this.state.request.elevator] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>건축물<br />대장 용도</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.buildingUsedFor == null ? '-' : this.state.request.buildingUsedFor }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>희망사항</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.memo == null ? '-' : this.state.request.memo }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.createdAt == null ? '-' : DateUtil.format('llll', this.state.request.createdAt) }</th>
                    </tr>
                </table>
            );
        }
        let infoTableLand = () => {
            return (
                <table className={stylesHouse.infoTable}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>가격정보</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>{ConvertUtil.convertNumber2Won(this.state.request.price)}</th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.request.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.request.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.request.houseType]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.area == null ? '-' : this.state.request.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.area) + '평' }) / { this.state.request.areaForExclusiveUse == null ? '-' : this.state.request.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.request.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도로 접함</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.roadType == null ? '-' : ActionHouse.HOUSE_ROAD_TYPE[this.state.request.roadType] }</th>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />폭</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.roadWidth == null ? '-' : ActionHouse.HOUSE_ROAD_WIDTH[this.state.request.roadWidth] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도로 접한<br />길이</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.roadLength == null ? '-' : ActionHouse.HOUSE_ROAD_LENGTH[this.state.request.roadLength] }</th>
                        <th className={stylesHouse.infoTableThName}>토지 모양</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.landShape == null ? '-' : ActionHouse.HOUSE_LAND_SHAPE[this.state.request.landShape] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>지목</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.landCategory == null ? '-' : this.state.request.landCategory }</th>
                        <th className={stylesHouse.infoTableThName}>용도 지역</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.landUsedFor == null ? '-' : ActionHouse.HOUSE_LAND_USED_FOR[this.state.request.landUsedFor] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>용적률</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.floorAreaRatio == null ? '-' : this.state.request.floorAreaRatio + '%' }</th>
                        <th className={stylesHouse.infoTableThName}>건폐율</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.buildingRatio == null ? '-' : this.state.request.buildingRatio + '%' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>토지 내<br />분묘</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.grave == null ? '-' : ActionHouse.HOUSE_GRAVE[this.state.request.grave] }</th>
                        <th className={stylesHouse.infoTableThName}>분묘기지권</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.graveMove == null ? '-' : ActionHouse.HOUSE_GRAVE_MOVE[this.state.request.graveMove] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>희망사항</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.memo == null ? '-' : this.state.request.memo }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.createdAt == null ? '-' : DateUtil.format('llll', this.state.request.createdAt) }</th>
                    </tr>
                </table>
            );
        }
/!*        let showBtn = () => {
            return (
                <div className={stylesHouse.btnBox}>
                    <button className={styles.grayBorderBtn + ' ' + stylesHouse.btnActive} onClick={this.showOptionTable.bind(this)}>더보기</button>
                </div>
            );
        }*!/
        let infoTableOption = () => {
            return (
                <table className={stylesHouse.infoTable + ' ' + stylesHouse.infoTableOption}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>소유</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.owners == null ? '-' : ActionHouse.HOUSE_OWNERS[this.state.request.owners] }</th>
                        <th className={stylesHouse.infoTableThName}>권리관계</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.relationOfRights == null ? '-' : ActionHouse.HOUSE_RELATION_OF_RIGHTS[this.state.request.relationOfRights] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>선순위 대출 금액</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.loan == null ? '-' : ActionHouse.HOUSE_LOAN[this.state.request.loan] } / { this.state.request.loan == null || this.state.request.loan == 1 || this.state.request.loanValue == null ? '-' : ConvertUtil.convertNumber2Won(this.state.request.loanValue) + '원' }</th>
                        <th className={stylesHouse.infoTableThName}>관리비</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.managementCost == null ? '-' : ActionHouse.HOUSE_MANAGEMENT_COST[this.state.request.managementCost] } / { this.state.request.managementCost == null || this.state.request.managementCost == 1 || this.state.request.managementCostValue == null ? '-' : ConvertUtil.convertNumber2Won(this.state.request.managementCostValue) + '원' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>관리 업체</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.managementCompany == null ? '-' : ActionHouse.HOUSE_MANAGEMENT_COMPANY[this.state.request.managementCompany] }</th>
                        <th className={stylesHouse.infoTableThName}>준공년도</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.builtYear == null ? '-' : this.state.request.builtYear + '년' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>시공사</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.request.builtBy == null ? '-' : this.state.request.builtBy }</th>
                        {/!*                        <th className={stylesHouse.infoTableThName}>지하철</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.request.subway == null ? '-' : ActionHouse.HOUSE_SUBWAY[this.state.request.subway] }</th>*!/}
                    </tr>
                </table>
            );
        }*/
        return (
            <div className={stylesHouse.houseContainer}>
                { this.state.request.id ? (
                    <div className={'row'}>
                        <div className={stylesHouse.houseSection + ' col-md-8'}>
                            <div className={stylesHouse.houseSectionBox}>
                                <div className={stylesHouse.titleBox}>
                                    <div className={stylesHouse.subtitle}>{ this.state.request.agency ? '공동중개 요청사항' : '집 찾기 요청사항' }</div>
                                </div>
                                <div className={stylesHouse.infoBox}>
                                    {infoTableResidence()}
                                    {/*{ this.state.request.houseType >= 1 && this.state.request.houseType <= 10 ? infoTableResidence() : null }
                                    { this.state.request.houseType >= 11 && this.state.request.houseType <= 15 ? infoTableNonResidence() : null }
                                    { this.state.request.houseType == 16 ? infoTableLand() : null }*/}
                                    {/*{ this.state.showOption ? infoTableOption() : showBtn() }*/}
                                </div>
                            </div>
                        </div>
                        { this.state.request.agency ? (
                            <div className={stylesHouse.agencySection + ' col-md-4'}>
                                <div className={stylesHouse.agencySectionBox}>
                                    <div className={stylesHouse.agencyBanner} style={{ backgroundImage: 'url(' + this.state.request.user.coverUrl + ')' }}>
                                        <Link to={'/agency?id=' + this.state.request.uId} className={stylesHouse.agencyProfileImg} style={{ backgroundImage: 'url(' + this.state.request.user.profileUrl + ')' }} ></Link>
                                    </div>
                                    <Link to={'/agency?id=' + this.state.request.uId} className={stylesHouse.agencyName}>{this.state.request.agency.agencyName}</Link>
                                    <Link to={'/agency?id=' + this.state.request.uId} className={stylesHouse.name}>{this.state.request.user.name}</Link>
                                    <div className={stylesHouse.ceoName}>대표 : {this.state.request.agency.ceoName}</div>
                                    <div className={stylesHouse.phoneNumber}>대표 전화 : {this.state.request.agency.phoneNumber}</div>
                                    <div className={stylesHouse.address}>{this.state.request.agency.state} {this.state.request.agency.city} {this.state.request.agency.address1}</div>
                                    { this.state.request.user.id != this.props.author.id && this.props.author.type != 2 ? (<div className={stylesHouse.inquiryBtn} onClick={this.houseInquiry.bind(this)}>집 문의하기</div>) : null}
                                    { this.state.request.user.id != this.props.author.id ? (<div className={stylesHouse.inquiryDesc}>중개 회원에게 해당 집에 대해 직접 문의합니다.</div>) : null}
                                    { this.state.request.user.id != this.props.author.id ? (
                                        <div>
                                            { this.state.request.isFavorite
                                                ? <div className={stylesHouse.favoriteBtn + ' ' + stylesHouse.active} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_full'}></i> 집 즐겨찾기</div>
                                                : <div className={stylesHouse.favoriteBtn} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_line'}></i> 집 즐겨찾기</div>
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                {
                                    this.state.otherHouses
                                        ? (
                                            <div className={stylesHouse.agencySectionBox}>
                                                <div className={stylesHouse.agencySectionBoxTitle}>
                                                    해당 중개 회원의 다른 매물
                                                </div>
                                                {agencyOtherHouses}
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        ) : (
                            null
                        )}
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

