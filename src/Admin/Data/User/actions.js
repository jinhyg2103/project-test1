/**
 * @providesModule ActionUser
 */
import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/
import * as Const from './const';
export const AGENCY_TYPE_ARRAY = Const.AGENCY_TYPE_ARRAY;
export const AGENCY_TYPE = Const.AGENCY_TYPE;

/*
* action creators
*/


////////////////////////////////////
//////////       GET      //////////
////////////////////////////////////
/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getSearch = ( params ) => { // 검색 결과
    return (dispatch) => {
        return HttpApi.get('GET_USERS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
*/
export const getSearchCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_USERS_COUNT', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
////////////////////////////////////
///////////     POST    ////////////
////////////////////////////////////

export const createUnregisteredAgency = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('CREATE_UNREGISTERED_AGENCY', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* server/router 참조
*/
export const updateAgency = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('UPDATE_AGENCY', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Number} query.uId
*/
export const deleteUser = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('DELETE_USER', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

////////////////////////////////////
///////////     ETC     ////////////
////////////////////////////////////
