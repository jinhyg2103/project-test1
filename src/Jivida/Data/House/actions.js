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
export const HOUSE_TYPE_RESIDENCE_ARRAY = Const.HOUSE_TYPE_RESIDENCE_ARRAY;
export const HOUSE_TYPE_NONRESIDENCE_ARRAY = Const.HOUSE_TYPE_NONRESIDENCE_ARRAY;
export const HOUSE_TYPE_LAND_ARRAY = Const.HOUSE_TYPE_LAND_ARRAY;
export const HOUSE_TYPE = Const.HOUSE_TYPE;
export const HOUSE_DEALING_TYPE_ARRAY = Const.HOUSE_DEALING_TYPE_ARRAY;
export const HOUSE_DEALING_TYPE = Const.HOUSE_DEALING_TYPE;
export const HOUSE_PYEONG_FOR_HOUSE_ARRAY = Const.HOUSE_PYEONG_FOR_HOUSE_ARRAY;
export const HOUSE_PYEONG_FOR_LAND_ARRAY = Const.HOUSE_PYEONG_FOR_LAND_ARRAY;
export const HOUSE_PRICE_ARRAY = Const.HOUSE_PRICE_ARRAY;
export const HOUSE_MONTHLY_PRICE_ARRAY = Const.HOUSE_MONTHLY_PRICE_ARRAY;
export const HOUSE_DEPOSIT_ARRAY = Const.HOUSE_DEPOSIT_ARRAY;

export const HOUSE_OPTION_ARRAY = Const.HOUSE_OPTION_ARRAY;
export const HOUSE_OPTION = Const.HOUSE_OPTION;
export const HOUSE_ROOM_ARRAY = Const.HOUSE_ROOM_ARRAY;
export const HOUSE_ROOM = Const.HOUSE_ROOM;
export const HOUSE_BATHROOM_ARRAY = Const.HOUSE_BATHROOM_ARRAY;
export const HOUSE_BATHROOM = Const.HOUSE_BATHROOM;
export const HOUSE_VERANDA_EXTENSION_ARRAY = Const.HOUSE_VERANDA_EXTENSION_ARRAY;
export const HOUSE_VERANDA_EXTENSION = Const.HOUSE_VERANDA_EXTENSION;
export const HOUSE_DIRECTION_ARRAY = Const.HOUSE_DIRECTION_ARRAY;
export const HOUSE_DIRECTION = Const.HOUSE_DIRECTION;
export const HOUSE_BAY_ARRAY = Const.HOUSE_BAY_ARRAY;
export const HOUSE_BAY = Const.HOUSE_BAY;
export const HOUSE_BOILER_ARRAY = Const.HOUSE_BOILER_ARRAY;
export const HOUSE_BOILER = Const.HOUSE_BOILER;
export const HOUSE_INTERIOR_ARRAY = Const.HOUSE_INTERIOR_ARRAY;
export const HOUSE_INTERIOR = Const.HOUSE_INTERIOR;
export const HOUSE_PAPER_ARRAY = Const.HOUSE_PAPER_ARRAY;
export const HOUSE_PAPER = Const.HOUSE_PAPER;
export const HOUSE_FLOOR_ARRAY = Const.HOUSE_FLOOR_ARRAY;
export const HOUSE_FLOOR = Const.HOUSE_FLOOR;
export const HOUSE_PARKING_LOT_ARRAY = Const.HOUSE_PARKING_LOT_ARRAY;
export const HOUSE_PARKING_LOT = Const.HOUSE_PARKING_LOT;
export const HOUSE_ELEVATOR_ARRAY = Const.HOUSE_ELEVATOR_ARRAY;
export const HOUSE_ELEVATOR = Const.HOUSE_ELEVATOR;
export const HOUSE_ENTRANCE_ARRAY = Const.HOUSE_ENTRANCE_ARRAY;
export const HOUSE_ENTRANCE = Const.HOUSE_ENTRANCE;

export const HOUSE_ROAD_TYPE_ARRAY = Const.HOUSE_ROAD_TYPE_ARRAY;
export const HOUSE_ROAD_TYPE = Const.HOUSE_ROAD_TYPE;
export const HOUSE_ROAD_WIDTH_ARRAY = Const.HOUSE_ROAD_WIDTH_ARRAY;
export const HOUSE_ROAD_WIDTH = Const.HOUSE_ROAD_WIDTH;
export const HOUSE_SIGNBOARD_ARRAY = Const.HOUSE_SIGNBOARD_ARRAY;
export const HOUSE_SIGNBOARD = Const.HOUSE_SIGNBOARD;
export const HOUSE_VERANDA_ARRAY = Const.HOUSE_VERANDA_ARRAY;
export const HOUSE_VERANDA = Const.HOUSE_VERANDA;

export const HOUSE_ROAD_TYPE_LAND_ARRAY = Const.HOUSE_ROAD_TYPE_LAND_ARRAY;
export const HOUSE_ROAD_TYPE_LAND = Const.HOUSE_ROAD_TYPE_LAND;
export const HOUSE_ROAD_LENGTH_ARRAY = Const.HOUSE_ROAD_LENGTH_ARRAY;
export const HOUSE_ROAD_LENGTH = Const.HOUSE_ROAD_LENGTH;
export const HOUSE_LAND_SHAPE_ARRAY = Const.HOUSE_LAND_SHAPE_ARRAY;
export const HOUSE_LAND_SHAPE = Const.HOUSE_LAND_SHAPE;
export const HOUSE_LAND_USED_FOR_ARRAY = Const.HOUSE_LAND_USED_FOR_ARRAY;
export const HOUSE_LAND_USED_FOR = Const.HOUSE_LAND_USED_FOR;
export const HOUSE_GRAVE_ARRAY = Const.HOUSE_GRAVE_ARRAY;
export const HOUSE_GRAVE = Const.HOUSE_GRAVE;
export const HOUSE_GRAVE_MOVE_ARRAY = Const.HOUSE_GRAVE_MOVE_ARRAY;
export const HOUSE_GRAVE_MOVE = Const.HOUSE_GRAVE_MOVE;

export const HOUSE_OWNERS_ARRAY = Const.HOUSE_OWNERS_ARRAY;
export const HOUSE_OWNERS = Const.HOUSE_OWNERS;
export const HOUSE_RELATION_OF_RIGHTS_ARRAY = Const.HOUSE_RELATION_OF_RIGHTS_ARRAY;
export const HOUSE_RELATION_OF_RIGHTS = Const.HOUSE_RELATION_OF_RIGHTS;
export const HOUSE_LOAN_ARRAY = Const.HOUSE_LOAN_ARRAY;
export const HOUSE_LOAN = Const.HOUSE_LOAN;
export const HOUSE_CCTV_ARRAY = Const.HOUSE_CCTV_ARRAY;
export const HOUSE_CCTV = Const.HOUSE_CCTV;
export const HOUSE_SECURITY_ARRAY = Const.HOUSE_SECURITY_ARRAY;
export const HOUSE_SECURITY = Const.HOUSE_SECURITY;
export const HOUSE_MANAGEMENT_COST_ARRAY = Const.HOUSE_MANAGEMENT_COST_ARRAY;
export const HOUSE_MANAGEMENT_COST = Const.HOUSE_MANAGEMENT_COST;
export const HOUSE_MANAGEMENT_COMPANY_ARRAY = Const.HOUSE_MANAGEMENT_COMPANY_ARRAY;
export const HOUSE_MANAGEMENT_COMPANY = Const.HOUSE_MANAGEMENT_COMPANY;
/*export const HOUSE_PLAYGROUND_ARRAY = Const.HOUSE_PLAYGROUND_ARRAY;
export const HOUSE_PLAYGROUND = Const.HOUSE_PLAYGROUND;
export const HOUSE_KID_HOSPITAL_ARRAY = Const.HOUSE_KID_HOSPITAL_ARRAY;
export const HOUSE_KID_HOSPITAL = Const.HOUSE_KID_HOSPITAL;
export const HOUSE_HOSPITAL_ARRAY = Const.HOUSE_HOSPITAL_ARRAY;
export const HOUSE_HOSPITAL = Const.HOUSE_HOSPITAL;
export const HOUSE_ELEMENTARY_SCHOOL_ARRAY = Const.HOUSE_ELEMENTARY_SCHOOL_ARRAY;
export const HOUSE_ELEMENTARY_SCHOOL = Const.HOUSE_ELEMENTARY_SCHOOL;
export const HOUSE_MIDDLE_SCHOOL_ARRAY = Const.HOUSE_MIDDLE_SCHOOL_ARRAY;
export const HOUSE_MIDDLE_SCHOOL = Const.HOUSE_MIDDLE_SCHOOL;
export const HOUSE_HIGH_SCHOOL_ARRAY = Const.HOUSE_HIGH_SCHOOL_ARRAY;
export const HOUSE_HIGH_SCHOOL = Const.HOUSE_HIGH_SCHOOL;
export const HOUSE_UNIVERSITY_ARRAY = Const.HOUSE_UNIVERSITY_ARRAY;
export const HOUSE_UNIVERSITY = Const.HOUSE_UNIVERSITY;*/
export const HOUSE_SUBWAY_ARRAY = Const.HOUSE_SUBWAY_ARRAY;
export const HOUSE_SUBWAY = Const.HOUSE_SUBWAY;
/*export const HOUSE_BUS_ARRAY = Const.HOUSE_BUS_ARRAY;
export const HOUSE_BUS = Const.HOUSE_BUS;
export const HOUSE_DEPARTMENT_STORE_ARRAY = Const.HOUSE_DEPARTMENT_STORE_ARRAY;
export const HOUSE_DEPARTMENT_STORE = Const.HOUSE_DEPARTMENT_STORE;
export const HOUSE_MART_ARRAY = Const.HOUSE_MART_ARRAY;
export const HOUSE_MART = Const.HOUSE_MART;
export const HOUSE_SUPERMARKET_ARRAY = Const.HOUSE_SUPERMARKET_ARRAY;
export const HOUSE_SUPERMARKET = Const.HOUSE_SUPERMARKET;
export const HOUSE_CONVENIENCE_STORE_ARRAY = Const.HOUSE_CONVENIENCE_STORE_ARRAY;
export const HOUSE_CONVENIENCE_STORE = Const.HOUSE_CONVENIENCE_STORE;*/
/*
* action creators
*/


////////////////////////////////////
//////////       GET      //////////
////////////////////////////////////
/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.type
* @params {Number} params.dealingType
* @params {Number} params.areaStart
* @params {Number} params.areaEnd
* @params {Number} params.price
* @params {Object} params.leftTop
* @params {Object} params.rightBottom
*/
export const getSearchHouses = ( params ) => { // 검색 결과
    return (dispatch) => {
        return HttpApi.get('GET_SEARCH_HOUSES', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_SEARCH_HOUSES, searchHouses: response.data });
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
* @params {Number} params.type
* @params {Number} params.dealingType
* @params {Number} params.areaStart
* @params {Number} params.areaEnd
* @params {Number} params.price
* @params {Object} params.leftTop
* @params {Object} params.rightBottom
*/
export const getSearchHousesForMap = ( params ) => { // 검색 결과
    return HttpApi.get('GET_SEARCH_HOUSES_FOR_MAP', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.type
* @params {Number} params.dealingType
* @params {Number} params.areaStart
* @params {Number} params.areaEnd
* @params {Number} params.price
*/
export const getSearchHousesCount = ( params ) => { // 검색 결과 총 개수
    return (dispatch) => {
        return HttpApi.get('GET_SEARCH_HOUSES_COUNT', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_SEARCH_HOUSES_COUNT, searchHousesCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export const resetSearchHouses = ( ) => { // 검색결과 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_SEARCH_HOUSES });
    };
}
/*
* @params {Number} params.from
* @params {Number} params.count
*/
export const getFavoriteHouses = ( params ) => { // 즐겨찾는 집
    return (dispatch) => {
        return HttpApi.get('GET_FAVORITE_HOUSES', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_FAVORITE_HOUSES, favoriteHouses: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
*/
export const getFavoriteHousesCount = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_FAVORITE_HOUSES_COUNT', params)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: ActionTypes.GET_FAVORITE_HOUSES_COUNT, favoriteHousesCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export const resetFavoriteHouses = ( ) => { // 즐겨찾는 집 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_FAVORITE_HOUSES });
    };
}

/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Boolean} params.includeMine
* @params {Boolean} params.includeCustomer
* @params {Boolean} params.includeAgency
*/
export const getMyHouses = ( params ) => { // (사용자) 집 내놓기 / (중개사) 파는 매물
    return (dispatch) => {
        return HttpApi.get('GET_MY_HOUSES', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_MY_HOUSES, myHouses: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
/*
* @params {Boolean} params.includeMine
* @params {Boolean} params.includeCustomer
* @params {Boolean} params.includeAgency
*/
export const getMyHousesCount = ( params ) => { // (사용자) 집 내놓기 / (중개사) 파는 매물
    return (dispatch) => {
        return HttpApi.get('GET_MY_HOUSES_COUNT', params)
            .then((response) => {
                dispatch({ type: ActionTypes.GET_MY_HOUSES_COUNT, myHousesCount: response.data });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export const resetMyHouses = ( ) => { // 파는 집/집 내놓기 다시 받아오기
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_MY_HOUSES });
    };
}



/*
* @params {Number} params.from
* @params {Number} params.count
* @params {Number} params.uIdAgency
*/
export const getAgencyOhterHouses = ( params ) => {
    return HttpApi.get('GET_AGENCY_OTHER_HOUSES', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.hId
*/
export const getHouseById = ( params ) => { // 집 id로 정보 가져오기
    return HttpApi.get('GET_HOUSE_BY_ID', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
////////////////////////////////////
///////////     POST    ////////////
////////////////////////////////////
/*
* @params {Number} params.uId
* @params {String} params.title
* @params {String} params.description
* @params {Number} params.price
* @params {Number} query.type // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
* @params {Number} params.area // 공급면적
* @params {Number} params.areaForExclusiveUse // 전용면적
* @params {Number} query.dealingType // 매매(1), 전세(2), 월세(3),
* @params {String} params.state // 주소에서 시(광역), 도 ex)서울시 / 경기도 / 강원도
* @params {String} params.city // 주소에서 구(광역), 시 / 군 ex) 서초구 / 성남시 / 횡성군
* @params {String} params.address1  // 주소에서 동(광역) / 구 / 읍 ex) 서초동 / 분당구 / 횡성읍
* @params {String} params.address2 // 자세한 주소
*/
export const createHouse = ( params ) => {
    return HttpApi.post('POST_CREATE_HOUSE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

/*
* @params {Number} params.hId
* 이하 생략
*/
export const createHouseOptions = ( params ) => {
    return HttpApi.post('POST_CREATE_HOUSE_OPTIONS', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

/*
* @params {Number} params.hId
* @params {String} params.url
*/
export const createHousePhoto = ( params ) => {
    return HttpApi.post('POST_CREATE_HOUSE_PHOTO', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}


/*
* @params {Number} params.hId
*/
export const setFavorite = ( params ) => {
    return HttpApi.post('POST_HOUSE_FAVORITE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

// DELETE
/*
* @params {Number} params.hId
*/
export const deleteMyHouse = ( params ) => {
    return (dispatch) => {
        return HttpApi.post('POST_DELETE_HOUSE', params)
            .then((response) => {
                dispatch({ type: ActionTypes.DELETE_MY_HOUSE, hId: params.hId });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                dispatch({ type: ActionTypes.DELETE_MY_HOUSE, hId: params.hId });
                return Promise.reject(err);
            });
    };
}

// UPDATE
/*
* @params {Number} params.hId
* @params {String} params.title
* @params {String} params.description
* @params {Number} params.price
* @params {Number} query.type // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
* @params {Number} params.area // 공급면적
* @params {Number} params.areaForExclusiveUse // 전용면적
* @params {Number} query.dealingType // 매매(1), 전세(2), 월세(3),
* @params {String} params.state // 주소에서 시(광역), 도 ex)서울시 / 경기도 / 강원도
* @params {String} params.city // 주소에서 구(광역), 시 / 군 ex) 서초구 / 성남시 / 횡성군
* @params {String} params.address1  // 주소에서 동(광역) / 구 / 읍 ex) 서초동 / 분당구 / 횡성읍
* @params {String} params.address2 // 자세한 주소
* @params {String} params.memo
*/
export const updateHouse = ( params ) => {
    return HttpApi.post('POST_UPDATE_HOUSE', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Number} params.hId
* 이하 생략
*/
export const updateHouseOptions = ( params ) => {
    return HttpApi.post('POST_UPDATE_HOUSE_OPTIONS', params)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
/*
* @params {Array} params.photos
*/
export const updateHousePhotos = ( params ) => {
    return HttpApi.post('POST_UPDATE_HOUSE_PHOTOS', params)
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
