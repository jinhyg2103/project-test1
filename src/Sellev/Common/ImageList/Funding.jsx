import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Common/ImageList.css';

// Util
import * as NumberUtil from '../../Lib/Utils/converter'

/*
* this.props.listItem
*/
class Funding extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.listItem.name}</div>
                <div>{this.props.listItem.title}</div>
                <div>60%</div>
                <div>
                    <div>
                        <div>60%</div>
                        <div>펀딩율</div>
                    </div>
                    <div>
                        <div>145</div>
                        <div>참여수</div>
                    </div>
                    <div>
                        <div>22</div>
                        <div>남은일</div>
                    </div>
                    <div>
                        <div><span>1200</span>만원</div>
                        <div>펀딩목표액</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(Funding));
