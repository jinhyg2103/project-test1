const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

// Config
const c = require('../config/const.json');


const Models = require(__base + 'models/index');
const ConvertHelper = require(__base + 'lib/convertHelper');
const Firebase        = require(__base + 'lib/firebase');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const Chat = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /*
        * @params {Number} query.uIdA
        * @params {Number} query.uIdB // author
        */
        chatByUId: (query, callback) => {
            let sql = 'SELECT chat.*' +
                ', ' + SQL.CHAT_AGENCY_CONCAT +
                ', ' + SQL.CHAT_USER_CONCAT +
                ' FROM chat ' +
                'LEFT JOIN user ON (chat.uIdA=user.id AND chat.uIdA<>?) OR (chat.uIdB=user.id AND chat.uIdB<>?) ' +
                'LEFT JOIN agency ON (chat.uIdA=agency.uId AND chat.uIdA<>?) OR (chat.uIdB=agency.uId AND chat.uIdB<>?) ' +
                'WHERE (chat.uIdA=? AND chat.uIdB=?) OR (chat.uIdA=? AND chat.uIdB=?) ';
            let sqlParams = [];
            sqlParams.push(query.uIdA);
            sqlParams.push(query.uIdA);
            sqlParams.push(query.uIdA);
            sqlParams.push(query.uIdA);
            sqlParams.push(query.uIdA);
            sqlParams.push(query.uIdB);
            sqlParams.push(query.uIdB);
            sqlParams.push(query.uIdA);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, DBFormat.chat(results[0]));
                    }
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uId
        */
        chats: (query, callback) => {
            let sql = 'SELECT chat.*' +
                ', ' + SQL.CHAT_AGENCY_CONCAT +
                ', ' + SQL.CHAT_USER_CONCAT +
                ', ' + SQL.CHAT_CHATLINE_CONCAT +
                ' FROM chat ' +
                'LEFT JOIN user ON (chat.uIdA=user.id AND chat.uIdA<>?) OR (chat.uIdB=user.id AND chat.uIdB<>?) ' +
                'LEFT JOIN agency ON (chat.uIdA=agency.uId AND chat.uIdA<>?) OR (chat.uIdB=agency.uId AND chat.uIdB<>?) ' +
                'LEFT JOIN chatLine ON chat.id=chatLine.cId AND chatLine.id = (SELECT MAX(id) FROM chatLine z WHERE z.cId=chatLine.cId)' +
                'WHERE (chat.uIdA=? OR chat.uIdB=?) ' +
                'GROUP BY chat.id ' +
                'ORDER BY chat.updatedAt DESC LIMIT ?,?';
            let sqlParams = [];
            sqlParams.push(query.uId);
            sqlParams.push(query.uId);
            sqlParams.push(query.uId);
            sqlParams.push(query.uId);
            sqlParams.push(query.uId);
            sqlParams.push(query.uId);
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        async.each(results, (chat, callback) => {
                            let i = results.indexOf(chat);
                            results[i] = DBFormat.chat(chat);
                            callback();
                        }, (err) => {
                            if (err || !results[0]) {
                                callback('ResourceNotFound', null);
                            } else {
                                callback(null, results);
                            }
                        });
                    }
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.cId
        * @params {Number} query.uId
        */
        lines: (query, callback) => {
            let sql = 'SELECT chatLine.*' +
                ', ' + SQL.CHAT_AGENCY_CONCAT +
                ', ' + SQL.CHAT_USER_CONCAT +
                ' FROM chatLine ' +
                'LEFT JOIN user ON chatLine.uId=user.id ' +
                'LEFT JOIN agency ON chatLine.uId=agency.id ' +
                'WHERE chatLine.cId=? ' +
                'GROUP BY chatLine.id ' +
                'ORDER BY chatLine.createdAt DESC LIMIT ?,?';
            let sqlParams = [];
            sqlParams.push(query.cId);
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        async.each(results, (chatLine, callback) => {
                            let i = results.indexOf(chatLine);
                            results[i] = DBFormat.chatLine(chatLine);
                            if (chatLine.hId) {
                                Models.house().get.findById({ hId: chatLine.hId, uId: query.uId }, (err, house) => {
                                    chatLine.house = house;
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        }, (err) => {
                            if (err || !results[0]) {
                                callback('ResourceNotFound', null);
                            } else {
                                callback(null, results);
                            }
                        });
                    }
                });
            });
        },
        lineById: (query, callback) => {
            let sql = 'SELECT chatLine.*' +
                ', ' + SQL.CHAT_AGENCY_CONCAT +
                ', ' + SQL.CHAT_USER_CONCAT +
                ' FROM chatLine ' +
                'LEFT JOIN user ON chatLine.uId=user.id ' +
                'LEFT JOIN agency ON chatLine.uId=agency.id ' +
                'WHERE chatLine.id=? ' +
                'GROUP BY chatLine.id ' +
                'ORDER BY chatLine.createdAt DESC';
            let sqlParams = [];
            sqlParams.push(query.clId);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
/*                        let chatLine = DBFormat.chatLine(results[0]);
                        console.log(chatLine);*/
                        async.each(results, (chatLine, callback) => {
                            let i = results.indexOf(chatLine);
                            results[i] = DBFormat.chatLine(chatLine);
                            if (chatLine.hId) {
                                Models.house().get.findById({ hId: chatLine.hId, uId: query.uId }, (err, house) => {
                                    chatLine.house = house;
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        }, (err) => {
                            if (err || !results[0]) {
                                callback('ResourceNotFound', null);
                            } else {
                                callback(null, results);
                            }
                        });
                    }
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.cId
        * @params {Number} query.uId
        */
        houses: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.CHAT_AGENCY_CONCAT +
                ', ' + SQL.CHAT_USER_CONCAT +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ' FROM chatLine ' +
                'LEFT JOIN house ON chatLine.hId=house.id ' +
                'LEFT JOIN user ON chatLine.uId=user.id ' +
                'LEFT JOIN agency ON chatLine.uId=agency.uId ' +
                'LEFT JOIN housePhoto ON chatLine.hId=housePhoto.hId ' +
                'WHERE chatLine.cId=? AND housePhoto.order=0 ' +
                'GROUP BY house.id ' +
                'ORDER BY chatLine.createdAt DESC LIMIT ?,?';
            let sqlParams = [];
            sqlParams.push(query.cId);
            sqlParams.push(query.from);
            sqlParams.push(query.count);

            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    if (connection) connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
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
                    }
                });
            });
        },
    },

    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    create: {
        /*
        * @params {Number} query.uIdA
        * @params {Number} query.uIdB
        */
        chat: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                let sql = 'SELECT * FROM chat WHERE (uIdA=? AND uIdB=?) OR (uIdA=? AND uIdB=?)';
                let sqlParams = [query.uIdA, query.uIdB, query.uIdB, query.uIdA];
                connection.query(sql, sqlParams, (err, results) => {
                    if (err || !results[0]) {
                        connection.query('INSERT INTO chat SET ?', query, (err, result) => {
                            connection.release();
                            const cId = result.insertId;
                            callback(null, cId.toString());
                        });
                    } else {
                        connection.query('UPDATE chat SET updatedAt=? WHERE (uIdA=? AND uIdB=?) OR (uIdA=? AND uIdB=?)',
                            [new Date(), query.uIdA, query.uIdB, query.uIdB, query.uIdA], (err, result) => {
                                connection.release();
                                callback(null, results[0].id.toString());
                            });
                    }
                });
            });
        },
        /*
        * @params {Number} query.uId
        * @params {Number} query.cId
        * @params {Number} query.hId (option)
        * @params {String} query.text (option)
        * @params {String} query.url (option)
        */
        chatLine: (query, callback) => {
            // 1. 채팅 라인 생성
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO chatLine SET ?', query, (err, result) => {
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    const clId = result.insertId;
                    // 2. 채팅방 updatedAt 업데이트
                    // 3. 채팅방 count 업데이트
                    connection.query('UPDATE chat SET updatedAt=?, count=count+1 WHERE id=?', [new Date(), query.cId], (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', null);
                            return;
                        }
                        callback(null, clId.toString());
                    });
                    Models.notification().push.send.chat({
                        cId: query.cId,
                        uId: query.uId,
                        text: query.text,
                    });
                });
            });
        },
    },
    /*
    * @params {Number} query.cId
    */
    resetChatCount: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('UPDATE chat SET count=0 WHERE id=?', [query.cId], (err, result) => {
                connection.release();
                callback(null, true);
            });
        });
    },
    /////////////////////////////////////////////
    //////     Functions                  ///////
    /////////////////////////////////////////////
    /*
    * @params {String} query.title
    * @params {String} query.response
    * @params {Number} query.uIdA // 중개사
    * @params {Number} query.uIdB // 일반 사용자
    * @params {Array} query.hIds
    * @params {Number} query.cId
    * @params {Object} query.house
    */
    _houseAdded: (query, callback) => {
        try {
            async.waterfall([
                (callback) => {
                    async.each(query.hIds, (hId, callback) => {
                        Models.chat().create.chatLine({
                            uId: query.uIdA,
                            cId: query.cId,
                            hId: hId,
                        }, () => {
                            callback();
                        });
                    }, () => {
                        callback(null);
                    });
                },
                (callback) => {
                    Models.chat().create.chatLine({
                        uId: query.uIdA,
                        cId: query.cId,
                        text: query.response,
                    }, () => {
                        callback(null);
                    });
                },
                (callback) => {
                    Models.chat().create.chatLine({
                        uId: query.uIdB,
                        cId: query.cId,
                        text: '4. 면적: ' + query.house.area + 'm²/' + query.house.areaForExclusiveUse + 'm²',
                    }, () => {
                        callback(null);
                    });
                },
                (callback) => {
                        Models.chat().create.chatLine({
                            uId: query.uIdB,
                            cId: query.cId,
                            text: '3. 희망가격: ' + ConvertHelper.convertNumber2Won(query.house.price),
                        }, () => {
                            callback(null);
                        });
                },
                (callback) => {
                    Models.chat().create.chatLine({
                        uId: query.uIdB,
                        cId: query.cId,
                        text: '2. 거래방법: ' + ConvertHelper.houseDealingType[query.house.dealingType.toString()],
                    }, () => {
                        callback(null);
                    });
                },
                (callback) => {
                    Models.chat().create.chatLine({
                        uId: query.uIdB,
                        cId: query.cId,
                        text: '1. 매물의 종류: ' + ConvertHelper.houseType[query.house.type ? query.house.type.toString() : query.house.houseType.toString()],
                    }, () => {
                        callback(null);
                    });
                },
                (callback) => {
                    Models.chat().create.chatLine({
                        uId: query.uIdB,
                        cId: query.cId,
                        text: query.title,
                    }, () => {
                        callback(null);
                    });
                },
            ], (err) => {
                callback(null);
            });
        } catch (e) {
            callback(e);
        }
    },
    delete: {
        /*
        * @params {Number} query.cId
        */
        chats: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('DELETE FROM chat WHERE id=?', [query.cId], (err, result) => {
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
module.exports = Chat;

