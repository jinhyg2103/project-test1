import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CSS
import styles from '../App/App.css';
import stylesPayment from './Payment.css';

class PaymentView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesPayment.paymentContainer}>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(PaymentView));