import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import ScrollArea from 'react-scrollbar';

// Actions
import * as ActionChat from '../../Data/Chat/actions';
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionHouses from '../../Data/House/actions';


// Components
import InfiniteList from '../../Common/InfiniteList';
import HouseListItem from '../../Common/HouseList/HouseListItem';
import FindHouse from '../RequestAgency/TabFindHouse';
import Modal from '../../Common/Modal/Modal';

// CSS
import stylesCommon from '../JividaLayout.css';
import stylesChat from './Chat.css';
import stylesHouseList from '../../Common/HouseList/HouseList.css';
import stylesRequest from '../RequestAgency/Request.css';
import stylesModal from '../../Common/Modal/Modal.css';

// Utils
import * as DateUtil from '../../Lib/Utils/date';
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';
import * as UploadImageUtil from '../../Lib/UploadManager/UploadImage';

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChat: {},
            socket: io('/', {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 10000,
                reconnectionAttempts: 1000,
            }),
            chatLineParams: {},
            chatHousesParams: {},
            imageFile: [],
        };
    }
    componentWillMount() {
        this.houses = [];
        let params = ParseUrlParameter.parse(this.props.location.search);
        if (params.uId) {
            this.setState({ currentChat: { id: 1 } });
            ActionChat.getChatByUId({ uId: params.uId }).then((chat) => {
                this.onChangeRoom(chat);
            });
        }
    }
    componentDidMount() {
        this.state.socket.on('message', (chatLines) => {
            this.chatLine.setState({
                list: [...chatLines, ...this.chatLine.state.list],
            }, () => {
                let scrollChatRoom = document.getElementById('scrollChatRoom');
                scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight;
            });
            if (chatLines[0].house && chatLines[0].hId) {
                this.chatHouses.setState({
                    list: [chatLines[0].house, ...this.chatHouses.state.list],
                });
            }
        });
        this.state.socket.on('house', (chatLines) => {
            this.chatLine.setState({
                list: [...chatLines, ...this.chatLine.state.list],
            }, () => {
                let scrollChatRoom = document.getElementById('scrollChatRoom');
                scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight;
            });

            if (chatLines[0].house && chatLines[0].hId) {
                this.chatHouses.setState({
                    list: [chatLines[0].house, ...this.chatHouses.state.list],
                });
            }
        });
        this.state.socket.on('image', (chatLines) => {
            this.chatLine.setState({
                list: [...chatLines, ...this.chatLine.state.list],
            }, () => {
                let scrollChatRoom = document.getElementById('scrollChatRoom');
                scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight;
            });

            if (chatLines[0].house && chatLines[0].hId) {
                this.chatHouses.setState({
                    list: [chatLines[0].house, ...this.chatHouses.state.list],
                });
            }
        });
    }
    onChangeRoom(chat) {
        if (this.state.currentChat.id != chat.id) {
            this.props.dispatch(ActionChat.resetCount({ cId: chat.id }));
            chat.count = 0;
            this.state.socket.emit('leave:room', { cId: this.state.currentChat.id });
            this.state.socket.emit('join:room', { cId: chat.id });
            this.setState({
                currentChat: chat,
                chatLineParams: { cId: chat.id, count: 100 },
                chatHousesParams: { cId: chat.id },
            }, () => {
                this.chatLine.reset();
                this.chatHouses.reset();
                let scrollChatRoom = document.getElementById('scrollChatRoom');
                scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight;
                setTimeout(() => { scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight; }, 200);
                setTimeout(() => { scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight; }, 500);
                setTimeout(() => { scrollChatRoom.scrollTop = scrollChatRoom.scrollHeight; }, 1000);
            });
        }
    }
    onInputPress(e) {
        if (e.key === 'Enter') {
            this.state.socket.emit('message', {
                uId: this.props.author.id,
                cId: this.state.currentChat.id,
                message: e.target.value,
            });
            e.target.value = '';
        }
    }
    onHouseAdd() {
        let selectedHouses = [];
        for (let i = 0; i < this.houses.length; i++) {
            if (this.houses[i].state.isSelected) {
                selectedHouses = [...selectedHouses, this.houses[i].props.house.id];
            }
        }
        if (confirm(selectedHouses.length + '개의 집을 추천하시겠습니까?')) {
            for (let i = 0; i < selectedHouses.length; i++) {
                this.state.socket.emit('house', {
                    uId: this.props.author.id,
                    cId: this.state.currentChat.id,
                    hId: selectedHouses[i],
                    index: i,
                });
            }
            this.modal.setState({
                isOpened: false,
            });
        }
    }
    onHouseModal() {
        if (this.props.author.type == 1) {
            alert('중개 회원만 집을 보낼 수 있습니다.');
        } else {
            this.modal.setState({
                isOpened: true,
            });
        }
    }
    onImageAdd(e) {
        let reader = new FileReader();
        let promises = [];
        UploadImageUtil.uploadByFile(e.target.files[0])
            .then((url) => {
                this.state.socket.emit('image', {
                    uId: this.props.author.id,
                    cId: this.state.currentChat.id,
                    url: url,
                });
            }).catch((err) => {
            alert('업로드 실패');
        });
    }
    deleteChatHouses() {
        if (confirm('정말 삭제하시겠습니까? 삭제한 대화는 복구가 불가능합니다.')) {
            let currentChatId = this.state.currentChat.id;
            this.props.dispatch(ActionChat.deleteChat({ cId: this.state.currentChat.id })).then((data) => {
                /*this.chatList.setState({
                    list: this.chatList.state.list.filter((data) => {
                        return data.id != currentChatId;
                    }),
                });
                this.onChangeRoom()*/
                window.location.reload();
            });
        }
    }
    render() {
        let chatListItem = (chat, index) => {
            setTimeout(() => {
                if (index == 0 && !this.state.currentChat.id) { // 최초로 채팅리스트를 받아올 때, 자동으로 첫번째 채팅창을 켜준다
                    this.onChangeRoom(chat);
                }
            }, 200);
            if (!chat.user) return null;
            return (
                <div
                    key={index}
                    className={stylesChat.chatListLine + ' ' + (this.state.currentChat.id == chat.id ? stylesChat.active : null)}
                    onClick={this.onChangeRoom.bind(this, chat)}
                >
                    <div className={stylesChat.profile} style={{ backgroundImage: 'url(' + chat.user.profileUrl + ')' }}>
                    </div>
                    <div className={stylesChat.header}>
                        <div className={stylesChat.name}>
                            { chat.agency ? chat.agency.agencyName : null } { chat.user.name }
                        </div>
                        <div className={stylesChat.date}>
                            { DateUtil.format('fromNow', chat.updatedAt) }
                        </div>
                    </div>
                    <div className={stylesChat.body}>
                        <div className={stylesChat.text}>
                            { chat.text }
                        </div>
                        { chat.count > 0 ? (
                            <div className={stylesChat.count}>{ chat.count }</div>
                        ) : null}
                    </div>
                </div>
            );
        };
        let chatLineItem = (chatLine, index) => {
            if (chatLine.text) {
                if (this.props.author.id == chatLine.uId) {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineMine}>
                                <div className={stylesChat.text}>{chatLine.text}</div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineOthers}>
                                { this.state.currentChat.agency ? (
                                    <Link to={ '/agency?id=' + chatLine.uId } className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></Link>
                                ) : (
                                    <Link to={ '/user?id=' + chatLine.uId } className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></Link>
                                )}
                                <div className={stylesChat.text}>{chatLine.text}</div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                }
            } else if (chatLine.house && chatLine.hId) {
                if (this.props.author.id == chatLine.uId) {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineMine}>
                                <div className={stylesChat.house}>
                                    <HouseListItem house={chatLine.house} />
                                </div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineOthers}>
                                { this.state.currentChat.agency ? (
                                    <Link to={ '/agency?id=' + chatLine.uId } className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></Link>
                                ) : (
                                    <div className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></div>
                                )}
                                <div className={stylesChat.house}>
                                    <HouseListItem house={chatLine.house} />
                                </div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                }
            } else if ( chatLine.url) {
                if (this.props.author.id == chatLine.uId) {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineMine}>
                                <div>
                                    <img className={stylesChat.image} src={chatLine.url} />
                                </div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className={stylesChat.chatLine}>
                            <div key={index} className={stylesChat.chatLineOthers}>
                                { this.state.currentChat.agency ? (
                                    <Link to={ '/agency?id=' + chatLine.uId } className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></Link>
                                ) : (
                                    <div className={stylesChat.profile} style={{ backgroundImage: 'url(' + this.state.currentChat.user.profileUrl + ')' }}></div>
                                )}
                                <div>
                                    <img className={stylesChat.image} src={chatLine.url} />
                                </div>
                                <div className={stylesChat.date}>{DateUtil.format('fromNow', chatLine.createdAt)}</div>
                            </div>
                        </div>
                    );
                }
            } else {
                return null;
            }
        };
        let houseItem = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox}>
                    <HouseListItem house={house} />
                </div>
            );
        }
        let recommendedHouse = (house, index) => {
            return (
                <div key={index} className={stylesHouseList.houseItemContainerWithoutToolBox} style={{ marginBottom: 0 }}>
                    <HouseListItem house={house} selectable={true} onRef={(ref) => { this.houses[index] = ref; }} />
                </div>
            );
        };
        return (
            <div className={stylesChat.chatContainer + ' row'}>
                <ScrollArea
                    className={stylesChat.chatListBox + ' col-4 col-lg-3'}
                    horizontal={false}
                >
                    <div className={stylesChat.chatListHeader}>Messenger</div>
                    <InfiniteList onRef={(ref) => { this.chatList = ref; }} ListItem={chatListItem} Get={ActionChat.getChats} GetParams={{}} />
                </ScrollArea>
                <div className={stylesChat.chatBox + ' col-8 col-lg-6'}>
                    <div className={stylesChat.chatLineBox} id={'scrollChatRoom'} >
                        <InfiniteList onRef={(ref) => { this.chatLine = ref; }} ListItem={chatLineItem} Get={ActionChat.getChatLines} GetParams={this.state.chatLineParams} IsReverse={true} />
                    </div>
                    <div className={stylesChat.inputBox}>
                        { this.props.author.agency != null ? (
                            <div className={stylesChat.inputHouse} onClick={this.onHouseModal.bind(this)}>
                                <i className={'i icon-ic_sell'} />
                            </div>
                        ) : null }
                        <div className={stylesChat.inputPicture}>
                            <label htmlFor={'uploadImage'}><i className={'i icon-ic_picture'} /></label>
                            <input id={'uploadImage'} type={'file'} className={stylesChat.formUploadHiddenInput} onChange={this.onImageAdd.bind(this)} accept={'image/*'} />
                        </div>
                        <div className={(this.props.author.agency != null ? stylesChat.inputText : stylesChat.inputText4User)}>
                            <input type={'text'} placeholder={'텍스트를 입력하세요.'} onKeyPress={this.onInputPress.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className={stylesChat.houseList + ' col-0 col-lg-3'}>
                    <div className={stylesChat.houseListTitle}>대화중인 매물 정보</div>
                    <div className={stylesChat.houseListDelete} onClick={this.deleteChatHouses.bind(this)}>대화 삭제</div>
                    <ScrollArea
                        className={stylesChat.houseListBox}
                        horizontal={false}
                    >
                        <InfiniteList onRef={(ref) => { this.chatHouses = ref; }} ListItem={houseItem} Get={ActionChat.getChatHouses} GetParams={this.state.chatHousesParams} />
                    </ScrollArea>
                    <Modal
                        onRef={(ref) => { this.modal = ref; }}
                        modalHeader={'추천할 집을 선택하세요'}
                        modalBody={(
                            <InfiniteList onRef={(ref) => { this.recommendedHouses = ref; }} ListItem={recommendedHouse} Get={ActionHouses.getMyHouses} GetParams={{
                                includeMine: true,
                                includeCustomer: true,
                                includeAgency: false,
                            }} />
                        )}
                        modalFooter={(
                            <div className={stylesCommon.redBtn + ' ' + stylesModal.modalActionBtn} onClick={this.onHouseAdd.bind(this)}>추천하기</div>
                        )}
                    />
                </div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(ChatView));
