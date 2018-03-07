import * as ActionTypes from './actionTypes';

export const initialState = {
    favoriteAgencies: [],
    favoriteAgenciesCount: 0,
    favoriteUser: [],
    favoriteUsersCount: 0,
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FAVORITE_AGENCIES:
            return Object.assign({}, state, { favoriteAgencies: [...state.favoriteAgencies, ...action.favoriteAgencies] });
        case ActionTypes.GET_FAVORITE_AGENCIES_COUNT:
            return Object.assign({}, state, { favoriteAgenciesCount: action.favoriteAgenciesCount });
        case ActionTypes.RESET_FAVORITE_AGENCIES:
            return Object.assign({}, state, { favoriteAgencies: [] });
        case ActionTypes.GET_FAVORITE_USERS:
            return Object.assign({}, state, { favoriteUsers: [...state.favoriteUsers, ...action.favoriteUsers] });
        case ActionTypes.GET_FAVORITE_USERS_COUNT:
            return Object.assign({}, state, { favoriteUsersCount: action.favoriteUsersCount });
        case ActionTypes.RESET_FAVORITE_USERS:
            return Object.assign({}, state, { favoriteUsers: [] });
        default:
          return state;
    }
}
