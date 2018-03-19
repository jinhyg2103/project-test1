import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailContent from './DetailContent';

//Style
import stylesDetail from '../../Styles/Components/FundingMarket.css';
import styles from '../../Styles/App.css';

// Actions
import * as ActionList from '../../Data/FundingMarket/action';

class DetailFunding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let fundingList = ActionList.FUNDING_MARKET_LIST[1];
        console.log(fundingList);
        return (
            <div className={stylesDetail.fundingContainer}>
                <div className={stylesDetail.fundingHeader}>
                    <div className={stylesDetail.fundingNameBox}>
                        <div className={stylesDetail.profile} style={{ backgroundImage: 'url("' + fundingList.profile + '")' }} />
                        <span>{fundingList.name}</span>
                    </div>
                    <div className={stylesDetail.fundingTitileBox}>
                        {fundingList.title}
                    </div>
                </div>
                <div className={stylesDetail.fundingBody}>
                    <div className={stylesDetail.bgImage} style={{ backgroundImage: 'url("' + fundingList.detailImage + '")' }}></div>
                    <div className={stylesDetail.fundingBox}>
                        <div className={stylesDetail.priceTitle}>
                            <div className={stylesDetail.redCircle} /><br />
                            <span>펀딩금액</span>
                        </div>
                        <div className={stylesDetail.price}><span>{fundingList.goal}</span>만원</div>
                        <div className={stylesDetail.percentage}>{fundingList.percentOfFund}%</div>
                        <div className={stylesDetail.progressBox}>
                            <div className={'progress ' + stylesDetail.progress}>
                                <div className={'progress-bar ' + stylesDetail.progressBar} style={{ width: fundingList.percentOfFund + '%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                            <div
                                className={stylesDetail.progressNum}
                                style={
                                    fundingList.percentOfFund < 25 ? { right: '84%' } : { right: (100 - fundingList.percentOfFund) + '%' }
                                }
                            >
                                {fundingList.percentOfFund}%
                            </div>
                        </div>
                        <ul className={stylesDetail.fundingOthers}>
                            <li>
                                <div>남은일</div>
                                <div>{fundingList.left}</div>
                            </li>
                            <li>
                                <div>참여수</div>
                                <div>{fundingList.attendant}명</div>
                            </li>
                        </ul>
                        <div className={stylesDetail.fundingBtnBox}>
                            <div className={styles.btn47Black + ' ' + stylesDetail.fundingBtn}>펀딩하기</div>
                            <div className={styles.btn47White + ' ' + stylesDetail.likeBtn}><div className={stylesDetail.likeImage} /><span>1284</span></div>
                        </div>
                    </div>
                </div>
                <DetailContent />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailFunding));
