import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
// CSS
import styles from '../RecordLayout.css';
import stylesHome from './Home.css';

/*<Link to="/form/login" className={stylesHome.requestBtn + ' ' + styles.redBtn}>
    중개 요청하기
    <i className={'icon icon-ic_arrow_right_line'}></i>
</Link>*/

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.openRecordFarm = this.openRecordFarm.bind(this);
        this.signup = this.signup.bind(this);
    }
    openRecordFarm() {
        window.open("http://www.recordfarm.com", "recordFarm", "width=800, height=700, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes" );
    }
    signup() {
        alert('submitted');
    }
    goScroll(hash) {

        let scrollTo = '#' + hash;
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 500);
    }
    render() {
        return (
            <div className={stylesHome.homeContainer}>
                <div className={stylesHome.homeSection1}>

                    <div className={stylesHome.video}>
{/*                        <video className={stylesHome.on} controls={'true'} autoPlay={'true'} loop={'loop'} playsinline={'true'}>
                            <source src={'/recordfoundation/assets/video/video_main.mp4'} type={'video/mp4'}/>
                        </video>*/}
                    </div>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.title}>
                            <p>RECORD(RCD)</p>
                            <p>PRE-SALE MARCH 31 2018</p>
                        </div>
                        <div className={stylesHome.smallTitle}>
                            <p>THE NEXT GENERATION REWARD-BASED</p>
                            <p>AUDIO SERVICE PLATFORM WITH ETHEREUM</p>
                        </div>
                        <div className={stylesHome.btnBlock + ' ' + styles.inlineWrapper}>
                            <Link className={styles.btn + ' ' + styles.largeBtn + ' ' + styles.whiteBtn} to={'#'} onClick={this.goScroll.bind(this, 'section11')}>REGISTER FOR ICO</Link>
                            <Link onClick={this.openRecordFarm} className={styles.btn + ' ' + styles.largeBorderBtn + ' ' + styles.whiteBorderBtn} to={'#'}>EXPLORE RECORDFARM</Link>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection2} id={'section2'}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.contentList + ' row'}>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_artists.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>EMPOWERED ARTISTS</div>
                                    <div className={stylesHome.content}>
                                        On RecordFarm’s platform, artists can easily make their own music
                                        and share it worldwide, regardless of time and place. Using blockchain
                                        technology, protection of copyrights is ensured and direct transactions
                                        that prevent losses of artists are made possible.
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_listeners.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>VALUE ACCELERATING LISTENERS</div>
                                    <div className={stylesHome.content}>
                                        By interacting with music posted by artists by liking, commenting and sharing,
                                        listeners become curators and are rewarded with Record coins. Unlike traditional
                                        music service platforms, listeners add and accelerate value to the platform and
                                        are compensated fairly for their contributions.
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_direct_transactions.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>DIRECT TRANSACTIONS</div>
                                    <div className={stylesHome.content}>
                                        All transactions between artists and listeners are completed directly
                                        in the absence of an intermediary. Artists get paid directly,
                                        instantaneously and automatically when listeners purchase their music.
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_Transparent_ecosystem.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>TRANSPARENT ECOSYSTEM</div>
                                    <div className={stylesHome.content}>
                                        Because RecordFarm uses blockchain technology and smart contracts,
                                        everyone in the world can easily view contracts and transactions without
                                        relying on a central agency, which ensures the ultimate transparency.
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_Currency_creation.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>CURRENCY CREATION</div>
                                    <div className={stylesHome.content}>
                                        RECORD token (RCD) is the cryptocurrency of the RecordFarm platform.
                                        Artists are rewarded with Record coins for sharing music and listeners are
                                        rewarded for interacting with the music by liking, commenting and sharing.
                                        The more popular the music, the more Record coins received by the artists.
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.listItem + ' col-lg-6 col-md-6 col-sm-12'}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_token_utility.png'} />
                                </div>
                                <div className={stylesHome.description + ' ' + styles.black}>
                                    <div className={stylesHome.title}>TOKEN UTILITY</div>
                                    <div className={stylesHome.content}>
                                        The Record coin serves as a reward for users of the platform.
                                        These Record coins can be used to purchase music and various
                                        related goods provided on the platform.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection3}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.title + ' ' + styles.white + ' col-lg-6 col-md-6 col-sm-12'}>
                            <p>RECORD(RCD)</p>
                            <p>ICO APRIL 30 2018</p>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection4}>
                    <div className={stylesHome.cardContainer}>
                        <div className={stylesHome.cardBlock}>
                            <div className={stylesHome.card + ' ' + stylesHome.blueCard}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_blue_money.png'} />
                                </div>
                                <div className={stylesHome.description}>
                                    <p>MONETIZE YOUR</p>
                                    <p>CONTRIBUTIONS</p>
                                </div>
                            </div>
                            <div className={stylesHome.card + ' ' + stylesHome.navyCard}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_blue_direct.png'} />
                                </div>
                                <div className={stylesHome.description}>
                                    <p>DIRECT</p>
                                    <p>TRANSACTIONS</p>
                                </div>
                            </div>
                            <div className={stylesHome.card + ' ' + stylesHome.blackCard}>
                                <div className={stylesHome.logo}>
                                    <img src={'/recordfoundation/assets/img/common/ic_Utilize_earned_coins.png'} />
                                </div>
                                <div className={stylesHome.description}>
                                    <p>UTILIZE EARNED</p>
                                    <p>COINS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={stylesHome.container + ' row'}>
                        <div className={stylesHome.description + ' col-lg-6 col-md-6'}>
                            <div className={stylesHome.border}></div>
                            <div className={stylesHome.title + ' ' + styles.blue}>WHAT IS RECORD & RECORDFARM?</div>
                            <div className={stylesHome.content + ' ' + styles.black}>
                                <p>
                                    RecordFarm is a revolutionary reward-based music service platform that transforms traditional music services.
                                    RecordFarm effectively uses blockchain technology to protect the content rights of its valuable artists.
                                    Also, direct, transparent transactions are made between the artists and listeners in the absence of an intermediary,
                                    preventing losses for the artists. This resolves the core problems in the current music industry.
                                </p>
                                <p>Record token (RCD) is the cryptocurrency of the RecordFarm platform. Both artists and listeners are rewarded
                                for contributing value on the platform. This reward system using Record coins incentivizes active engagement
                                between the artists and listeners. Artists are rewarded with Record coins for creating music and listeners are rewarded
                                    for interacting with the music. These Record coins can be used to purchase music and other related goods.
                                With an open platform, RecordFarm already reached a million monthly active users and has been selected
                                    as Facebook’s Fbstart global partner. It seeks to expand its influence globally and revolutionize the music service platform.</p>
                            </div>
                            <div className={styles.blueBorderBtn + ' ' + styles.mediumBorderBtn}>
                                CHECK OUT WHITE PAPER <img src={'/recordfoundation/assets/img/common/ic_home_more.png'} />
                            </div>
                        </div>
                        <div className={stylesHome.imageBlock + ' col-lg-6 col-md-6'}>
                            <img src={'/RecordFoundation/assets/img/common/img_recordfarm.png'} className={stylesHome.image}></img>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection5}>
                    <div className={stylesHome.title}>OFFICIAL VIDEO</div>
                    <div className={stylesHome.youtube}>
                        <iframe className={stylesHome.video} src="https://youtube.com/embed/VX1iZoLJLFM" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                </div>
                <div className={stylesHome.homeSection6}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.border}></div>
                        <div className={stylesHome.contentTitle + ' ' + styles.blue}>WHY IS RECORD SPECIAL?</div>
                        <div className={stylesHome.contentList}>
                            <div className={stylesHome.contentItem + ' row'}>
                                <div className={stylesHome.image1 + ' col-lg-6 col-md-6 col-sm-12'}></div>
                                <div className={stylesHome.contentBlock + ' col-lg-6 col-md-6 col-sm-12'}>
                                    <div className={stylesHome.content}>
                                        <div className={stylesHome.title + ' ' + styles.blue}>VALUE CREATOR (ARTISTS)</div>
                                        <div className={stylesHome.description}>
                                            <p>RecordFarm uses blockchain technology to protect the rights of its valuable artists. Unlike the lack of copyright management and unclear profit distribution in the current music services, RecordFarm ensures a clear profit distribution and transparent transactions between the artists and listeners by enabling direct transactions in the absence of an intermediary and recording copyright information on the blockchain ledger permanently.</p>
                                            <p>Artists are also rewarded for posting and sharing their music. Listeners can interact with the artist’s music and every interaction creates a monetary reward for artists in the form of Record coins, giving the artists a direct payment and incentivizing them to produce higher quality music. The more popular the music, the more Record coins received.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.contentItem + ' row'}>
                                <div className={stylesHome.image2 + ' col-lg-6 col-md-6 col-sm-12'}></div>
                                <div className={stylesHome.contentBlock + ' col-lg-6 col-md-6 col-sm-12'}>
                                    <div className={stylesHome.content}>
                                        <div className={stylesHome.title + ' ' + styles.blue}>VALUE CO-CREATOR (LISTENERS)</div>
                                        <div className={stylesHome.description}>
                                            <p>RecordFarm revolutionizes the traditional music service platform by rewarding both artists and listeners. By interacting with the music in the form of likes, comments and shares, listeners are rewarded with Record coins, which can be used to purchase music and other related goods. This is a revolutionary change from traditional music service platforms, where listeners have to pay for listening, instead of being rewarded for contributing value.</p>
                                            <p>Our goal is to create an active and a rewarding platform, where listeners add value to the platform by curating music and be compensated fairly for contributing and accelerating value on the platform.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={stylesHome.contentItem + ' row'}>
                                <div className={stylesHome.image3 + ' col-lg-6 col-md-6 col-sm-12'}></div>
                                <div className={stylesHome.contentBlock + ' col-lg-6 col-md-6 col-sm-12'}>
                                    <div className={stylesHome.content}>
                                        <div className={stylesHome.title + ' ' + styles.blue}>VALUE CIRCULATORS (INVESTORS)</div>
                                        <div className={stylesHome.description}>
                                            <p>RecordFarm revolutionizes the traditional music service platform by rewarding both artists and listeners. By interacting with the music in the form of likes, comments and shares, listeners are rewarded with Record coins, which can be used to purchase music and other related goods. This is a revolutionary change from traditional music service platforms, where listeners have to pay for listening, instead of being rewarded for contributing value.</p>
                                            <p>Our goal is to create an active and a rewarding platform, where listeners add value to the platform by curating music and be compensated fairly for contributing and accelerating value on the platform.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection7}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.border}></div>
                        <div className={stylesHome.title1}>
                            PROJECT PROGRESS
                        </div>
                        <div className={stylesHome.image1}>
                            <img src={'/recordFoundation/assets/img/common/img_progress.png'} />
                        </div>
                        <div className={stylesHome.border}></div>
                        <div className={stylesHome.title2}>
                            TAKE A WALK THROUGH OUR PAST, PRESENT AND FUTURE
                        </div>
                        <div className={stylesHome.smallTitle}>
                            We have our future planned down to the last detail.
                        </div>
                        <div className={stylesHome.image2}>
                            <img src={'/recordFoundation/assets/img/common/img_2015_2019.png'} />
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection8}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.border}></div>
                        <div className={stylesHome.title}>VISIT RECORDFARM</div>
                        <div className={stylesHome.smallTitle}>Our service is up and running.</div>
                        <Link onClick={this.openRecordFarm} className={stylesHome.recordBtn + ' ' + styles.whiteBtn + ' ' + styles.largeBtn} to={'#'}>RECORDFARM.COM</Link>
                    </div>
                </div>
                <div className={stylesHome.homeSection9}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.titleBlock}>
                            <div className={stylesHome.border}></div>
                            <div className={stylesHome.title}>
                                TEAM
                            </div>
                            {/*<div className={stylesHome.smallTitle}>
                                RecordFarm revolutionizes the traditional music service platform by rewarding both artists and listeners. By interacting with the music in the form of likes, comments and shares,
                            </div>*/}
                        </div>
                        <div className={stylesHome.teamBlock + ' row'}>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_HarrisonShin.png'} />
                                <div className={stylesHome.memberTitle}>HARRISON SHIN</div>
                                <div className={stylesHome.memberOccupation}>TEAM LEAD</div>
                                <p>Harrison has worked for several IT companies from around the world. Having started multiple successful ventures, he drives the development of RECORD Foundation</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_SeomoonHeo.png'} />
                                <div className={stylesHome.memberTitle}>SEOMOON HEO</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>Seomoon has gained experience in management and contents production as a television producer at a global broadcasting firm. She is talented at devising digital and public media marketing strategies, as well as in writing, design, and production.</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_SunahSon.png'} />
                                <div className={stylesHome.memberTitle}>SUNAH SON</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>With significant experience in leading teams, Sunah is an expert at mobile and web development. She has worked as a multimedia producer in Toronto and has exceptional skills in iOS development.</p>
                            </div>
                        </div>
                        <div className={stylesHome.teamBlock + ' row'}>
                            <div className={stylesHome.teamItem + ' col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_KHChoi.png'} />
                                <div className={stylesHome.memberTitle}>KH CHOI</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>KH is a full-stack developer with 10 years experience in professional software development. He is extremely passionate in blockchain technology and has participated various related projects. He focuses on ensuring security within all of RECORD subsystems.</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_DahyeJeong.png'} />
                                <div className={stylesHome.memberTitle}>DAHYE JEONG</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>Dahye is a technician with several years of experience ranging from Machine learning to app development. She leads infrastructure and full-stack development at RECORD Foundation. </p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_heewonlee.png'} />
                                <div className={stylesHome.memberTitle}>HEEWON LEE</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>Heewon has unparalled experience in overseeing the UX and UI design elements and strives to build the perfect service experience for RECORD Foundation services and its users.</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_jinhyukkim.png'} />
                                <div className={stylesHome.memberTitle}>JINHYUK KIM</div>
                                <div className={stylesHome.memberOccupation}>PROFESSIONAL</div>
                                <p>He is a back-end developer with several years of experience in professional software development. Having studied computer science in Korea, he drives the successful back-end development of RECORD Foundation.</p>
                            </div>
                        </div>
                        <div className={stylesHome.titleBlock}>
                            <div className={stylesHome.border}></div>
                            <div className={stylesHome.title}>
                                AMBASSADORS
                            </div>
                           {/* <div className={stylesHome.smallTitle}>
                                RecordFarm revolutionizes the traditional music service platform by rewarding both artists and listeners. By interacting with the music in the form of likes, comments and shares,
                            </div>*/}
                        </div>
                        <div className={stylesHome.teamBlock + ' row'}>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_AlexAn.png'} />
                                <div className={stylesHome.memberTitle}>ALEX AN</div>
                                <div className={stylesHome.memberOccupation}>AMBASSADOR FOR EUROPE</div>
                                <p>Alex is an online entrepreneur, helping businesses successfully transition to digital. He worked for a global digital marketing team and successfully built his own digital marketing companies in Greece and Korea. Alex has been living in Greece and other nearby European countries for 20 years.</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_GeumbinLee.png'} />
                                <div className={stylesHome.memberTitle}>GEUMBIN LEE</div>
                                <div className={stylesHome.memberOccupation}>AMBASSADOR FOR ASIA</div>
                                <p>As a multilingual person, Geumbin leads the expansion of the Japanese and Korean markets, including promotion, marketing, and development. She has studied at the University of Tokyo’s international program.</p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-4 col-md-4 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_AlexanderFerez.png'} />
                                <div className={stylesHome.memberTitle}>ALEXANDER FEREZ</div>
                                <div className={stylesHome.memberOccupation}>AMBASSADOR FOR AMERICA</div>
                                <p>Alexander is a mass communication expert and has extensive experience promoting projects and startups. He is in charge of marketing, promotion and partnerships at RECORD Foundation.</p>
                            </div>
                        </div>
                        <div className={stylesHome.titleBlock}>
                            <div className={stylesHome.border}></div>
                            <div className={stylesHome.title}>
                                ADVISOR
                            </div>
                        </div>
                        <div className={stylesHome.teamBlock + ' row'}>
                            <div className={stylesHome.teamItem + ' col-lg-6 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_MinhwaLee.png'} />
                                <div className={stylesHome.memberTitle}>Minhwa Lee, PhD</div>
                                <div className={stylesHome.memberOccupation}>PROFESSOR OF KAIST</div>
                                <p>Prof. Minwha Lee is a professor of KAIST and established S. Korea’s first venture company, Medison Co., Ltd. in 1985, which has grown into a global medical equipment company. With this unparalled experience, he promoted and contributed to the establishment of more than 30 medical companies, which now accounts for 70% of S. Korea’s medical equipment exports. He also played a leading role in founding Korea Venture Business Association in 1995, in enacting special laws on venture companies and in establishing KOSDAQ. </p>
                            </div>
                            <div className={stylesHome.teamItem + ' col-lg-6 col-md-6 col-sm-12 col-xs-12'}>
                                <img className={stylesHome.avatar} src={'/recordFoundation/assets/img/common/img_JunicKim.png'} />
                                <div className={stylesHome.memberTitle}>Junic Kim, PhD</div>
                                <div className={stylesHome.memberOccupation}>ADVISOR, PROFESSOR OF KONKUK UNIVERSITY</div>
                                <p>Prof. Junic Kim is a professor of Konkuk University and a serial entrepreneur with a passion for innovative technology and business strategy. He also works as an external advisor for international and government organisations.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection10}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.title + ' ' + styles.blue}>
                            ICO INVESTORS
                        </div>
                        <div className={stylesHome.border}></div>
                        <div className={stylesHome.smallTitle}>
                            FOR ANY QUESTIONS TO THE ICO E-MAIL US AT
                        </div>
                        <div className={stylesHome.email}>
                            ico@recordfoundation.org
                        </div>
                        <div className={stylesHome.subscribeBox}>
                            <input className={stylesHome.formInput} placeholder={'Your E-mail'} />
                            <div className={styles.blue2Btn + ' ' + styles.smallBtn + ' ' + stylesHome.subscribeBtn}>Subscribe</div>
                        </div>
                    </div>
                </div>
                {/*<div className={stylesHome.homeSection11} id={'section11'}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.textBlock}>
                            <h2 className={styles.blue2}>SUBSCRIBE TO THE APPICS NEWSLETTER</h2>
                            <p>AND GET UPDATES ON THE ICO, CONFERENCES, DEVELOPMENT AND MORE</p>
                        </div>
                        <div className={stylesHome.searchBlock}>
                            <input className={stylesHome.inputSearch} placeholder={'Your E-Mail'} />
                            <div className={styles.smallBtn + ' ' + styles.blue2Btn} onClick={this.signup}>Sign up</div>
                        </div>
                    </div>
                </div>
                <div className={stylesHome.homeSection12}>
                    <div className={stylesHome.container}>
                        <div className={stylesHome.title + ' ' + styles.blue2}>PARTNERS</div>
                        <img src={'/RecordFoundation/assets/img/common/img_partners.png'} className={stylesHome.image} />
                    </div>
                </div>*/}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HomeView));