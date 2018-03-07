import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/

/*
* action creators
*/
////////////////////////////////////
//////////       GET      //////////
////////////////////////////////////

/*
* @params {Number} params.uId
*/
export const getChatByUId = ( params ) => {
    return HttpApi.get('GET_CHAT_BY_UID', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getChats = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_CHATS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getChatLines = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_CHAT_LINES', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.cId
*/
export const getChatHouses = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_CHAT_HOUSES', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

/////////////////////////////////////////////
//////     CREATE / UPDATE / DELETE   ///////
/////////////////////////////////////////////
/*
* @params {Number} params.cId
*/
export const resetCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('RESET_CHAT_COUNT', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Number} params.cId
*/
export const deleteChat = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('DELETE_CHATS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
