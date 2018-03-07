/**
 * @providesModule ActionInquiry
 */
import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/

/*
* action creators
*/

/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.uIdUser
* @params {Number} params.uIdAgency
*/
export const getInquiries = ( params ) => { // 문의
    return (dispatch) => {
        return HttpApi.get('GET_INQUIRIES', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_INQUIRIES, inquiries: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
*/
export const getInquiriesCount = ( params ) => { // 문의
    return (dispatch) => {
        return HttpApi.get('GET_INQUIRIES_COUNT', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_INQUIRIES_COUNT, inquiriesCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

export const resetInquiries = ( ) => { // 즐겨찾는 집 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_INQUIRIES });
    };
}
/*
* @params {Number} params.hId
* @params {Number} params.uIdAgency
* @params {Number} params.aId
*/
export const createInquiry = ( params ) => { // 문의하기
    return HttpApi.post('POST_CREATE_INQUIRY', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.ihId (inquiryHouse id)
*/
export const acceptInquiry = ( params ) => { // 문의 수락
    return (dispatch) => {
        return HttpApi.post('POST_ACCEPT_INQUIRY', params)
            .then((response) => {
                dispatch({type: ActionTypes.ACCEPT_INQUIRY, ihId: params.ihId});
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                dispatch({type: ActionTypes.ACCEPT_INQUIRY, ihId: params.ihId});
                return Promise.reject(err);
            });
    }
}
/*
* @params {Number} params.ihId (inquiryHouse id)
*/
export const cancelInquiry = ( params ) => { // 문의 취소
    return (dispatch) => {
        return HttpApi.post('POST_CANCEL_INQUIRY', params)
            .then((response) => {
                dispatch({ type: ActionTypes.DELETE_INQUIRY, ihId: params.ihId });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                dispatch({ type: ActionTypes.DELETE_INQUIRY, ihId: params.ihId });
                return Promise.reject(err);
            });
    };
}
