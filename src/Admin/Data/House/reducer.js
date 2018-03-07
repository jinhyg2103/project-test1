import * as ActionTypes from './actionTypes';

export const initialState = {
    searchHouses: [],
    searchHousesCount: 0,
    favoriteHouses: [],
    favoriteHousesCount: 0,
    myHouses: [],
    myHousesCount: 0,

}
export const houseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SEARCH_HOUSES:
            return Object.assign({}, state, { searchHouses: [...state.searchHouses, ...action.searchHouses] });
        case ActionTypes.GET_SEARCH_HOUSES_COUNT:
            return Object.assign({}, state, { searchHousesCount: action.searchHousesCount });
        case ActionTypes.RESET_SEARCH_HOUSES:
            return Object.assign({}, state, { searchHouses: [] });
        case ActionTypes.GET_FAVORITE_HOUSES:
            return Object.assign({}, state, { favoriteHouses: [...state.favoriteHouses, ...action.favoriteHouses] });
        case ActionTypes.GET_FAVORITE_HOUSES_COUNT:
            return Object.assign({}, state, { favoriteHousesCount: action.favoriteHousesCount });
        case ActionTypes.RESET_FAVORITE_HOUSES:
            return Object.assign({}, state, { favoriteHouses: [] });
        case ActionTypes.GET_MY_HOUSES:
            return Object.assign({}, state, { myHouses: [...state.myHouses, ...action.myHouses] });
        case ActionTypes.GET_MY_HOUSES_COUNT:
            return Object.assign({}, state, { myHousesCount: action.myHousesCount });
        case ActionTypes.RESET_MY_HOUSES:
            return Object.assign({}, state, { myHouses: [] });
        case ActionTypes.DELETE_MY_HOUSE:
            return Object.assign({}, state, { myHouses: state.myHouses.filter((house) => {
                return house.id != action.hId;
            }) });
        default:
          return state;
    }
}
