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
        this.state = {
            commentDropdownOpen: false,
        }
        this.handleDropdown = this.handleDropdown.bind(this);
    }
    handleDropdown() {
        this.setState({
            commentDropdownOpen: !this.state.commentDropdownOpen,
        });
    }
    render() {
        let childCommentList = (
            <div>
                <li className={styleComments.childComment}>
                    <div className={styleComments.commentToggle} />
                    <div className={styleComments.commentUser} style={{ backgroundImage: 'url("/Sellev/assets/img/img_user.png")'}}></div>
                    <div className={styleComments.commentInfo}>
                        <div className={styleComments.comment}>
                            내사랑 혁오 혁오 만세 만세 너무 좋아요! 펀딩이랑 마켓 구매까지 다했어요!
                        </div>
                        <div className={styleComments.userHistory}>
                            <span>은비</span>
                            <span>오전9:16</span>
                        </div>
                        <div className={styleComments.commentOthers}>
                            <div className={styleComments.likeImage}></div>
                            <span>{parseNumber.numberWithCommas(12)}</span>
                        </div>
                    </div>
                </li>
                <li className={styleComments.childComment}>
                    <div className={styleComments.commentToggle} />
                    <div className={styleComments.childCommentInputBox}>
                        <input className={styleComments.childCommentInput} type={'text'} placeholder="댓글을 남겨보세요." />
                        <span>|    등록</span>
                    </div>
                </li>
            </div>
        );
        return (
            <div className={styleComments.detailCommentsBox}>
                <div className={styleComments.commentHeader}>
                    댓글 <span>{parseNumber.numberWithCommas(89)}</span>
                </div>
                <div className={styleComments.commentBody}>
                    <div className={styleComments.commentInputBox}>
                        <input className={styleComments.commentInput} type={'text'} placeholder="댓글을 남겨보세요." />
                        <span>|    등록</span>
                    </div>
                    <ul className={styleComments.commentBox}>
                        <li className={styleComments.parentComment}>
                            <div className={styleComments.commentUser} style={{ backgroundImage: 'url("/Sellev/assets/img/img_sellever_profile.png")'}} />
                            <div className={styleComments.commentInfo}>
                                <div className={styleComments.comment}>
                                    제가 가장 좋아하는 악세사리 브랜드 "모리"와 센과치히로 다음으로 세젤 좋아하는 애니매이션 "너의
                                    이름은" 의 콜라보 라뇨!! 이건 안할수가 없죠! 목빠지게 기다렸습니다!!
                                </div>
                                <div className={styleComments.userHistory}>
                                    <span>차차</span>
                                    <span>3시간전</span>
                                </div>
                                <div className={styleComments.commentOthers}>
                                    <span>답글{parseNumber.numberWithCommas(11)}</span><div className={styleComments.dropdownImage} onClick={this.handleDropdown} />
                                    <div className={styleComments.likeBox}>
                                        <div className={styleComments.likeImage}></div>
                                        <span>{parseNumber.numberWithCommas(12)}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        { this.state.commentDropdownOpen ? childCommentList : null }
                    </ul>
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
