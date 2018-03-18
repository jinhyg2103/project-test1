import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HashTagDetail from "../../Components/HashTag/Detail";
import HashTagHome from "../../Components/HashTag";


class HashTagView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route path={'/hashtag'} exact={true} strict={false} component={HashTagHome} />
                <Route path={'/hashtag/detail'} exact={true} strict={false} component={HashTagDetail} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTagView));