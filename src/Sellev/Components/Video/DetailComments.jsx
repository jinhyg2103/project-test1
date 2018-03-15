import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class DetailComments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    댓글 <span>{parseNumber.numberWithCommas(89)}</span>
                </div>
                <div>
                    <input type={'text'} />
                    <div>등록</div>
                </div>
                <div>
                    <div>
                        <div>
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
                <div>
                    <div>더보기</div>
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