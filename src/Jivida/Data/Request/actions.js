/**
 * @providesModule ActionRequest
 */
import * as ActionTypes from './actionTypes';

// API
import * as HttpApi from '../../Lib/Api/index';

/*
* other constants
*/
import * as Const from './const';
export const RANGE_ARRAY = Const.RANGE_ARRAY;

/*
* action creators
*/


////////////////////////////////////
//////////       GET      //////////
////////////////////////////////////
// Request Sell
/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.uIdFrom
* @params {Number} params.uIdTo
*/
export const getSells = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_SELLS', params)
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
* @params {Number} params.hId
*/
export const getSellAgencies = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_SELL_AGENCIES', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

// Request Find Houses
/*
* @params {Number} query.from
* @params {Number} query.count
* @params {Number} query.requestType
*/
export const getFindHouses = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_HOUSES', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Number} query.rfhId
*/
export const getFindHouseById = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_HOUSE_BY_ID', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

/*
* @params {Number} query.from
* @params {Number} query.count
* @params {Number} query.requestType
*/
export const getFindHouseAsks = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_HOUSE_ASKS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Number} query.from
* @params {Number} query.count
* @params {Number} query.rfhId
*/
export const getFindHouseAnswers = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_HOUSE_ANSWERS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}


// Request Find Customers
/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.uIdFrom
* @params {Number} params.uIdTo
*/
export const getFindCustomers = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_CUSTOMERS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export const getFindCustomerAgencies = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_REQUEST_FIND_CUSTOMER_AGENCIES', params)
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

// Request Sell
/*
* @params {Number} params.uIdFrom
* @params {Array} params.uIdsTo
* @params {Number} params.hId
* @params {String} params.memo
*/
export const createRequestSell = ( params ) => {
    return HttpApi.post('POST_CREATE_REQUEST_SELL', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.uIdFrom
* @params {Array} params.uIdsTo
* @params {Number} params.hId
* @params {String} params.memo
*/
export const acceptRequestSell = ( params ) => {
    return HttpApi.post('POST_ACCEPT_REQUEST_SELL', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.uIdFrom
* @params {Array} params.uIdTo
* @params {Number} params.hId
*/
export const deleteRequestSell = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('POST_DELETE_REQUEST_SELL', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}


// Request Find House
/*
* @params {Number} params.uIdFrom
* @params {Array} params.uIdsTo
* @params {Number} params.hId
* @params {String} params.memo
*/
export const createRequestFindHouse = ( params ) => {
    return HttpApi.post('POST_CREATE_REQUEST_FIND_HOUSE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.rfhId
*/
export const deleteRequestFindHouse = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('POST_DELETE_REQUEST_FIND_HOUSE', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
/*
* @params {Number} params.rfhaId
* @params {Array} params.hIds
*/
export const acceptRequestFindHouseAsk = ( params ) => {
    return HttpApi.post('POST_ACCEPT_REQUEST_FIND_HOUSE_ASK', params)
        .then((response) => {
            console.log('actions : ' + response.data);
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.rfhaId
*/
export const deleteRequestFindHouseAsk = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('POST_DELETE_REQUEST_FIND_CUSTOMER', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}


// Request Find Customer
/*
* @params {Number} params.uIdFrom
* @params {Array} params.uIdsTo
* @params {Number} params.hId
* @params {String} params.memo
*/
export const createRequestFindCustomer = ( params ) => {
    return HttpApi.post('POST_CREATE_REQUEST_FIND_CUSTOMER', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.rfcId
* @params {Array} params.hId
*/
export const acceptRequestFindCustomer = ( params ) => {
    return HttpApi.post('POST_ACCEPT_REQUEST_FIND_CUSTOMER', params)
        .then((response) => {
            console.log('actions : ' + response.data);
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.rfcId
*/
export const deleteRequestFindCustomer = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('POST_DELETE_REQUEST_FIND_CUSTOMER', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
