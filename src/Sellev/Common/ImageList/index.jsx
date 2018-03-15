import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import FundingMarket from './FundingMarket';
import Market from './Market';
import Video from './Video';

// Styles
import styles from '../../Styles/Common/ImageList.css';

/*
* this.props.type
* this.props.listItem
*/
class ImageList extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.imageBox} style={{ width: '264px', height: '132px', backgroundImage: 'url("' + this.props.listItem.bgImage + '")' }}></div>
                { this.props.type == 'fundingmarket' ? <div style={{ backgroundImage: 'url("' + this.props.listItem.profile + '")' }}></div> : null}
                { this.props.type == 'fundingmarket' ?
                    (
                        this.props.listItem.type == 'funding' ? <FundingMarket listItem={this.props.listItem} /> : <Market listItem={this.props.listItem} />
                    ) : null
                }
                { this.props.type == 'video' ? <Video listItem={this.props.listItem} /> : null }
            </div>
        );
    }
}
export default connect()(withRouter(ImageList));
