import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionInquiry from '../../Data/Inquiry/actions';

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
            house: {},
            otherHouses: [],
            isProcessingFavorite: false,
            isProcessingInquiry: false,

            showOption: false,
        };
    }
    componentWillMount() {
        this.refresh();
    }
    // 해당 중개사의 다른 매물 업데이트 하기 위해서 씀
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.refresh(nextProps);
        }
    }

    refresh(props) {
        let params;
        if (props) {
            params = ParseUrlParameter.parse(props.location.search);
        } else {
            params = ParseUrlParameter.parse(this.props.location.search);
        }
        ActionHouse.getHouseById({ hId: params.id })
            .then((house) => {
                this.setState({
                    house: house,
                });
                setTimeout(() => {
                    let mySwiper = new Swiper('#photoSwiper', {
                        loop: true,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 30,
                        centeredSlides: true,
                    });
                }, 200);

                // 중개사의 다른 매물 불러오기
                ActionHouse.getAgencyOhterHouses({
                    from: 0,
                    count: 10,
                    uIdAgency: house.uId,
                    hId: house.id,
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
    handleInquiry() {
        if (!this.props.author.id) {
            alert('로그인을 해주세요');
            return;
        }
        if (!this.state.isProcessingInquiry && this.state.house.id) {
            this.setState({ isProcessingInquiry: true });
            ActionInquiry.createInquiry({
                hId: this.state.house.id,
                uIdAgency: this.state.house.user.id,
                aId: this.state.house.agency.id,
            }).then((isInquiry) => {
                alert('문의하였습니다.');
                this.setState({ isProcessingInquiry: false });
            }).catch((err) => {
                alert('실패하였습니다. 다시 시도해주세요.');
                this.setState({ isProcessingInquiry: false });
            });
        }
    }
    showOptionTable() {
        this.setState({
            showOption: true,
        });
    }
    render() {
        let photos = () => {
            if (this.state.house.photos) {
                return this.state.house.photos.map((image, index) => {
                    return (
                        <div key={index} className={'swiper-slide'}>
                            <img src={image.url.replace('original', '640x470')} />
                        </div>
                    );
                });
            } else {
                return null;
            }
        };
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
                if (this.state.house.options && this.state.house.options.length > 0) {
                    this.state.house.options.sort((a, b) => {
                        return a - b;
                    });
                }
                return ActionHouse.HOUSE_OPTION_ARRAY.map((option, index) => {
                    if (this.state.house.options && this.state.house.options.length > 0) {
                        if (Number(this.state.house.options[count]) == Number(option.value)) {
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
                        <th className={stylesHouse.infoTableThName}>가격정보</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>
                            {ConvertUtil.convertNumber2Won(this.state.house.price)}
                            {this.state.house.deposit > 0 ? ' / 보증금 ' + ConvertUtil.convertNumber2Won(this.state.house.deposit) : null}
                        </th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.house.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.house.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.house.type]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.area == null ? '-' : this.state.house.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.area) + '평' }) / { this.state.house.areaForExclusiveUse == null ? '-' : this.state.house.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>방 개수</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.room == null ? '-' : ActionHouse.HOUSE_ROOM[this.state.house.room] }</th>
                        <th className={stylesHouse.infoTableThName}>주차장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.parkingLot == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.house.parkingLot] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>화장실</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.bathroom == null ? '-' : ActionHouse.HOUSE_BATHROOM[this.state.house.bathroom] }</th>
                        <th className={stylesHouse.infoTableThName}>방향</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.direction == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.house.direction] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>베란다<br />확장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.verandaExtension == null ? '-' : ActionHouse.HOUSE_VERANDA_EXTENSION[this.state.house.verandaExtension] }</th>
                        <th className={stylesHouse.infoTableThName}>배치 구조</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.bay == null ? '-' : ActionHouse.HOUSE_BAY[this.state.house.bay] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>승강기</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.elevator == null ? '-' : ActionHouse.HOUSE_ELEVATOR[this.state.house.elevator] }</th>
                        <th className={stylesHouse.infoTableThName}>현관 구조</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.entrance == null ? '-' : ActionHouse.HOUSE_ENTRANCE[this.state.house.entrance] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>보일러</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.boiler == null ? '-' : ActionHouse.HOUSE_BOILER[this.state.house.boiler] }</th>
                        <th className={stylesHouse.infoTableThName}>인테리어</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.interior == null ? '-' : ActionHouse.HOUSE_INTERIOR[this.state.house.interior] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도배 여부</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.paper == null ? '-' : ActionHouse.HOUSE_PAPER[this.state.house.paper] }</th>
                        <th className={stylesHouse.infoTableThName}>장판 여부</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.floor == null ? '-' : ActionHouse.HOUSE_FLOOR[this.state.house.floor] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>옵션</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{houseOptions()}</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>상세설명</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue + ' ' + stylesHouse.textArea}>
                            { this.state.house.description == null ? '-' : this.state.house.description }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.createdAt == null ? '-' : DateUtil.format('llll', this.state.house.createdAt) }</th>
                    </tr>
                </table>
            );
        };
        let infoTableNonResidence = () => {
            return (
                <table className={stylesHouse.infoTable}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>가격정보</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>{ConvertUtil.convertNumber2Won(this.state.house.price)}</th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.house.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.house.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.house.type]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.area == null ? '-' : this.state.house.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.area) + '평' }) / { this.state.house.areaForExclusiveUse == null ? '-' : this.state.house.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />상태</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.roadType == null ? '-' : ActionHouse.HOUSE_ROAD_TYPE[this.state.house.roadType]}</th>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />폭</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.roadWidth == null ? '-' : ActionHouse.HOUSE_ROAD_WIDTH[this.state.house.roadWidth] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>간판 설치</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.signboard == null ? '-' : ActionHouse.HOUSE_SIGNBOARD[this.state.house.signboard] }</th>
                        <th className={stylesHouse.infoTableThName}>베란다·<br />테라스</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.veranda == null ? '-' : ActionHouse.HOUSE_VERANDA[this.state.house.veranda] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>대지 지분</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.landShare == null ? '-' : this.state.house.landShare + 'm² (' + ConvertUtil.convertm2ToPyeong(this.state.house.landShare) + '평)' }</th>
                        <th className={stylesHouse.infoTableThName}>인테리어</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.interior == null ? '-' : ActionHouse.HOUSE_INTERIOR[this.state.house.interior] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>주차장</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.parkingLot == null ? '-' : ActionHouse.HOUSE_PARKING_LOT[this.state.house.parkingLot] }</th>
                        <th className={stylesHouse.infoTableThName}>승강기</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.elevator == null ? '-' : ActionHouse.HOUSE_ELEVATOR[this.state.house.elevator] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>건축물<br />대장 용도</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.buildingUsedFor == null ? '-' : this.state.house.buildingUsedFor }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>상세설명</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.description == null ? '-' : this.state.house.description }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.createdAt == null ? '-' : DateUtil.format('llll', this.state.house.createdAt) }</th>
                    </tr>
                </table>
            );
        }
        let infoTableLand = () => {
            return (
                <table className={stylesHouse.infoTable}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>가격정보</th>
                        <th className={stylesHouse.infoTableThValue + ' ' + stylesHouse.priceNumber}>{ConvertUtil.convertNumber2Won(this.state.house.price)}</th>
                        <th className={stylesHouse.infoTableThName}>거래방식</th>
                        <th className={stylesHouse.infoTableThValue}><span className={stylesHouse.type + ' ' + stylesHouse['type' + this.state.house.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.state.house.dealingType]}</span></th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>매물유형</th>
                        <th className={stylesHouse.infoTableThValue}>{ActionHouse.HOUSE_TYPE[this.state.house.type]}</th>
                        <th className={stylesHouse.infoTableThName}>면적</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.area == null ? '-' : this.state.house.area + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.area) + '평' }) / { this.state.house.areaForExclusiveUse == null ? '-' : this.state.house.areaForExclusiveUse + 'm²(' + ConvertUtil.convertm2ToPyeong(this.state.house.areaForExclusiveUse) + '평)' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도로 접함</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.roadType == null ? '-' : ActionHouse.HOUSE_ROAD_TYPE[this.state.house.roadType] }</th>
                        <th className={stylesHouse.infoTableThName}>접한 도로<br />폭</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.roadWidth == null ? '-' : ActionHouse.HOUSE_ROAD_WIDTH[this.state.house.roadWidth] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>도로 접한<br />길이</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.roadLength == null ? '-' : ActionHouse.HOUSE_ROAD_LENGTH[this.state.house.roadLength] }</th>
                        <th className={stylesHouse.infoTableThName}>토지 모양</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.landShape == null ? '-' : ActionHouse.HOUSE_LAND_SHAPE[this.state.house.landShape] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>지목</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.landCategory == null ? '-' : this.state.house.landCategory }</th>
                        <th className={stylesHouse.infoTableThName}>용도 지역</th>
                        <th className={stylesHouse.infoTableThValue}>
                            { this.state.house.landUsedFor == null ? '-' : ActionHouse.HOUSE_LAND_USED_FOR[this.state.house.landUsedFor] }
                            { this.state.house.landUsedFor == 5 && (this.state.house.landUsedForValue == null || this.state.house.landUsedForValue == '') ? '-' : this.state.house.landUsedForValue }
                        </th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>용적률</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.floorAreaRatio == null ? '-' : this.state.house.floorAreaRatio + '%' }</th>
                        <th className={stylesHouse.infoTableThName}>건폐율</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.buildingRatio == null ? '-' : this.state.house.buildingRatio + '%' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>토지 내<br />분묘</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.grave == null ? '-' : ActionHouse.HOUSE_GRAVE[this.state.house.grave] }</th>
                        <th className={stylesHouse.infoTableThName}>분묘기지권</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.graveMove == null ? '-' : ActionHouse.HOUSE_GRAVE_MOVE[this.state.house.graveMove] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>상세설명</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.description == null ? '-' : this.state.house.description }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>등록일시</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.createdAt == null ? '-' : DateUtil.format('llll', this.state.house.createdAt) }</th>
                    </tr>
                </table>
            );
        }
        let showBtn = () => {
            return (
                <div className={stylesHouse.btnBox}>
                    <button className={styles.grayBorderBtn + ' ' + stylesHouse.btnActive} onClick={this.showOptionTable.bind(this)}>더보기</button>
                </div>
            );
        }
        let infoTableOption = () => {
            return (
                <table className={stylesHouse.infoTable + ' ' + stylesHouse.infoTableOption}>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>소유</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.owners == null ? '-' : ActionHouse.HOUSE_OWNERS[this.state.house.owners] }</th>
                        <th className={stylesHouse.infoTableThName}>권리관계</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.relationOfRights == null ? '-' : ActionHouse.HOUSE_RELATION_OF_RIGHTS[this.state.house.relationOfRights] }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>선순위 대출 금액</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.loan == null ? '-' : ActionHouse.HOUSE_LOAN[this.state.house.loan] } / { this.state.house.loan == null || this.state.house.loan == 1 || this.state.house.loanValue == null ? '-' : ConvertUtil.convertNumber2Won(this.state.house.loanValue) + '원' }</th>
                        <th className={stylesHouse.infoTableThName}>관리비</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.managementCost == null ? '-' : ActionHouse.HOUSE_MANAGEMENT_COST[this.state.house.managementCost] } / { this.state.house.managementCost == null || this.state.house.managementCost == 1 || this.state.house.managementCostValue == null ? '-' : ConvertUtil.convertNumber2Won(this.state.house.managementCostValue) + '원' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>관리 업체</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.managementCompany == null ? '-' : ActionHouse.HOUSE_MANAGEMENT_COMPANY[this.state.house.managementCompany] }</th>
                        <th className={stylesHouse.infoTableThName}>준공년도</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.builtYear == null ? '-' : this.state.house.builtYear + '년' }</th>
                    </tr>
                    <tr className={stylesHouse.infoTableTr}>
                        <th className={stylesHouse.infoTableThName}>시공사</th>
                        <th colSpan="3" className={stylesHouse.infoTableThValue}>{ this.state.house.builtBy == null ? '-' : this.state.house.builtBy }</th>
{/*                        <th className={stylesHouse.infoTableThName}>지하철</th>
                        <th className={stylesHouse.infoTableThValue}>{ this.state.house.subway == null ? '-' : ActionHouse.HOUSE_SUBWAY[this.state.house.subway] }</th>*/}
                    </tr>
                </table>
            );
        }
        return (
            <div className={stylesHouse.houseContainer}>
                { this.state.house.id ? (
                    <div className={'row'}>
                        <div className={stylesHouse.houseSection + ' col-md-8'}>
                            <div className={stylesHouse.houseSectionBox}>
                                <div id={'photoSwiper'} className={stylesHouse.photoBox}>
                                    <div className={'swiper-wrapper'}>
                                        {photos()}
                                    </div>
                                    <div className={stylesHouse.underBox}></div>
                                    <div className={'swiper-pagination swiper-pagination-white'}></div>
                                    <div className={'swiper-button-next swiper-button-black'}></div>
                                    <div className={'swiper-button-prev swiper-button-black'}></div>
                                    <div className={stylesHouse.houseId}>매물번호: {this.state.house.id}</div>
                                </div>
                                <div className={stylesHouse.titleBox}>
                                    <div className={stylesHouse.title}>{this.state.house.title}</div>
                                    <div className={stylesHouse.address}>{this.state.house.addressFull}</div>
                                </div>
                                <div className={stylesHouse.infoBox}>
                                    { this.state.house.type >= 1 && this.state.house.type <= 10 ? infoTableResidence() : null }
                                    { this.state.house.type >= 11 && this.state.house.type <= 15 ? infoTableNonResidence() : null }
                                    { this.state.house.type == 16 ? infoTableLand() : null }
                                    { this.state.showOption ? infoTableOption() : showBtn() }
                                </div>
                            </div>
                            <div className={stylesHouse.houseSectionBox}>
                                <div className={stylesHouse.houseSectionBoxTitle}>
                                    위치
                                </div>
                                <div className={stylesHouse.locationMap}>
                                    <Iframe
                                        width={'100%'}
                                        height={'450px'}
                                        position={'relative'}
                                        url={'https://www.google.com/maps/embed/v1/place?key=AIzaSyBrX5inDtBtnJIYbhJ2eTkWNuYhc7yiigE&q=' + this.state.house.addressFull.split('(')[0].split(',')[0] + '&language=ko'}
                                    />
                                </div>
                            </div>
                        </div>
                        { this.state.house.agency ? (
                            <div className={stylesHouse.agencySection + ' col-md-4'}>
                                <div className={stylesHouse.agencySectionBox}>
                                    <div className={stylesHouse.agencyBanner} style={{ backgroundImage: 'url(' + this.state.house.user.coverUrl + ')' }}>
                                        <Link to={'/agency?id=' + this.state.house.uId} className={stylesHouse.agencyProfileImg} style={{ backgroundImage: 'url(' + this.state.house.user.profileUrl + ')' }} ></Link>
                                    </div>
                                    <Link to={'/agency?id=' + this.state.house.uId} className={stylesHouse.agencyName}>{this.state.house.agency.agencyName}</Link>
                                    <Link to={'/agency?id=' + this.state.house.uId} className={stylesHouse.name}>{this.state.house.user.name}</Link>
                                    <div className={stylesHouse.ceoName}>대표 : {this.state.house.agency.ceoName}</div>
                                    <div className={stylesHouse.phoneNumber}>대표 전화 : {this.state.house.agency.phoneNumber}</div>
                                    <div className={stylesHouse.address}>{this.state.house.agency.state} {this.state.house.agency.city} {this.state.house.agency.address1}</div>
                                    { this.state.house.user.id != this.props.author.id && this.props.author.type != 2 ? (<div className={stylesHouse.inquiryBtn} onClick={this.handleInquiry.bind(this)}>집 문의하기</div>) : null}
                                    { this.state.house.user.id != this.props.author.id ? (<div className={stylesHouse.inquiryDesc}>중개 회원에게 해당 집에 대해 직접 문의합니다.</div>) : null}
                                    { this.state.house.user.id != this.props.author.id ? (
                                        <div>
                                            { this.state.house.isFavorite
                                                ? <div className={stylesHouse.favoriteBtn + ' ' + stylesHouse.active} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_full'}></i> 집 즐겨찾기</div>
                                                : <div className={stylesHouse.favoriteBtn} onClick={this.handleFavorite.bind(this)}><i className={'icon icon-ic_favorite_line'}></i> 집 즐겨찾기</div>
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                {
                                    this.state.otherHouses ? (
                                        <div className={stylesHouse.agencySectionBox}>
                                            <div className={stylesHouse.agencySectionBoxTitle}>
                                                해당 중개 회원의 다른 매물
                                            </div>
                                            {agencyOtherHouses}
                                        </div>
                                    ) : null
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

