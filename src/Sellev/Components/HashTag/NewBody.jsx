import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class NewBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                { title: '#테스트1' },
                { title: '#테스트2' },
                { title: '#테스트3' },
                { title: '#테스트4' },
                { title: '#테스트5' },
                { title: '#테스트6' },
                { title: '#테스트7' },
                { title: '#테스트8' },
                { title: '#테스트9' },
                { title: '#테스트10' },
                { title: '#테스트11' },
                { title: '#테스트12' },
            ],
        };
    }
    render() {
        let hashTagList = this.state.list.map((item, index) => {
            return (
                <Link to={'/'} className={stylesHashTag.item} key={index}>
                    <div className={stylesHashTag.title}>{item.title}</div>
                    <div className={stylesHashTag.timeslot}>1일전</div>
{/*
                    <div className={stylesHashTag.timeslot + ' ' + stylesHashTag.today}>Today</div>
*/}
                </Link>
            );
        });
        return (
            <div className={stylesHashTag.newBody}>
                <div className={stylesHashTag.list}>{hashTagList}</div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(NewBody));