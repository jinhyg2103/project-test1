import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';

// Components

// Styles
import styles from '../../Styles/Common/SwipeBanner.css';


/*
* this.props.listItem
*/
class SwipeBanner extends React.Component {
    render() {
        let bannerListBox = this.props.getList.map((list, index) => {
            console.log(this.props);
            return this.props.listItem(list, index);
        });
        let settings = {
            arrows: false,
            centerMode: this.props.centerMode !== undefined ? this.props.centerMode : true,
            centerPadding: '0px',
            slidesToShow: this.props.slidesToShow || 1,
            autoplay: this.props.autoplay !== undefined ? this.props.autoplay : true,
            autoplaySpeed: this.props.autoplay !== undefined && this.props.autoplaySpeed ? this.props.autoplaySpeed : 5000,
            variableWidth: true,
            infinite: this.props.infinite !== undefined ? this.props.infinite : true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: this.props.centerMode !== undefined ? this.props.centerMode : true,
                        centerPadding: this.props.centerPadding || '0px',
                        slidesToShow: this.props.slidesToShow || 1,
                        autoplay: this.props.autoplay !== undefined ? this.props.autoplay : true,
                        autoplaySpeed: this.props.autoplay !== undefined && this.props.autoplaySpeed ? this.props.autoplaySpeed : 5000,
                        variableWidth: true,
                        infinite: this.props.infinite !== undefined ? this.props.infinite : true,
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
