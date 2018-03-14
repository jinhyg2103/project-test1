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
                    <div style={{ backgroundImage: 'url("/Sellev/assets/img/img_pick_3.png")'}}></div>
                    <div>
                        <div>
                            <div>
                                <div></div>
                                메이슨더소울
                            </div>
                        </div>
                        <div>메이슨더소울의 가사집과 일러스트가 담긴 소울북</div>
                        <div>
                            <div><span>25900</span>원</div>
                            <div>배송비 2500</div>
                        </div>
                        <div>
                            <select>
                                <option>A타입-가사집 7개남음</option>
                            </select>
                            <select>
                                <option>A타입-가사집 7개남음</option>
                            </select>
                        </div>
                        <div>
                            <div>
                                총 상품금액
                            </div>
                            <div>
                                25900
                            </div>
                        </div>
                        <div>
                            <div>구매하기</div>
                            <div>1217</div>
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