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

////////////////////////////////////
///////////     POST    ////////////
////////////////////////////////////
/*
* @params {String} query.description
*/
export const creatPush2All = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('CREATE_PUSH_TO_ALL', params)
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
