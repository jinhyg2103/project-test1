import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailContent from './DetailContent';

class DetailFunding extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <div></div>
                        밴드혁오
                    </div>
                    <div>
                        2018 혁오 한정발매 앨범 기념 콘서트 Let's Get it!
                    </div>
                </div>
                <div>
                    <div style={{ backgroundImage: 'url("/Sellev/assets/img/img_pick_3.png")'}}></div>
                    <div>
                        <div>펀딩금액</div>
                        <div><span>12350 만원</span></div>
                        <div>67%</div>
                        <div>
                            <div>
                                <div>남은일</div>
                                <div>31</div>
                            </div>
                            <div>
                                <div>서포터</div>
                                <div>1497명</div>
                            </div>
                        </div>
                        <div>
                            <div>펀딩하기</div>
                            <div>1284</div>
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