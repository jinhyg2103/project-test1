const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

// Config
const c = require('../config/const.json');

const Models = require(__base + 'models/index');

// Libraries
const Aws = require(__base + 'lib/aws/aws');
const ConvertHelper = require(__base + 'lib/convertHelper');
const Popbill = require(__base + 'lib/popbill/index');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const Request = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdTo
        */
        sells: (query, callback) => {
            let sql;
            let sqlParams = [];
            if (query.uIdFrom) { // 판매 요청을 보낸 사람의 목록
                sql = 'SELECT house.*, count(requestSell.id) AS acceptCount' +
                    ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                    ', ' + SQL.HOUSE_USER_CONCAT +
                    ', ' + SQL.HOUSE_AGENCY_CONCAT +
                    ' FROM house ' +
                    'LEFT JOIN user ON house.uId=user.id ' +
                    'LEFT JOIN agency ON house.uId=agency.uId ' +
                    'LEFT JOIN housePhoto ON house.id=housePhoto.hId AND housePhoto.order=0 ' +
                    'LEFT JOIN requestSell ON house.id=requestSell.hId AND requestSell.isAccepted=1 ' +
                    'WHERE house.uId=?';
                sqlParams.push(query.uIdFrom);
            } else if (query.uIdTo) { // 판매 요청을 받은 사람의 목록
                sql = 'SELECT house.*' +
                    ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                    ', ' + SQL.HOUSE_USER_CONCAT +
                    ', ' + SQL.HOUSE_AGENCY_CONCAT +
                    ', ' + SQL.REQUEST_SELL_CONCAT +
                    ' FROM requestSell ' +
                    'LEFT JOIN user ON requestSell.uIdFrom=user.id ' +
                    'LEFT JOIN agency ON requestSell.uIdFrom=agency.uId ' +
                    'LEFT JOIN housePhoto ON requestSell.hId=housePhoto.hId AND housePhoto.order=0 ' +
                    'LEFT JOIN house ON requestSell.hId=house.id ' +
                    'WHERE requestSell.uIdTo=? AND requestSell.isAccepted=0';
                sqlParams.push(query.uIdTo);
            } else {
                callback(null, []);
                return;
            }
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },

        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.hId
        * @params {Number} query.uId
        */
        sellAgencies: (query, callback) => {
            let sql;
            let sqlParams = [];
            sql = 'SELECT user.*' +
                ', ' + SQL.USER_AGENCY_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE house.hIdParent=? AND house.houseStatus=2';
            sqlParams.push(query.hId);
            sql += ' GROUP BY user.id';
            sql += ' ORDER BY user.createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (user, callback) => {
                        let i = results.indexOf(user);
                        results[i] = DBFormat.user(user);
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.rfhId
        * @params {Number} query.uId
        */
        findHouseById: (query, callback) => {
            let sql = 'SELECT houseOption.*, requestFindHouse.*' +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM requestFindHouse ' +
                'LEFT JOIN user ON requestFindHouse.uId=user.id ' +
                'LEFT JOIN agency ON requestFindHouse.uId=agency.uId ' +
                'LEFT JOIN houseOption ON requestFindHouse.id=houseOption.rfhId ' +
                'WHERE requestFindHouse.id=?';
            let sqlParams = [];
            sqlParams.push(query.rfhId);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, DBFormat.house(results[0]));
                    }
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uId
        * @params {Number} query.requestType
        */
        findHouses: (query, callback) => {
            let sql = 'SELECT requestFindHouse.*' +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ', COALESCE(c, 0) as countAnswer' +
                ' FROM requestFindHouse ' +
                'LEFT JOIN user ON requestFindHouse.uId=user.id ' +
                'LEFT JOIN agency ON requestFindHouse.uId=agency.uId ' +
                'LEFT JOIN (SELECT rfhId, count(*) c FROM requestFindHouseAnswer GROUP BY rfhId) requestFindHouseAnswer ON requestFindHouse.id=requestFindHouseAnswer.rfhId ' +
                'WHERE requestFindHouse.uId=?';
            let sqlParams = [];
            sqlParams.push(query.uId);
            sql += ' GROUP BY requestFindHouse.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house); // house랑 구조가 같음
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uIdTo
        * @params {Number} query.requestType
        */
        findHouseAsks: (query, callback) => {
            let sql = 'SELECT requestFindHouse.*' +
                ', requestFindHouseAsk.id AS rfhaId' +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM requestFindHouseAsk ' +
                'LEFT JOIN requestFindHouse ON requestFindHouseAsk.rfhId=requestFindHouse.id ' +
                'LEFT JOIN user ON requestFindHouseAsk.uIdFrom=user.id ' +
                'LEFT JOIN agency ON requestFindHouseAsk.uIdFrom=agency.uId ' +
                'WHERE requestFindHouseAsk.uIdTo=? AND requestFindHouseAsk.requestType=? AND requestFindHouseAsk.isAnswered=0';
            let sqlParams = [];
            sqlParams.push(query.uIdTo);
            sqlParams.push(query.requestType);
            sql += ' ORDER BY requestFindHouseAsk.createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house); // house랑 구조가 같음
                        callback();
                    }, (err) => {
                        if (err) {
                            callback('ResourceNotFound', null);
                        } else if (!results[0]) {
                            callback(null, []);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.rfhId
        */
        findHouseAnswers: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', requestFindHouseAnswer.id AS rfhasId' +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM requestFindHouseAnswer ' +
                'LEFT JOIN house ON requestFindHouseAnswer.hId=house.id ' +
                'LEFT JOIN user ON requestFindHouseAnswer.uIdFrom=user.id ' +
                'LEFT JOIN agency ON requestFindHouseAnswer.uIdFrom=agency.uId ' +
                'LEFT JOIN housePhoto ON house.id=housePhoto.hId ' +
                'WHERE requestFindHouseAnswer.rfhId=?';
            let sqlParams = [];
            sqlParams.push(query.rfhId);
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY requestFindHouseAnswer.createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house); // house랑 구조가 같음
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdTo
        */
        findCustomers: (query, callback) => {
            let sql;
            let sqlParams = [];
            if (query.uIdFrom) { // 판매 요청을 보낸 사람의 목록
                sql = 'SELECT house.*, count(if(requestFindCustomer.isAccepted = 1,requestFindCustomer.isAccepted,null)) AS acceptCount' +
                    ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                    ', ' + SQL.HOUSE_USER_CONCAT +
                    ', ' + SQL.HOUSE_AGENCY_CONCAT +
                    ', ' + SQL.REQUEST_FIND_CUSTOMER_CONCAT +
                    ' FROM requestFindCustomer ' +
                    'LEFT JOIN user ON requestFindCustomer.uIdFrom=user.id ' +
                    'LEFT JOIN agency ON requestFindCustomer.uIdFrom=agency.uId ' +
                    'LEFT JOIN housePhoto ON requestFindCustomer.hId=housePhoto.hId AND housePhoto.order=0 ' +
                    'LEFT JOIN house ON requestFindCustomer.hId=house.id ' +
                    'WHERE requestFindCustomer.uIdFrom=?';
                sqlParams.push(query.uIdFrom);
            } else if (query.uIdTo) { // 판매 요청을 받은 사람의 목록
                sql = 'SELECT house.*' +
                    ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                    ', ' + SQL.HOUSE_USER_CONCAT +
                    ', ' + SQL.HOUSE_AGENCY_CONCAT +
                    ', ' + SQL.REQUEST_FIND_CUSTOMER_CONCAT +
                    ' FROM requestFindCustomer ' +
                    'LEFT JOIN user ON requestFindCustomer.uIdFrom=user.id ' +
                    'LEFT JOIN agency ON requestFindCustomer.uIdFrom=agency.uId ' +
                    'LEFT JOIN housePhoto ON requestFindCustomer.hId=housePhoto.hId AND housePhoto.order=0 ' +
                    'LEFT JOIN house ON requestFindCustomer.hId=house.id ' +
                    'WHERE requestFindCustomer.uIdTo=? and requestFindCustomer.isAccepted = 0';
                sqlParams.push(query.uIdTo);
            } else {
                callback(null, []);
                return;
            }
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.hId
        * @params {Number} query.uId
        */
        findCustomerAgencies: (query, callback) => {
            let sql;
            let sqlParams = [];
            sql = 'SELECT user.*' +
                ', ' + SQL.USER_AGENCY_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON user.id=agency.uId ' +
                'LEFT JOIN requestFindCustomer ON user.id=requestFindCustomer.uIdFrom ' +
                'WHERE house.hIdParent=? AND house.houseStatus=3';
            sqlParams.push(query.hId);
            sql += ' GROUP BY user.id';
            sql += ' ORDER BY user.createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (user, callback) => {
                        let i = results.indexOf(user);
                        results[i] = DBFormat.user(user);
                        callback();
                    }, (err) => {
                        if (err || !results[0]) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
    },
    count: {
    },
    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    create: {
        /*
        * @params {Number} query.hId
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdsTo
        * @params {String} query.requestToAgency
        */
        sell: (query, callback) => {
            // 이미 문의했을 경우, expired되지 않도록 날짜를 최신으로 업데이트
            dbConnectionHelper.getConnection((err, connection) => {
                async.each(query.uIdsTo, (uIdTo, callback) => {
                    connection.query('SELECT * FROM requestSell WHERE hId=? AND uIdFrom=? AND uIdTo=?', [query.hId, query.uIdFrom, uIdTo], (err, results) => {
                        if (err || !results[0]) {
                            connection.query('INSERT INTO requestSell SET ?', {
                                hId: query.hId,
                                uIdFrom: query.uIdFrom,
                                uIdTo: uIdTo,
                                requestToAgency: query.requestToAgency,
                            }, (err, result) => {
                                callback();
                            });
                        } else {
                            connection.query('UPDATE requestSell SET createdAt=? WHERE hId=? AND uIdFrom=? AND uIdTo=?', [new Date(), query.hId, query.uIdFrom, uIdTo], (err, result) => {
                                callback();
                            });
                        }
                    });
                }, (err) => {
                    connection.release();
                    callback(null, true);
                });
            });
        },
        /*
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdsTo
        * @params {Number} query.price
        * @params {Number} query.deposit
        * @params {Number} query.type
        * @params {Number} query.area
        * @params {Number} query.areaForExclusiveUse
        * @params {Number} query.dealingType
        * @params {String} query.state
        * @params {String} query.city
        * @params {String} query.address1
        * @params {String} query.address2
        * @params {String} query.addressFull
        * @params {Number} query.requestType  // 1은 고객 -> 중개사(집찾기), 2는 중개사 -> 중개사 (매물요청)
        * @params {String} query.memo
        */
        findHouse: (query, callback) => {
            let requestFindHouse = Object.assign({}, query);
            delete requestFindHouse.uIdsTo;
            requestFindHouse.uId = requestFindHouse.uIdFrom;
            delete requestFindHouse.uIdFrom;
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO requestFindHouse SET ?', requestFindHouse, (err, result) => {
                    let rfhId = result.insertId;
                    async.each(query.uIdsTo, (uIdTo, callback) => {
                        connection.query('INSERT INTO requestFindHouseAsk SET ?', {
                            uIdFrom: query.uIdFrom,
                            uIdTo: uIdTo,
                            rfhId: rfhId,
                            requestType: query.requestType,
                        }, (err, result) => {
                            // SMS 전송 모듈
                            if (query.requestType == 1) {
                                connection.query('SELECT * FROM user WHERE id=?', [uIdTo], (err, results) => {
                                    if (results[0] && results[0].type === 9) {
                                        Popbill.sms().send.multi({
                                            phoneNumbers: [results[0].phoneNumber],
                                            messages: ['부동산 어플 지비다\n' +
                                            '현재 인근에 ' + ConvertHelper.houseType[requestFindHouse.houseType] + ' ' + ConvertHelper.houseDealingType[requestFindHouse.dealingType] + '을(를) 원하는 고객이 있습니다.\n' +
                                            'www.jivida.com'],
                                            isAds: false,
                                        }, (err, result) => {
                                        });
                                    }
                                    Models.notification().push.send.request({ user: results[0] });
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        });
                    }, (err) => {
                        connection.release();
                        callback(null, rfhId);
                    });
                });
            });
        },
        /*
        */
        findCustomer: (query, callback) => {
            // 이미 문의했을 경우, expired되지 않도록 날짜를 최신으로 업데이트
            dbConnectionHelper.getConnection((err, connection) => {
                async.each(query.uIdsTo, (uIdTo, callback) => {
                    async.each(query.hIds, (hId, callback) => {
                        connection.query('SELECT * FROM requestFindCustomer WHERE hId=? AND uIdFrom=? AND uIdTo=?', [hId, query.uIdFrom, uIdTo], (err, results) => {
                            if (err || !results[0]) {
                                connection.query('INSERT INTO requestFindCustomer SET ?', {
                                    hId: hId,
                                    uIdFrom: query.uIdFrom,
                                    uIdTo: uIdTo,
                                    memo: query.memo,
                                }, (err, result) => {
                                    callback();
                                });
                            } else {
                                connection.query('UPDATE requestFindCustomer SET createdAt=? WHERE hId=? AND uIdFrom=? AND uIdTo=?', [new Date(), hId, query.uIdFrom, uIdTo], (err, result) => {
                                    callback();
                                });
                            }
                        });
                    }, (err) => {
                        callback();
                    });
                }, (err) => {
                    connection.release();
                    callback(null, true);
                });
            });
        },
    },
    accept: {
        /*
        * @params {Number} query.rsId
        * @params {Number} query.hId
        * @params {Number} query.uId
        */
        sell: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                let requestSell;
                let uIdCustomer;
                let hIdCopy;
                let cbErr;
                let houseOriginal;
                async.waterfall([
                    (callback) => { // 수락하기
                        connection.query('UPDATE requestSell SET isAccepted=true WHERE id=?', [query.rsId], (err, result) => {
                            if (err || !result) {
                                cbErr = 'ResourceTypeMismatch';
                                callback(null);
                                return;
                            }
                            connection.query('SELECT * FROM requestSell WHERE id=?', [query.rsId], (err, results) => {
                                requestSell = results[0];
                                callback(null);
                            });
                        });
                    },
                    (callback) => { // 매물 복사하기
                        if (cbErr) {
                            callback(null);
                        } else {
                            Models.house()._copy({
                                houseStatus: 2,
                                uId: query.uId,
                                hIdOriginal: query.hId,
                                memo: requestSell.requestToAgency,
                            }, (err, copyResult) => {
                                if (err || !copyResult) {
                                    cbErr = 'ResourceAlreadyExists';
                                    callback(null);
                                    return;
                                }
                                hIdCopy = copyResult.hIdCopy;
                                uIdCustomer = copyResult.uIdCustomer;
                                houseOriginal = copyResult.houseOriginal;
                                callback(null);
                            });
                        }
                    },
                    (callback) => { // 채팅창 생성
                        if (cbErr) {
                            callback(null);
                        } else {
                            Models.chat().create.chat({ uIdA: query.uId, uIdB: uIdCustomer }, (err, cId) => {
                                Models.chat()._houseAdded({
                                    title: '집 내놓기',
                                    response: '고객님의 집 내놓기 요청을 수락합니다.',
                                    uIdA: query.uId,
                                    uIdB: uIdCustomer,
                                    hIds: [hIdCopy],
                                    cId: cId,
                                    house: houseOriginal,
                                }, (err) => { });
                            });
                            callback(null);
                        }
                    },
                ], (results) => {
                    connection.release();
                    if (cbErr) {
                        callback(cbErr, null);
                    } else {
                        callback(null, true);
                    }
                });

            });
        },
        /*
        * @params {Number} query.rfhaId
        * @params {Array} query.hIds
        */
        findHouseAsk: (query, callback) => {
            let cbErr;
            let requestFindHouse;
            let params = {};
            dbConnectionHelper.getConnection((err, connection) => {
                async.waterfall([
                    (callback) => { // 1. 정보 불러오기
                        connection.query('UPDATE requestFindHouseAsk SET isAnswered=true WHERE id=?', [query.rfhaId], (err, result) => {
                            if (err || !result) {
                                connection.release();
                                cbErr = 'ResourceTypeMismatch';
                                callback(null);
                                return;
                            }
                            connection.query('SELECT * FROM requestFindHouseAsk WHERE id=?', [query.rfhaId], (err, results) => {
                                params['uIdFrom'] = results[0].uIdTo;
                                params['uIdTo'] = results[0].uIdFrom;
                                params['rfhId'] = results[0].rfhId;
                                connection.query('SELECT * FROM requestFindHouse WHERE id=?', [params.rfhId], (err, results) => {
                                    requestFindHouse = results[0];
                                    callback(null);
                                });
                            });
                        });
                    },
                    (callback) => { // 2. requestFindHouseAnswer에 넣어주기
                        if (cbErr) {
                            connection.release();
                            callback(null);
                            return;
                        }
                        async.each(query.hIds, (hId, callback) => {
                            connection.query('INSERT INTO requestFindHouseAnswer SET ?', {
                                uIdFrom: params.uIdFrom,
                                uIdTo: params.uIdTo,
                                rfhId: params.rfhId,
                                rfhaId: query.rfhaId,
                                hId: hId,
                            }, (err, result) => {
                                callback();
                            });
                        }, (err) => {
                            callback(null);
                        });
                    },
                    (callback) => { // 3. requestType 2일때 (공동중개), 자동으로 공동중개 매물 생성
                        if (cbErr) {
                            connection.release();
                            callback(null);
                            return;
                        }
                        async.each(query.hIds, (hId, callback) => {
                            setTimeout(() => {
                                Models.house()._copy({
                                    houseStatus: 3,
                                    uId: params.uIdTo,
                                    hIdOriginal: hId,
                                    memo: requestFindHouse.memo,
                                }, (err, copyResult) => {
                                    callback(null);
                                });
                            }, 1000);
                        }, (err) => {
                            callback(null);
                        });
                    },
                    (callback) => { // 4. 자동으로 생성해주는 첫 대화
                        if (cbErr) {
                            connection.release();
                            callback(null);
                            return;
                        }
                        Models.chat().create.chat({
                            uIdA: params.uIdFrom,
                            uIdB: params.uIdTo,
                        }, (err, cId) => {
                            let chatOption = {
                                title: '집 찾기',
                                response: '네, 있습니다.',
                                uIdA: query.uId,
                                uIdB: requestFindHouse.uId,
                                cId: cId,
                                hIds: query.hIds,
                                house: requestFindHouse,
                            };
                            if (query.requestType == 1) { // 고객 => 중개사 (집 찾기)
                                chatOption.title = '집 찾기';
                                chatOption.response = '고객님의 집 찾기 요청을 수락합니다.';
                            } else if (query.requestType == 2) { // 중개사 => 중개사 (공동중개 - 매물 찾기)
                                chatOption.title = '아래와 같은 매물 있나요?';
                                chatOption.response = '네 있습니다.';
                            }
                            Models.chat()._houseAdded(chatOption, (err) => { });
                            callback(null);
                        });
                    },
                ], (results) => {
                    connection.release();
                    if (cbErr) {
                        callback(cbErr, null);
                    } else {
                        callback(null, true);
                    }
                });

            });
        },
        /*
       * @params {Number} query.rfcId
       * @params {Number} query.hId
       * @params {Number} query.uId
       */
        findCustomer: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                let house;
                let params = {};
                connection.query('UPDATE requestFindCustomer SET isAccepted=true WHERE id=?', [query.rfcId], (err, result) => {
                    if (err || !result) {
                        connection.release();
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    connection.query('SELECT * FROM requestFindCustomer WHERE id=?', [query.rfcId], (err, results) => {
                        params['uIdFrom'] = results[0].uIdFrom;
                        params['uIdTo'] = results[0].uIdTo;
                        async.waterfall([
                            (callback1) => {
                                connection.query('SELECT * FROM house WHERE id=?', [query.hId], (err, results) => {
                                    if (err || !results[0]) {
                                        connection.release();
                                        callback1('ResourceTypeMismatch', null);
                                    } else {
                                        house = results[0];
                                        house.hIdParent = query.hId;
                                        house.uIdParent = params.uIdFrom;
                                        house.uId = query.uId;
                                        delete house.id;
                                        delete house.createdAt;
                                        house.houseStatus = 3; // 공동중개매물
                                        callback1();
                                    }
                                });
                            },
                            (callback2) => {
                                connection.query('INSERT INTO house SET ?', house, (err, result) => {
                                    if (err || !result) {
                                        connection.release();
                                        callback2('ResourceTypeMismatch', null);
                                    }
                                    callback2(null, result.insertId);
                                });
                            },
                            (insertId, callback3) => {
                                connection.query('SELECT * FROM housePhoto WHERE hId=?', [query.hId], (err, results) => {
                                    async.each(results, (housePhoto, callback) => {
                                        delete housePhoto.id;
                                        housePhoto.hId = insertId;
                                        delete housePhoto.createdAt;
                                        connection.query('INSERT INTO housePhoto SET ?', housePhoto, (err, result) => {
                                            callback();
                                        });
                                    }, (err) => {
                                        connection.release();
                                        callback3(null, insertId);
                                    });
                                });
                            },
                            (insertId, callback4) => {
                                Models.chat().create.chat({
                                    uIdA: params.uIdFrom,
                                    uIdB: params.uIdTo,
                                }, (err, cId) => {
                                    Models.chat().create.chatLine({ uId: query.uId, cId: cId, hId: insertId }, () => {});
                                });
                                callback4();
                            },
                        ], (err) => {
                            callback();
                        });
                        callback(null, true);
                    });
                });
            });
        },
    },
    delete: {
        /*
        * @params {Number} query.hId
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdTo
        */
        sell: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('DELETE FROM requestSell WHERE hId=? AND uIdFrom=? AND uIdTo=?', [query.hId, query.uIdFrom, query.uIdTo], (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    callback(null, true);
                });
            });
        },
        /*
        * @params {Number} query.rfhId
        */
        findHouse: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('DELETE FROM requestFindHouse WHERE id=?', [query.rfhId], (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    callback(null, true);
                });
            });
        },
        /*
        * @params {Number} query.rfhaId
        */
        findHouseAsk: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('DELETE FROM requestFindHouseAsk WHERE id=?', [query.rfhaId], (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    callback(null, true);
                });
            });
        },
        /*
        */
        findCustomer: (query, callback) => {
            let sql;
            let sqlParams = [];
            dbConnectionHelper.getConnection((err, connection) => {
                sql = 'DELETE FROM requestFindCustomer WHERE hId=?';
                sqlParams.push(query.hId);
                if (query.uIdFrom) {
                    sql += 'AND uIdFrom=?';
                    sqlParams.push(query.uIdFrom);
                }
                if (query.uIdTo) {
                    sql += 'AND uIdTo=?';
                    sqlParams.push(query.uIdTo);
                }
                connection.query(sql, sqlParams, (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    callback(null, true);
                });
            });
        },
    },
}
module.exports = Request;

