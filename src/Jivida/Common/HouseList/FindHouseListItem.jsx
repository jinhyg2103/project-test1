import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import * as ActionHouse from '../../Data/House/actions';

// Styles
import stylesHouseList from './HouseList.css';

// Utils
import * as ConvertUtil from '../../Lib/Utils/converter';

class HouseListItemView extends React.Component {
    openHouse() {
        window.open('/find/house?id=' + this.props.house.id, '_blank');
    }
    render() {
        return (
            <div className={stylesHouseList.houseItemBox} onClick={this.openHouse.bind(this)}>
                <div className={stylesHouseList.photoBig}><i className={'icon icon-ic_search_house'}></i></div>
                <div className={stylesHouseList.description}>
                    <div className={stylesHouseList.priceLine}>
                        <div className={stylesHouseList.type + ' ' + stylesHouseList['type' + this.props.house.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.props.house.dealingType]}</div>
                        <div className={stylesHouseList.price}>
                            {ConvertUtil.convertNumber2Won(this.props.house.price)}
                            {this.props.house.deposit > 0 ? ' / ' + ConvertUtil.convertNumber2Won(this.props.house.deposit) : null}
                        </div>
                    </div>
                    <div className={stylesHouseList.metaLine}>{this.props.house.city} {this.props.house.address1} / {this.props.house.area}m² ({ConvertUtil.convertm2ToPyeong(this.props.house.area)}평) / {ActionHouse.HOUSE_TYPE[this.props.house.type]}</div>
                    <div className={stylesHouseList.descLine}>{this.props.house.memo ? this.props.house.memo : '희망사항 없음'}</div>
                    <div className={stylesHouseList.authorLine}>{this.props.house.agency ? this.props.house.agency.agencyName + ' - ' : null}{this.props.house.user.name}</div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(HouseListItemView));

