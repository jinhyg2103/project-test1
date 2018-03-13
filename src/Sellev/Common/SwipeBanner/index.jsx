import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';

// Components
import BannerItem from './BannerItem';

// Styles
import styles from '../../Styles/Common/SwipeBanner.css';


/*
* this.props.listItem
*/
class SwipeBanner extends React.Component {
    render() {
        let bannerListBox = this.props.getList.map((list, index) => {
            return this.props.listItem(list, index);
        });
        let settings = {
            arrows: false,
            centerMode: this.props.centerMode || true,
            centerPadding: '0px',
            slidesToShow: this.props.slidesToShow || 1,
            autoplay: this.props.autoplay || true,
            autoplaySpeed: this.props.autoplay && this.props.autoplaySpeed || 5000,
            variableWidth: this.props.variableWidth || true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerPadding: '0px',
                        centerMode: this.props.centerMode || true,
                        slidesToShow: this.props.slidesToShow || 1,
                        autoplay: this.props.autoplay || true,
                        autoplaySpeed: this.props.autoplay && this.props.autoplaySpeed || 5000,
                        variableWidth: this.props.variableWidth || true,
                    }
                },
            ]
        };
        return (
            <Slider className={styles.swipeBanner} {...settings}>
                {bannerListBox}
            </Slider>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
