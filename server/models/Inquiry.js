const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

// Config
const c = require('../config/const.json');
const Models = require(__base + 'models/index');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const House = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /*
        * @params {Number} query.uIdUser
        * @params {Number} query.uIdAgency
        * @params {Number} query.from
        * @params {Number} query.count
        */
        search: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.INQUIRY_HOUSE +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.INQUIRY_USER_FROM_CONCAT +
                ' FROM inquiryHouse ' +
                'LEFT JOIN house ON inquiryHouse.hId=house.id ' +
                'LEFT JOIN user ON inquiryHouse.uIdAgency=user.id ' +
                'LEFT JOIN user userFrom ON inquiryHouse.uIdUser=userFrom.id ' +
                'LEFT JOIN agency ON inquiryHouse.uIdAgency=agency.uId ' +
                'LEFT JOIN housePhoto ON inquiryHouse.hId=housePhoto.hId AND housePhoto.order=0 ' +
                'WHERE (uIdUser=? OR uIdAgency=?) AND isExpired=0 AND isCanceled=0 AND agency.isCertified=1 ' +
                'GROUP BY inquiryHouse.id ' +
                'ORDER BY inquiryHouse.createdAt DESC LIMIT ?,?';
            let sqlParams = [];
            sqlParams.push(query.uIdUser);
            sqlParams.push(query.uIdAgency);
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
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
    count: {
        /*
        * @params {Number} query.uIdUser
        * @params {Number} query.uIdAgency
        */
        search: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM inquiryHouse' +
                ' WHERE (uIdUser=? OR uIdAgency=?) AND isExpired=0 AND isCanceled=0 ';
            let sqlParams = [];
            sqlParams.push(query.uIdUser);
            sqlParams.push(query.uIdAgency);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
    },
    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    /*
    * @params {Number} query.hId
    * @params {Number} query.uIdUser
    * @params {Number} query.uIdAgency
    * @params {Number} query.aId
    */
    create: (query, callback) => {
        // 이미 문의했을 경우, expired되지 않도록 날짜를 최신으로 업데이트
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM inquiryHouse WHERE hId=? AND uIdUser=? AND uIdAgency=?', [query.hId, query.uIdUser, query.uIdAgency], (err, results) => {
                if (err || !results[0]) {
                    connection.query('INSERT INTO inquiryHouse SET ?', query, (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', null);
                            return;
                        }
                        callback(null, 'success');
                    });
                } else {
                    connection.query('UPDATE inquiryHouse SET createdAt=?, isCanceled=0, isExpired=0', [new Date()], (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', null);
                            return;
                        }
                        callback(null, 'success');
                    });
                }
            });
        });
    },
    /*
    * @params {Number} query.ihId
    */
    accept: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('UPDATE inquiryHouse SET isAccepted=1 WHERE id=?', [query.ihId], (err, result) => {
                if (err || !result) {
                    callback('ResourceTypeMismatch', null);
                    return;
                }
                connection.query('SELECT * FROM inquiryHouse WHERE id=?', [query.ihId], (err, results) => {
                    if (err || !results[0]) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    Models.chat().create.chat({ uIdA: results[0].uIdUser, uIdB: results[0].uIdAgency }, (err, cId) => {
                        callback(null, results);
                        connection.query('SELECT * FROM house WHERE id=?', [results[0].hId], (err, houses) => {
                            connection.release();
                            Models.chat()._houseAdded({
                                title: '집 문의하기',
                                response: '고객님의 문의을 수락합니다.',
                                uIdA: results[0].uIdAgency,
                                uIdB: results[0].uIdUser,
                                hIds: [results[0].hId],
                                cId: cId,
                                house: houses[0],
                            }, () => {});
                        });
                    });
                });
            });
        });
    },
    /*
    * @params {Number} query.ihId
    */
    cancel: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('UPDATE inquiryHouse SET isCanceled=1, isAccepted=false WHERE id=?', [query.ihId], (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch', null);
                    return;
                }
                callback(null, true);
            });
        });
    },
}
module.exports = House;

