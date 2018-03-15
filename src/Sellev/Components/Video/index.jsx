import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import VideoBanner from './Banner';
import VideoBody from './VideoBody';

class VideoHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <VideoBanner />
                <VideoBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(VideoHome));