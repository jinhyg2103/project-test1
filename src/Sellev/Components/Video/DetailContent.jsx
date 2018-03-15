import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailContentSide from './DetailContentSide';
import DetailComments from './DetailComments';

// Styles
import stylesVideo from '../../Styles/Components/Video.css';

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class DetailContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div> {/* 왼쪽 상세 정보 및 댓글들 */}
                        <div>게시일 2018.03.18</div>
                        <div>
                            대한민국 감성 R&B를 대표하는 천재뮤지션, 혁오의 연말맞이 소규모 콘서트를 통해 그와 진솔한 이야기를 나눠보세요!
                            혁오를 전혀 모른다고 해도, 아무 상관없어요. 대한민국 감성 R&B를 대표하는 천재뮤지션, 혁오의 연말맞이 소규모
                            콘서트를 통해 그와 진솔한 이야기를 나눠보세요! 혁오를 전혀 모른다고 해도, 아무 상관없어요.
                        </div>
                        <div>해시태그들</div>
                    </div>
                    <div>
                        <div>
                            <div style={{ backgroundImage: '/Sellev/assets/img/img_user.png' }}></div>
                            <div>
                                <div>밴드혁오</div>
                                <div>팔로워{parseNumber.numberWithCommas(2347)}명</div>
                            </div>
                        </div>
                        <div>팔로우</div>
                    </div>
                    <DetailComments />
                </div>
                <DetailContentSide /> {/* 오른쪽 인기 동영상 */}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailContent));