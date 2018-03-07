export default {
    url: '',

    /////////////// Authentification /////////////
    GET_AUTH_SESSION: '/api/admin/auth/get/session', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','langCode': '(Option) kr이 default입니다.','force': '(Option) 무조건 SMS를 보낼 경우 true로 설정'}
    POST_AUTH_LOGIN: '/api/auth/login', //{'idText': '아이디 (4자 이상, 20자 이하)','password': '비밀번호',}
    POST_AUTH_LOGOUT: '/api/auth/logout',

    /////////////// User ////////////////////
    PAGE_USER: {
        TITLE: '고객 관리',
        COLUMN_NAME: ['ID', '이름', '전화번호', '이메일', '가입일', '타입', '-', '-'],
        COLUMN_FIELD: ['id', 'name', 'phoneNumber', 'email', 'createdAt', 'type', '[detail]', '[delete]'],
        COLUMN_SIZE: ['6%', '9%', '18%', '20%', '23%', '12%', '6%', '6%'],
    },
    GET_USERS: '/api/admin/user/get/search',
    GET_USERS_COUNT: '/api/admin/user/count/search',
    CREATE_UNREGISTERED_AGENCY: '/api/admin/agency/create/unregistered',
    UPDATE_AGENCY: '/api/admin/agency/update',
    DELETE_USER: '/api/admin/user/delete',

    /////////////// house /////////////////
    PAGE_HOUSE: {
        TITLE: '매물 관리',
        COLUMN_NAME: ['ID', '제목', '가격', '타입', '주소', '생성일', '-', '-'],
        COLUMN_FIELD: ['id', 'title', 'price', 'type', 'addressFull', 'createdAt', '[detail]', '[delete]'],
        COLUMN_SIZE: ['7%', '20%', '12%', '10%', '20%', '17%', '7%', '7%'],
    },
    GET_HOUSES: '/api/admin/house/get/search',
    GET_HOUSES_COUNT: '/api/admin/house/count/search',
    DELETE_HOUSES: '/api/admin/house/delete',

    /////////////// SMS ////////////////////
    PAGE_SMS: {
        TITLE: 'SMS 관리',
        COLUMN_NAME: [],
        COLUMN_FIELD: [],
        COLUMN_SIZE: [],
    },
    GET_SMS_USAGE: '/api/admin/sms/get/usage',
    GET_SMS_SETTING: '/api/admin/sms/get/setting',
    UPDATE_SMS_SETTING: '/api/admin/sms/update/setting',

    /////////////// Push Notification ////////////////////
    PAGE_PUSH: {
        TITLE: '전체 푸쉬 보내기',
        COLUMN_NAME: [],
        COLUMN_FIELD: [],
        COLUMN_SIZE: [],
    },
    CREATE_PUSH_TO_ALL: '/api/admin/push/create/all',

    /////////////// Report ////////////////////
    PAGE_REPORT: {
        TITLE: '문의',
        COLUMN_NAME: ['제목', '내용', '작성자', '이메일', '생성일', '-'],
        COLUMN_FIELD: ['title', 'description', 'name', 'email', 'createdAt', '[detail]'],
        COLUMN_SIZE: ['20%', '30%', '10%', '20%', '15%', '5%'],
    },
    GET_REPORTS: '/api/admin/report/get/search',
    GET_REPORTS_COUNT: '/api/admin/report/count/search',

    /////////////// GPS ////////////////////
    PAGE_GPS_ACCESS: {
        TITLE: '위치정보 시스템 접근기록 사실',
        COLUMN_NAME: ['취급자', '목적', '생성일'],
        COLUMN_FIELD: ['user.name', '', 'createdAt'],
        COLUMN_SIZE: ['30%', '40%', '30%'],
    },
    PAGE_GPS_USAGE: {
        TITLE: '위치정보 사용 내역',
        COLUMN_NAME: ['제공자', '접근경로', '제공서비스', '요청자', '제공일시'],
        COLUMN_FIELD: ['uId', 'route', 'LBS', '', 'createdAt'],
        COLUMN_SIZE: ['20%', '20%', '20%', '20%', '20%'],
    },
    PAGE_GPS_READ: {
        TITLE: '위치정보 제공사실 열람 내역',
        COLUMN_NAME: ['취급자', '요청자', '목적', '제공일시'],
        COLUMN_FIELD: ['', '', '', ''],
        COLUMN_SIZE: ['20%', '20%', '40%', '20%'],
    },
    GET_GPS_ACCESS: '/api/admin/gps/get/accesses',
    GET_GPS_ACCESS_COUNT: '/api/admin/gps/count/accesses',
    GET_GPS_USAGE: '/api/admin/gps/get/usages',
    GET_GPS_USAGE_COUNT: '/api/admin/gps/count/usages',
    GET_GPS_READ: '/api/admin/gps/get/reads',
    GET_GPS_READ_COUNT: '/api/admin/gps/count/reads',
    CREATE_GPS_ACCESS: '/api/admin/gps/create/access',
};
