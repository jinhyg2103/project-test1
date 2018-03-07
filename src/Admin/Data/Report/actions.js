/**
 * @providesModule ActionHouse2
 */
import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/
import * as Const from './const';


////////////////////////////////////
//////////       GET      //////////
////////////////////////////////////
/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getSearch = ( params ) => { // 검색 결과
    return (dispatch) => {
        return HttpApi.get('GET_REPORTS', params)
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
        return HttpApi.get('GET_REPORTS_COUNT', params)
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

////////////////////////////////////
///////////     ETC     ////////////
////////////////////////////////////
