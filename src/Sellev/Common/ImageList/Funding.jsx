import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Common/ImageList.css';

// Util
import * as NumberUtil from '../../Lib/Utils/converter'

/*
* this.props.listItem
*/
class FundingMarket extends React.Component {
    render() {
        return (
            <div className={styles.fundingMarketBody}>
                <div className={styles.fundingMarketArtist}>{this.props.listItem.name}</div>
                <div className={styles.fundingMarketTitle}>{this.props.listItem.title}</div>
                <div className={styles.fundSlidBar}>{this.props.listItem.percentOfFund}%</div>
                <div className={styles.fundBox}>
                    <div className={styles.fundPercent}>
                        <div>{this.props.listItem.percentOfFund}%</div>
                        <div>펀딩율</div>
                    </div>
                    <div className={styles.fundAttendant}>
                        <div>{this.props.listItem.attendant}</div>
                        <div>참여수</div>
                    </div>
                    <div className={styles.left}>
                        <div>{this.props.listItem.left}</div>
                        <div>남은일</div>
                    </div>
                    <div className={styles.goal}>
                        <div>{this.props.listItem.goal}<span>만원</span></div>
                        <div>펀딩목표액</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(FundingMarket));
