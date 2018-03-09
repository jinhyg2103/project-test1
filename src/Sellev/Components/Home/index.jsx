import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CSS
import stylesHome from '../../Styles/Components/Home.css';


class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bannerListBox = this.state.bannerList.map((list) => {
            return (
                <div className={stylesHome.bannerListContainer}>
                    <img className={stylesHome.bannerImg} src={list.imgURL} alt=" " />
                    <div className={stylesHome.bannerListTitleBox}>
                        <div className={stylesHome.bannerListArtist}>{list.artist}</div>
                        <div className={stylesHome.bannerListTitle}>
                            {list.title}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className={stylesHome.BannerContainer}>
                <div className={stylesHome.BannerHeader}>
                    <div className={stylesHome.BannerTitleUp}>셀레브 Pick</div>
                    <div className={stylesHome.BannerTitleDown}>놓치지마세요</div>
                </div>
                <div className={stylesHome.BannerBody}>
                    {bannerListBox}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HomeView));
