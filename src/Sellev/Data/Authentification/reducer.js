import * as ActionTypes from './actionTypes';

export const initialState = {
    author: {
        type: null,
    },
}
/*
*@params (ADD_PHOTO) action.photo
*@params (UPDATE_PHOTO) action.photo, action.index
*@params (DELETE_PHOTO) action.index
*@params (DELETE_ALL_PHOTO) action
*/
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return Object.assign({}, state, { author: action.author });
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, { author: initialState.author });
        default:
            return state;
    }
}
