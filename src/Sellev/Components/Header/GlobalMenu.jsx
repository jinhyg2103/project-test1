import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Components/Header.css';

class globalMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className={styles.globalMenuContainer}>
              <div className={styles.globalMenuHeader}>
                  <div className={styles.redPoint} />
                  <div className={styles.menuTitle}>
                      Sellev<br />
                      New project
                  </div>
              </div>
              <div className={styles.globalMenuBody}>
                  <ul className={styles.globalMenuList}>
                      <li><Link to={'/home'}>Home</Link></li>
                      <li><Link to={'/hashtag'}>해시태그</Link></li>
                      <li><Link to={'/product'}>펀딩&마켓</Link></li>
                      <li><Link to={'/media'}>동영상</Link></li>
                      <li><Link to={'/myhome'}>마이홈</Link></li>
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
})(withRouter(globalMenu));
