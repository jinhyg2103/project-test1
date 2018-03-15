import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesVideo from '../../Styles/Components/Video.css';

// Utils
import * as parseNumber from '../../Lib/Utils/parseNumber';

class VideoListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div style={{ backgroundImage: 'url("' + this.props.listItem.thumbmnail + '")'}}></div>
                <div>
                    <div>{this.props.listItem.title}</div>
                    <div>
                        <div>{parseNumber.numberWithCommas(this.props.listItem.playCount)}</div>
                        <div>{parseNumber.numberWithCommas(this.props.listItem.like)}</div>
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
})(withRouter(VideoListItem));