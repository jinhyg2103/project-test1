import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class SelleverView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SelleverView));