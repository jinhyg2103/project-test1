import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailHeader from './DetailHeader';
import DetailContent from './DetailContent';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <DetailHeader />
                <DetailContent />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Detail));