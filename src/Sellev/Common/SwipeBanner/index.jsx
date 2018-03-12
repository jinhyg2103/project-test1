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
        let bannerListBox = this.props.listItem.map((list, key) => {
            return (
                <BannerItem bgImage={list.imgURL} title={list.title} artist={list.artist} key={key} />
            );
        });
        let settings = {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerPadding: '0px',
                        centerMode: true,
                        slidesToShow: 1,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        variableWidth: true,
                    },
                },
            ],
        };
        return (
            <Slider className={styles.swipeBanner} {...settings}>
                {bannerListBox}
            </Slider>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
