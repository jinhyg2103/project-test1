import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';

// Styles
import styles from './SwipeBanner.css';


/*
* this.props.listItem
*/
class SwipeBanner extends React.Component {
    render() {
        let bannerListBox = this.props.listItem.map((list, key) => {
            return (
                <div className={styles.listBox} key={key}>
                    <img src={list.imgURL} alt=" " />
                    <div className={styles.titleBox}>
                        <div>{list.artist}</div>
                        <div>
                            {list.title}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <Slider>
                {bannerListBox}
            </Slider>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
