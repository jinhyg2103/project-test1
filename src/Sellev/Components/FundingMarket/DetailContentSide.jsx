import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

class DetailContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>펀딩을 선택해보세요</div>
                <div>
                    <div>
                        <div>546명이 선택</div>
                        <div>11000원</div>
                        <ul>
                            <li>혁오 소규모 콘서트 A석 (1매)</li>
                            <li>혁오 하늘티 (1매)</li>
                        </ul>
                        <div>
                            <div>배송비</div>
                            <div>2500원</div>
                        </div>
                        <div>
                            <div>상품발송일</div>
                            <div>2018년 1월 초 (1~10일) 예정</div>
                        </div>
                        <div>
                            <div>제한수량</div>
                            <div>20개</div>
                        </div>
                    </div>
                    <div>
                        <div>546명이 선택</div>
                        <div>11000원</div>
                        <ul>
                            <li>혁오 소규모 콘서트 A석 (1매)</li>
                            <li>혁오 하늘티 (1매)</li>
                        </ul>
                        <div>
                            <div>배송비</div>
                            <div>2500원</div>
                        </div>
                        <div>
                            <div>상품발송일</div>
                            <div>2018년 1월 초 (1~10일) 예정</div>
                        </div>
                        <div>
                            <div>제한수량</div>
                            <div>20개</div>
                        </div>
                    </div>
                    <div>
                        <div>546명이 선택</div>
                        <div>11000원</div>
                        <ul>
                            <li>혁오 소규모 콘서트 A석 (1매)</li>
                            <li>혁오 하늘티 (1매)</li>
                        </ul>
                        <div>
                            <div>배송비</div>
                            <div>2500원</div>
                        </div>
                        <div>
                            <div>상품발송일</div>
                            <div>2018년 1월 초 (1~10일) 예정</div>
                        </div>
                        <div>
                            <div>제한수량</div>
                            <div>20개</div>
                        </div>
                    </div>
                </div>
                <div>펀딩하기</div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailContent));