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
* @params {Number} params.from
* @params {Number} params.count
*/
export const getGpsAccess = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_ACCESS', params)
            .then((response) => {
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
export const getGpsUsage = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_USAGE', params)
            .then((response) => {
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
export const getGpsRead = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_READ', params)
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
export const getGpsAccessCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_ACCESS_COUNT', params)
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
export const getGpsUsageCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_USAGE_COUNT', params)
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
export const getGpsReadCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_GPS_READ_COUNT', params)
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
* @params {Number} query.uId
* @params {String} query.description
*/
export const createAccess = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('CREATE_GPS_ACCESS', params)
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
