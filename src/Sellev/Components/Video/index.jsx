import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

class VideoHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                홈입니다
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoHome));