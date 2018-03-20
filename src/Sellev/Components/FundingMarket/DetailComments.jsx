import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


// Components
import styleComments from '../../Styles/Components/FundingMarket.css';

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class DetailComments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styleComments.detailCommentsBox}>
                <div className={styleComments.commentHeader}>
                    댓글 <span>{parseNumber.numberWithCommas(89)}</span>
                </div>
                <div className={styleComments.commentBody}>
                    <div className={styleComments.commentInputBox}>
                        <input className={styleComments.commentInput} type={'text'} />
                        <span>등록</span>
                    </div>
                    <div className={styleComments.commentBox}>
                        <div className={styleComments.parentComment}>
                            <div style={{ backgroundImage: 'url("/Sellev/assets/img/img_sellever_profile.png")'}}></div>
                            <div>
                                제가 가장 좋아하는 악세사리 브랜드 "모리"와 센과치히로 다음으로 세젤 좋아하는 애니매이션 "너의
                                이름은" 의 콜라보 라뇨!! 이건 안할수가 없죠! 목빠지게 기다렸습니다!!
                            </div>
                            <div>
                                <div>차차</div>
                                <div>3시간전</div>
                            </div>
                        </div>
                        <div className={styleComments.childComment}>
                            <div style={{ backgroundImage: 'url("/Sellev/assets/img/img_pick_3.png")'}}></div>
                            <div>
                                제가 가장 좋아하는 악세사리 브랜드 "모리"와 센과치히로 다음으로 세젤 좋아하는 애니매이션 "너의
                                이름은" 의 콜라보 라뇨!! 이건 안할수가 없죠! 목빠지게 기다렸습니다!!
                            </div>
                            <div>
                                <div>차차</div>
                                <div>3시간전</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailComments));
