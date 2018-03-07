/**
 * @providesModule ActionAuth
 */
import * as ActionTypes from './actionTypes';
import * as ActionAuth from './actions';
import Store from '../../store';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/
export const actionTypes = ActionTypes;
/*
* action creators
*/

//////////////////
///// GET ////////
//////////////////
/*
* @params {Number} query.countryDialCode
* @params {Number} query.phoneNumber
*/
export const getVerificationCode = (params) => {
    return HttpApi.get('GET_AUTH_GET_VERIFICATION_CODE', params)
        .then((response) => {
            console.log(response);
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};


/*
* @params {String} query.idText
*/
export const isIdDuplicated = ( params ) => {
    return HttpApi.get('GET_AUTH_IS_ID_DUPLICATED', params)
        .then((response) => {
            return Promise.resolve(null);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
/*
*/
export const session = () => {
    return (dispatch) => {
        return HttpApi.get('GET_AUTH_SESSION')
            .then((response) => {
                dispatch({ type: ActionTypes.LOGIN, author: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};


//////////////////
///// POST ///////
//////////////////
/*
* @params {String} query.idText (idText 혹은 fullPhoneNumber 둘 중 하나는 필수)
* @params {String} query.password
*/
export const login = (params) => {
    return (dispatch) => {
        return HttpApi.post('POST_AUTH_LOGIN', params)
            .then((response) => {
                dispatch({ type: ActionTypes.LOGIN, author: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
/*
* @params {String} params.idText
* @params {String} params.password
* @params {Number} params.countryDialCode
* @params {Number} params.phoneNumber
* @params {String} params.name
* @params {String} params.email
* @params {String} params.state // 주소에서 시(광역), 도 ex)서울시 / 경기도 / 강원도
* @params {String} params.city // 주소에서 구(광역), 시 / 군 ex) 서초구 / 성남시 / 횡성군
* @params {String} params.address1  // 주소에서 동(광역) / 구 / 읍 ex) 서초동 / 분당구 / 횡성읍
* @params {String} params.address2 // 자세한 주소
*/
//http://www.juso.go.kr/support/AddressMainSearch.do?searchType=TOTAL => 주소검색기
export const signup = (params) => {
    return (dispatch) => {
        return HttpApi.post('POST_AUTH_SIGNUP', params)
            .then((response) => {
                console.log(response.data);
                console.log(dispatch);
                dispatch({ type: ActionTypes.LOGIN, author: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};


export const logout = () => {
    return (dispatch) => {
        return HttpApi.post('POST_AUTH_LOGOUT')
            .then((response) => {
                dispatch({ type: ActionTypes.LOGOUT });
                return Promise.resolve();
            })
            .catch((err) => {
                dispatch({ type: ActionTypes.LOGOUT });
                return Promise.resolve();
            });
    };
};
/*
* @params {String} query.idText
* @params {String} query.countryDialCode
* @params {String} query.phoneNumber
* or
* @params {String} query.currentPassword
* and
* @params {String} query.password
*/
export const changePassword = ( params ) => {
    return HttpApi.post('POST_AUTH_CHANGE_PASSWORD', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
/*
* @params {String} query.countryDialCode
* @params {String} query.phoneNumber
*/
export const findIdText = ( params ) => {
    return HttpApi.get('GET_AUTH_FIND_IDTEXT', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

//////////////////////
/////// Agency ///////
//////////////////////
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
export const createAgency = ( params ) => {
    return HttpApi.post('POST_AUTH_CREATE_AGENCY', params)
        .then((response) => {
            // 공인중개사로 등록하면 user의 type이 변하므로, session 다시 받아오도록 함
            Store.dispatch(ActionAuth.session());
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

/*
* @params {Number} query.aId
* @params {String} query.url // 공인중개사 자격증
*/
export const createAgencyLicense = ( params ) => {
    return HttpApi.post('POST_AUTH_CREATE_AGENCY_LICENSE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
/*
* @params {Number} query.aId
* @params {String} query.url // 사업자등록증
*/
export const createAgencyRegistrationCertificate = (params) => {
    return HttpApi.post('POST_AUTH_CREATE_AGENCY_REGISTRATION_CERTIFICATE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
