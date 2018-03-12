import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//Component
import UserBox from '../../Common/UserBox';

// Styles
import styles from '../../Styles/Components/Header.css';

class globalUserMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.globalMenuContainer}>
                <div className={styles.globalMenuHeader}>
                    <UserBox imgUrl={this.props.imgUrl} />
                    <div className={styles.userInfo}>
                        <div>{this.props.name}</div>
                        <span>Coin</span>
                        <span>{this.props.coin}C</span>
                        <span>Point</span>
                        <span>{this.props.point}P</span>
                    </div>
                </div>
                <div className={styles.globalMenuBody}>
                    <ul className={styles.globalMenuList}>
                        <li><Link to={'/home'}>프로필설정</Link></li>
                        <li><Link to={'/hashtag'}>관심펀딩/상품</Link></li>
                        <li><Link to={'/product'}>참여 펀딩 현황</Link></li>
                        <li><Link to={'/media'}>주문내역 조회</Link></li>
                    </ul>
                    <ul className={styles.othersList}>
                        <li><Link to={'/'}>코인 충전</Link></li>
                        <li><Link to={'/'}>이용가이드</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(globalUserMenu));
