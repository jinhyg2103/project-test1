import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

//Style
import stylesDetail from '../../Styles/Components/FundingMarket.css';
import styles from '../../Styles/App.css';

class DetailContentSide extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesDetail.detailContentSideBox}>
                <div className={stylesDetail.contentTitle}>펀딩을 선택해보세요</div>
                <ul className={stylesDetail.detailContentSideList}>
                    <li>
                        <div className={stylesDetail.sideSelector}><span>546명</span>이 선택</div>
                        <div className={stylesDetail.sidePrice}>11000원</div>
                        <div>
                            <div>혁오 소규모 콘서트 A석 (1매)</div>
                            <div>혁오 하늘티 (1매)</div>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>배송비</span>
                            <span>2500원</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>상품발송일</span>
                            <span>2018년 1월 초 (1~10일) 예정</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>제한수량</span>
                            <span>20개</span>
                        </div>
                    </li>
                    <li>
                        <div className={stylesDetail.sideSelector}><span>546명</span>이 선택</div>
                        <div className={stylesDetail.sidePrice}>11000원</div>
                        <div>
                            <div>혁오 소규모 콘서트 A석 (1매)</div>
                            <div>혁오 하늘티 (1매)</div>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>배송비</span>
                            <span>2500원</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>상품발송일</span>
                            <span>2018년 1월 초 (1~10일) 예정</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>제한수량</span>
                            <span>20개</span>
                        </div>
                    </li>
                    <li>
                        <div className={stylesDetail.sideSelector}><span>546명</span>이 선택</div>
                        <div className={stylesDetail.sidePrice}>11000원</div>
                        <div>
                            <div>혁오 소규모 콘서트 A석 (1매)</div>
                            <div>혁오 하늘티 (1매)</div>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>배송비</span>
                            <span>2500원</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>상품발송일</span>
                            <span>2018년 1월 초 (1~10일) 예정</span>
                        </div>
                        <div className={stylesDetail.sideInfo}>
                            <span>제한수량</span>
                            <span>20개</span>
                        </div>
                    </li>
                </ul>
                <div className={styles.btn47Black + ' ' + stylesDetail.fundingBtn}>펀딩하기</div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailContentSide));
