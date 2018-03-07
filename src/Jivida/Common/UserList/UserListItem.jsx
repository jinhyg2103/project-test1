import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import * as ActionHouse from '../../Data/House/actions';

// Styles
import stylesCommon from '../../Layout/JividaLayout.css';
import stylesUserList from './UserList.css';

// Utils
import * as ConvertUtil from '../../Lib/Utils/converter';

/*
* props.selectable
* props.isSelected
* props.user
*/
class UserListItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected || false,
        };
    }
    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }
    clickUser() {
        if (this.props.selectable) {
            this.setState({ isSelected: !this.state.isSelected });
        } else {
            if (this.props.user.type == 2) {
                this.props.history.push('/agency?id=' + this.props.user.id);
            } else {
                this.props.history.push('/user?id=' + this.props.user.id);
            }
        }
    }
    render() {
        return (
            <div className={stylesUserList.userItemBox} onClick={this.clickUser.bind(this)}>
                <div className={stylesUserList.profileImg} style={{ backgroundImage: 'url(' + (this.props.user.profileUrl) + ')' }} />
                { this.props.selectable ? (
                    <div className={stylesUserList.selectBox + ' ' + (this.state.isSelected ? stylesCommon.redBtn : null)}><i className={'icon icon-ic_check'}></i></div>
                ) : null }
                { this.props.user.type == 1 ? (
                    <div className={stylesUserList.meta}>
                        <div className={stylesUserList.userName}>{this.props.user.name}</div>
                    </div>
                ) : (
                    <div className={stylesUserList.meta}>
                        <div className={stylesUserList.agencyName}>{this.props.user.agency.agencyName} {this.props.user.name}</div>
                        <div className={stylesUserList.agencyAddress}>{this.props.user.agency.addressFull}</div>
                    </div>
                )}
            </div>
        );
    }
}
/* 복붙하면 바로 작동하는 코드이다. 아직은 개발하지 않겠음
{ this.props.user.isFavorite ? (
                    <div className={stylesUserList.favorite + ' ' + styles.red}><i className={'icon icon-ic_favorite_full'}></i></div>
                ) : (
                    <div className={stylesUserList.favorite}><i className={'icon icon-ic_favorite_full'}></i></div>
                )}
* */
export default connect()(withRouter(UserListItemView));

