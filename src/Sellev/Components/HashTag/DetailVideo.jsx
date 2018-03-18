import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import ImageList from '../../Common/ImageList';

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class DetailVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    bgImage: '/Sellev/assets/img/img_video_1.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_2.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_3.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
                {
                    bgImage: '/Sellev/assets/img/img_video_4.png',
                    title: '이 인터뷰는 유명해지지 않았으면 해',
                    name: '자이언티',
                    like: 8219,
                },
            ],
        };
    }
    render() {
        let videoList = this.state.list.map((item, index) => {
            return (
                <div className={stylesHashTag.videoBox}>
                    <ImageList key={index} type={'video'} listItem={item} />
                </div>
            );
        })
        return (
            <div className={stylesHashTag.videoSection}>
                <div className={stylesHashTag.detailSectionTitle}>
                    <div className={stylesHashTag.title}>동영상</div>
                    <Link to={'/video'} className={stylesHashTag.viewAll}>전체보기</Link>
                </div>
                <div className={stylesHashTag.videoBody}>
                    {videoList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailVideo));