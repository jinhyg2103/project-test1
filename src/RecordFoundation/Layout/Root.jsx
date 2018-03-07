import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// Components
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HomeComponent from './Home/Home';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// Routes
import routes from '../routes';

// Styles
import styles from './RecordLayout.css';

class RootView extends React.Component {
    componentDidMount() {
        this.props.dispatch(ActionAuth.session());
        var video = $('#bgVideo')[0];

        video.load();
        video.play();

        window.intercomSettings = {
            app_id: "ftg9ms5x"
        };
        this.handleIntercom();
    }
    handleIntercom() {
        var w=window;
        var ic=w.Intercom;
        if(typeof ic==="function"){ic('reattach_activator');
        ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ftg9ms5x';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}
    }
    render() {
        return (
            <div className={styles.rootContainer}>
                <HeaderComponent />
                <div className={styles.video}>
                    <div className={styles.shade}></div>
                    <video playsInline autoPlay muted loop={'loop'} poster={'/RecordFoundation/assets/img/home/img_video_thumbnail.jpg'} id={'bgVideo'}>
                        <source src={'http://recordfoundation.org/recordfoundation/assets/video/video_main.mp4'} type={'video/mp4'} />
                    </video>
                    <canvas></canvas>
                </div>
                <Route path={'/'} exact={true} strict={true} component={HomeComponent} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
