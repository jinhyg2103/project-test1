export default {
	clientId: '8puWuJWZYls1Ylawxm6CMiYREhsGGSyw',
    //url: 'http://jivida.com',
    url: '',

    /////////////// Authentification /////////////
    GET_AUTH_GET_VERIFICATION_CODE: '/api/auth/sms/getVerificationCode', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','langCode': '(Option) kr이 default입니다.','force': '(Option) 무조건 SMS를 보낼 경우 true로 설정'}
    GET_AUTH_IS_ID_DUPLICATED: '/api/auth/is/idDuplicated',
    GET_AUTH_SESSION: '/api/auth/session', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','langCode': '(Option) kr이 default입니다.','force': '(Option) 무조건 SMS를 보낼 경우 true로 설정'}
    GET_AUTH_FIND_IDTEXT: '/api/auth/find/idText',
    POST_AUTH_LOGIN: '/api/auth/login', //{'idText': '아이디 (4자 이상, 20자 이하)','password': '비밀번호',}
    POST_AUTH_SIGNUP: '/api/auth/signup', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','password': '비밀번호','idText': '아이디 (4자 이상, 20자 이하)','email': '이메일','name': '닉네임 (중복가능, 1자 이상, 25자 이하)','address': '(Option) 주소 (필수입력 아님)','type': '일반사용자는 1, 중개업자는 2'
    POST_AUTH_LOGOUT: '/api/auth/logout',
    POST_AUTH_CHANGE_PASSWORD: '/api/auth/password/change',
    POST_AUTH_CREATE_AGENCY: '/api/auth/agency/create',
    POST_AUTH_CREATE_AGENCY_LICENSE: '/api/auth/agency/create/license',
    POST_AUTH_CREATE_AGENCY_REGISTRATION_CERTIFICATE: '/api/auth/agency/create/registrationCertificate',

    /////////////// Chat /////////////////
    GET_CHATS: '/api/chat/get/chats',
    GET_CHAT_BY_UID: '/api/chat/get/chatByUId',
    GET_CHAT_LINES: '/api/chat/get/lines',
    GET_CHAT_HOUSES: '/api/chat/get/houses',
    RESET_CHAT_COUNT: '/api/chat/reset/chatCount',
    DELETE_CHAT_HOUSES: '/api/chat/delete/houses',

    /////////////// house /////////////////
    GET_HOUSE_BY_ID: '/api/house/get/id',
    GET_SEARCH_HOUSES: '/api/house/get/searchHouses',
    GET_SEARCH_HOUSES_COUNT: '/api/house/count/searchHouses',
    GET_SEARCH_HOUSES_FOR_MAP: '/api/house/get/searchHousesForMap',
    GET_FAVORITE_HOUSES: '/api/house/get/favoriteHouses',
    GET_FAVORITE_HOUSES_COUNT: '/api/house/count/favoriteHouses',
    GET_MY_HOUSES: '/api/house/get/myHouses',
    GET_MY_HOUSES_COUNT: '/api/house/count/myHouses',
    GET_AGENCY_OTHER_HOUSES: '/api/house/get/agencyOtherHouses',
    POST_CREATE_HOUSE: '/api/house/create',
    POST_CREATE_HOUSE_OPTIONS: '/api/house/create/options',
    POST_CREATE_HOUSE_PHOTO: '/api/house/create/photo',
    POST_HOUSE_FAVORITE: '/api/house/favorite', // 즐겨찾기 추가/삭제
    POST_DELETE_HOUSE: '/api/house/delete',
    POST_UPDATE_HOUSE: '/api/house/update',
    POST_UPDATE_HOUSE_OPTIONS: '/api/house/update/options',
    POST_UPDATE_HOUSE_PHOTOS: '/api/house/update/photos',

    /////////////// inquiry /////////////////
    GET_INQUIRIES: '/api/inquiry/get/search',
    GET_INQUIRIES_COUNT: '/api/inquiry/count/search',
    POST_CREATE_INQUIRY: '/api/inquiry/create',
    POST_ACCEPT_INQUIRY: '/api/inquiry/accept',
    POST_CANCEL_INQUIRY: '/api/inquiry/cancel',

    /////////////// User & Agency ////////////////////
    GET_USER_BY_ID: '/api/user/get/id',
    GET_FAVORITE_USERS: '/api/user/get/favoriteUsers',
    GET_FAVORITE_USERS_COUNT: '/api/user/count/favoriteUsers',
    GET_FAVORITE_AGENCIES: '/api/user/get/favoriteAgencies',
    GET_FAVORITE_AGENCIES_COUNT: '/api/user/count/favoriteAgencies',
    GET_NEAR_AGENCY_IDS: '/api/user/get/nearAgencyIds',
    POST_USER_FAVORITE: '/api/user/favorite',
    POST_USER_UPDATE: '/api/user/update',
    POST_AGENCY_UPDATE: '/api/agency/update',

    /////////////// Request /////////////////
    GET_REQUEST_SELLS: '/api/request/get/sells',
    GET_REQUEST_SELL_AGENCIES: '/api/request/get/sellAgencies',
    GET_REQUEST_FIND_HOUSE_BY_ID: '/api/request/get/findHouseById',
    GET_REQUEST_FIND_HOUSES: '/api/request/get/findHouses',
    GET_REQUEST_FIND_HOUSE_ASKS: '/api/request/get/findHouseAsks',
    GET_REQUEST_FIND_HOUSE_ANSWERS: '/api/request/get/findHouseAnswers',
    GET_REQUEST_FIND_CUSTOMERS: '/api/request/get/findCustomers',
    GET_REQUEST_FIND_CUSTOMER_AGENCIES: '/api/request/get/findCustomerAgencies',
    POST_CREATE_REQUEST_SELL: '/api/request/create/sell',
    POST_ACCEPT_REQUEST_SELL: '/api/request/accept/sell',
    POST_DELETE_REQUEST_SELL: '/api/request/delete/sell',
    POST_CREATE_REQUEST_FIND_HOUSE: '/api/request/create/find/house',
    POST_DELETE_REQUEST_FIND_HOUSE: '/api/request/delete/find/house',
    POST_ACCEPT_REQUEST_FIND_HOUSE_ASK: '/api/request/accept/find/house/ask',
    POST_DELETE_REQUEST_FIND_HOUSE_ASK: '/api/request/delete/find/house/ask',
    POST_CREATE_REQUEST_FIND_CUSTOMER: '/api/request/create/find/customer',
    POST_ACCEPT_REQUEST_FIND_CUSTOMER: '/api/request/accept/find/customer',
    POST_DELETE_REQUEST_FIND_CUSTOMER: '/api/request/delete/find/customer',

    /////////////// Report //////////////
    POST_CREATE_REPORT: '/api/report/post/create',

    /////////////// ETC /////////////////
    UPLOAD_IMAGE: '/api/upload/image',
};
