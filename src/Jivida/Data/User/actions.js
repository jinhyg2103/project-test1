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
* @params {Number} params.uId
*/
export const getUserById = ( params ) => { // 검색 결과
    return HttpApi.get('GET_USER_BY_ID', params)
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
export const getFavoriteAgencies = ( params ) => { // 검색 결과
    return (dispatch) => {
        params.type = 2; // Agency는 type 2이다
        return HttpApi.get('GET_FAVORITE_AGENCIES', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_FAVORITE_AGENCIES, favoriteAgencies: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
*/
export const getFavoriteAgenciesCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_FAVORITE_AGENCIES_COUNT', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_FAVORITE_AGENCIES_COUNT, favoriteAgenciesCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getFavoriteUser = ( params ) => { // 검색 결과
    return (dispatch) => {
        params.type = 1; // User는 type 1이다
        return HttpApi.get('GET_FAVORITE_USERS', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_FAVORITE_USERS, favoriteUsers: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
*/
export const getFavoriteUserCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_FAVORITE_USERS_COUNT', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_FAVORITE_USERS_COUNT, favoriteUsersCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Number} params.leftTop
* @params {Number} params.rightBottom
*/
export const getNearAgencyIds = ( params ) => {
    return HttpApi.get('GET_NEAR_AGENCY_IDS', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
export const resetFavoriteAgencies = ( ) => { // 검색결과 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_FAVORITE_AGENCIES });
    };
}
export const resetFavoriteUsers = ( ) => { // 검색결과 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_FAVORITE_USERS });
    };
}
////////////////////////////////////
///////////     POST    ////////////
////////////////////////////////////
/*
* @params {Number} query.uId
* @params {Number} query.type // 개설 공인중개사(1), 소속 공인중개사(2), 중개 보조원(3)
* @params {String} query.registrationNumber // 사업자번호
* @params {String} query.ceoName
* @params {String} query.agencyName // 중개사무소명
* @params {Number} query.countryDialCode
* @params {Number} query.phoneNumber
* @params {String} query.state
* @params {String} query.city
* @params {String} query.address1
* @params {String} query.address2
*/
export const updateUser = ( params ) => {
    return HttpApi.post('POST_USER_UPDATE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.uIdTo
*/
export const setFavorite = ( params ) => {
    return HttpApi.post('POST_USER_FAVORITE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

/*
* @params {Number} query.uId
* @params {Number} query.type // 개설 공인중개사(1), 소속 공인중개사(2), 중개 보조원(3)
* @params {String} query.ceoName
* @params {String} query.agencyName // 중개사무소명
* @params {Number} query.countryDialCode
* @params {Number} query.phoneNumber
* @params {String} query.state
* @params {String} query.city
* @params {String} query.address1
* @params {String} query.address2
* @params {String} query.longitude
* @params {String} query.latitude
*/
export const updateAgency = ( params ) => {
    return HttpApi.post('POST_AGENCY_UPDATE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

////////////////////////////////////
///////////     ETC     ////////////
////////////////////////////////////
