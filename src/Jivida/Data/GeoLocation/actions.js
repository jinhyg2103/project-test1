import axios from 'axios/index';

import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/

/*
* action creators
*/
// 광역시 / 도 리스트
export const loadSi = () => {
    return (dispatch) => {
        return axios.get('http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admCodeList.json', {
            params: {
            },
        }).then((response) => {
            dispatch({ type: ActionTypes.LOAD_SI, si: response.data});
            return Promise.resolve(response.data);
        }).catch((err) => {
            return Promise.reject(err);
        });
    };
};

// 시 / 구 / 군
export const loadGu = ( admCode ) => {
    return (dispatch) => {
        return axios.get('https://jivida.com/api/gps/get/geoGu', {
            params: {
                admCode: admCode,
            },
        }).then((response) => {
            console.log(response.data);
            dispatch({ type: ActionTypes.LOAD_GU, gu: response.data});
            return Promise.resolve(response.data);
        }).catch((err) => {
            return Promise.reject(err);
        });
    };
};
// 읍 / 면 / 동
export const loadDong = ( admCode ) => {
    return (dispatch) => {
        return axios.get('https://jivida.com/api/gps/get/geoDong', {
            params: {
                admCode: admCode,
            },
        }).then((response) => {
            console.log(response.data);
            dispatch({ type: ActionTypes.LOAD_DONG, dong: response.data});
            return Promise.resolve(response.data);
        }).catch((err) => {
            return Promise.reject(err);
        });
    };
};