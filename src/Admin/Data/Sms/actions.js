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
* @params {Number} query.year
* @params {Number} query.month
*/
export const getUsage = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_SMS_USAGE', params)
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
export const getSetting = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_SMS_SETTING', params)
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
/*
*/
export const updateSetting = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('UPDATE_SMS_SETTING', params)
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
