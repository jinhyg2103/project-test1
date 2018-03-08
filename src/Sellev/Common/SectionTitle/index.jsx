import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesSectionTitle from './SectionTitle.css';

/*
    props
* this.props.title
* this.props.smallTitle
* this.props.sortList
* this.props.
* */

class SectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
    }
    render() {
        return (
            <ReactModal
                className={this.props.wideModal ? stylesModal.modalContainer + ' ' + stylesModal.wideModal : stylesModal.modalContainer}
                overlayClassName={stylesModal.modalOverlay}
                isOpen={this.state.isOpened}
                onRequestClose={this.close.bind(this)}
                contentLabel="Modal"
                shouldCloseOnOverlayClick={true}>
                <div className={stylesModal.modalHeader}>
                    {this.props.modalHeader}
                    <i className={'icon icon-ic_delete'} onClick={this.close.bind(this)}></i>
                </div>
                <div className={stylesModal.modalBody}>
                    {this.props.modalBody}
                </div>
                { this.props.modalFooter ? (
                    <div className={stylesModal.modalFooter}>
                        {this.props.modalFooter}
                    </div>
                ) : null}
            </ReactModal>
        );
    }
}
export default connect()(withRouter(SectionTitle));
