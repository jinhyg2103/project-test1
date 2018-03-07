import * as ActionTypes from './actionTypes';

export const initialState = {
    reports: [],
    reportsCount: 0,

}
export const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_REPORTS:
            return Object.assign({}, state, { reports: [...state.reports, ...action.reports] });
        case ActionTypes.GET_REPORTS_COUNT:
            return Object.assign({}, state, { reportsCount: action.reportsCount });
        default:
          return state;
    }
}
