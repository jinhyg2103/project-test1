import { combineReducers } from 'redux';
import { authReducer } from './Authentification/reducer';
import { chatReducer } from './Chat/reducer';
import { houseReducer } from './House/reducer';
import { requestReducer } from './Request/reducer';
import { inquiryReducer } from './Inquiry/reducer';
import { userReducer } from './User/reducer';
import { geoLocationReducer } from './GeoLocation/reducer';

export const reducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    house: houseReducer,
    request: requestReducer,
    inquiry: inquiryReducer,
    user: userReducer,
    geoLocation: geoLocationReducer,
});
