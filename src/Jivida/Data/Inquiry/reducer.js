import * as ActionTypes from './actionTypes';

export const initialState = {
    inquiries: [],
    inquiriesCount: 0,
    from: 0,
}
export const inquiryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_INQUIRIES:
            return Object.assign({}, state, { inquiries: [...state.inquiries, ...action.inquiries] });
        case ActionTypes.GET_INQUIRIES_COUNT:
            return Object.assign({}, state, { inquiriesCount: action.inquiriesCount });
        case ActionTypes.RESET_INQUIRIES:
            return Object.assign({}, state, { inquiries: [] });
        case ActionTypes.ACCEPT_INQUIRY:
            return Object.assign({}, state, { inquiries: state.inquiries.map((inquiry) => {
                if (inquiry.ihId == action.ihId) {
                    inquiry.isAccepted = true;
                }
                return inquiry;
            }) });
        case ActionTypes.DELETE_INQUIRY:
            return Object.assign({}, state, { inquiries: state.inquiries.filter((inquiry) => {
                return inquiry.ihId != action.ihId;
            }) });
        default:
          return state;
    }
}
