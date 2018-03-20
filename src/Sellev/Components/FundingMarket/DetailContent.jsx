import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailContentSide from './DetailContentSide';
//Style
import stylesDetail from '../../Styles/Components/FundingMarket.css';

class DetailContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ul className={stylesDetail.detailContentLeft}>
                    <li>
                        <div className={stylesDetail.contentTitle}>펀딩설명</div>
                        <div>
                            대한민국 감성 R&B를 대표하는 천재뮤지션, 혁오의 연말맞이 소규모 콘서트를 통해 그와 진솔한 이야기를 나눠보세요!
                            혁오를 전혀 모른다고 해도, 아무 상관없어요. 대한민국 감성 R&B를 대표하는 천재뮤지션, 혁오의 연말맞이 소규모
                            콘서트를 통해 그와 진솔한 이야기를 나눠보세요! 혁오를 전혀 모른다고 해도, 아무 상관없어요.
                        </div>
                    </li>
                    <li>
                        <div className={stylesDetail.contentTitle}>개요</div>
                        <ul className={stylesDetail.goalBox}>
                            <li>
                                <span>시작종료</span>
                                <span>2018.01.01 ~ 2018.01.02</span>
                            </li>
                            <li>
                                <span>목표금액</span>
                                <span>40000000원</span>
                            </li>
                            <li>
                                <span>펀딩금액</span>
                                <span>40000000원</span>
                            </li>
                            <li>
                                <span>참여인원</span>
                                <span>23명</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={stylesDetail.contentTitle}>상세정보</div>
                        <div>
                            대한민국 감성 R&B를 대표하는 천재뮤지션, 혁오의 연말맞이
                            소규모 콘서트를 통해 그와 진솔한 이야기를 나눠보세요!
                        </div>
                        <div>
                            내용
                            <div>
                                해시태그들
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={stylesDetail.redCircle} />
                        <div className={stylesDetail.notificationTitle}>이 프로젝트가 예상하는 리워드 발송 변동 기간은 최대 <span>14</span>일입니다.</div>
                        <div>
                            펀딩 받은 후, 리워드를 제작할 수 있는 크라우드펀딩의 특성과 생산 과정에서의 예상치 못한 상황으로 인하여 리워드
                            발송 시작일이 다소 지연될 수 있습니다. 이에 셀레브는 메이커와 서포터 모두를 보호하기 위해 예상되는 리워드 발송
                            변동 기간을 미리 명시하고 이에 따른 정책을 기재하도록 하고 있습니다.
                        </div>
                    </li>
                    <li>
                        <div className={stylesDetail.redCircle} />
                        <div className={stylesDetail.notificationTitle}>펀딩약관</div>
                        <div>
                            제품 하자로 인한 교환/수리 시, 발생하는 비용은 전액 메이커가 부담합니다.
                            리워드 수령 60일 내 동일 증상으로 3번 이상 수리 시, 환불 가능합니다.
                            리워드 수령 1년 이내 제품 하자로 인한 교환/수리 문의는 info@welle.co.kr로 신청 가능합니다.
                            제품 하자가 아닌 서포터님 부주의로 인한 제품 손상은 유상수리해 드립니다.
                        </div>
                    </li>
                </ul>
                <div className={stylesDetail.DetailContentRight}>
                    <DetailContentSide />
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailContent));