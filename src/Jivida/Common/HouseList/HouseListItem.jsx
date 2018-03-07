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
import stylesCommon from '../../Layout/JividaLayout.css';

// Utils
import * as ConvertUtil from '../../Lib/Utils/converter';

/*
* props.selectable
* props.openNewTab
*/
class HouseListItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }
    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }
    clickHouse() {
        if (this.props.selectable) {
            this.setState({ isSelected: !this.state.isSelected });
        } else if (this.props.openNewTab) {
            window.open('/house?id=' + this.props.house.id, '_blank');
        } else {
            this.props.history.push('/house?id=' + this.props.house.id);
        }
    }
    render() {
        return (
            <div className={stylesHouseList.houseItemBox} onClick={this.clickHouse.bind(this)}>
                <div className={stylesHouseList.photo} style={{ backgroundImage: 'url(' + (this.props.house.photos && this.props.house.photos.length > 0 ? this.props.house.photos[0].url : null) + ')' }} />
                { this.props.selectable ? (
                    <div className={stylesHouseList.selectBox + ' ' + (this.state.isSelected ? stylesCommon.redBtn : null)}><i className={'icon icon-ic_check'}></i></div>
                ) : null }
                <div className={stylesHouseList.description}>
                    <div className={stylesHouseList.priceLine}>
                        <span className={stylesHouseList.type + ' ' + stylesHouseList['type' + this.props.house.dealingType]}>{ActionHouse.HOUSE_DEALING_TYPE[this.props.house.dealingType]}</span>
                        <div className={stylesHouseList.price}>
                            {ConvertUtil.convertNumber2Won(Number(this.props.house.price))}
                            {this.props.house.deposit > 0 ? ' / ' + ConvertUtil.convertNumber2Won(this.props.house.deposit) : null}
                        </div>
                    </div>
                    <div className={stylesHouseList.metaLine}>{this.props.house.city} {this.props.house.address1} / {this.props.house.area}m² ({ConvertUtil.convertm2ToPyeong(this.props.house.area)}평) / {ActionHouse.HOUSE_TYPE[this.props.house.type]}</div>
                    <div className={stylesHouseList.descLine}>{this.props.house.title}</div>
                    <div className={stylesHouseList.authorLine}>{this.props.house.agency ? this.props.house.agency.agencyName + ' - ' : null}{this.props.house.user.name}</div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(HouseListItemView))

