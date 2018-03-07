import * as ActionTypes from './actionTypes';

export const initialState = {
    si: [{"admCode":"11","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"서울특별시","admCodeNm":"서울특별시","lnm":null},{"admCode":"41","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"경기도","admCodeNm":"경기도","lnm":null},{"admCode":"26","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"부산광역시","admCodeNm":"부산광역시","lnm":null},{"admCode":"27","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"대구광역시","admCodeNm":"대구광역시","lnm":null},{"admCode":"28","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"인천광역시","admCodeNm":"인천광역시","lnm":null},{"admCode":"29","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"광주광역시","admCodeNm":"광주광역시","lnm":null},{"admCode":"30","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"대전광역시","admCodeNm":"대전광역시","lnm":null},{"admCode":"31","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"울산광역시","admCodeNm":"울산광역시","lnm":null},{"admCode":"36","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"세종특별자치시","admCodeNm":"세종특별자치시","lnm":null},{"admCode":"42","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"강원도","admCodeNm":"강원도","lnm":null},{"admCode":"43","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"충청북도","admCodeNm":"충청북도","lnm":null},{"admCode":"44","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"충청남도","admCodeNm":"충청남도","lnm":null},{"admCode":"45","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"전라북도","admCodeNm":"전라북도","lnm":null},{"admCode":"46","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"전라남도","admCodeNm":"전라남도","lnm":null},{"admCode":"47","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"경상북도","admCodeNm":"경상북도","lnm":null},{"admCode":"48","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"경상남도","admCodeNm":"경상남도","lnm":null},{"admCode":"50","mnnm":null,"slno":null,"ldCpsgCode":null,"ldEmdLiCode":null,"regstrSeCode":null,"pnu":null,"lowestAdmCodeNm":"제주특별자치도","admCodeNm":"제주특별자치도","lnm":null}],
    gu: [],
    dong: [],
}
export const geoLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_SI:
            return Object.assign({}, state, { si: action.si });
        case ActionTypes.LOAD_GU:
            return Object.assign({}, state, { gu: action.gu });
        case ActionTypes.LOAD_DONG:
            return Object.assign({}, state, { dong: action.dong });
        default:
          return state;
    }
}
