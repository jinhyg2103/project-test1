import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Common/ImageList.css';

/*
* this.props.listItem
*/
class Market extends React.Component {
    render() {
        return (
            <div className={styles.fundingMarketBody}>
                <div className={styles.fundingMarketArtist}>{this.props.listItem.name}</div>
                <div className={styles.fundingMarketTitle}>{this.props.listItem.title}</div>
                <div className={styles.marketBox}>
                    <div className={styles.marketPrice}><div />{this.props.listItem.price}</div>
                    {this.props.listItem.left < 10 ? <div className={styles.marketOption}><span>  |  </span><span>{this.props.listItem.left}개</span> 남음</div> : null}
                </div>
            </div>
        );//*상품이 일정수량 이하 남으면 화면에 보여줌 *//
    }
}
export default connect()(withRouter(Market));
