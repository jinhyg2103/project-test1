import * as ActionTypes from './actionTypes';

export const initialState = {
    chats: {},
}
export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CHATS:
            return Object.assign({}, state, {});
        case ActionTypes.GET_CHAT_LINES:
            return Object.assign({}, state, {});
        case ActionTypes.GET_CHAT_HOUSES:
            return Object.assign({}, state, {});
        default:
          return state;
    }
}
