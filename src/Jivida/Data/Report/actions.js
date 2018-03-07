// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/

/*
* action creators
*/
/*
* @params {String} params.title
* @params {String} params.description
* @params {String} params.email
*/
export const createReport = ( params ) => { // 문의 생성
    return HttpApi.post('POST_CREATE_REPORT', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
