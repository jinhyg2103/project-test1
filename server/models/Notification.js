const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
/*const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.applicationDefault(),
    databaseURL: 'https://Jivida.firebaseio.com',
});*/

// Config
const c = require('../config/const.json');
const Models = require(__base + 'models/index');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const Notification = {
    sms: {
        ////////////////////////////////////
        //////////       GET      //////////
        ////////////////////////////////////
        get: {
            /*
            * @params {Date} query.year
            * @params {Date} query.month
            */
            usage: (query, callback) => {
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('SELECT * FROM smsUsage WHERE year=? AND month=?', [query.year, query.month], (err, results) => {
                        connection.release();
                        if (err || !results[0]) {
                            callback(null, { count: 0 });
                        } else {
                            callback(null, results[0]);
                        }
                    });
                });
            },
            /*
            */
            setting: (query, callback) => {
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('SELECT * FROM smsSetting WHERE id=1', (err, results) => {
                        connection.release();
                        callback(null, results[0]);
                    });
                });
            },
        },
        /////////////////////////////////////////////
        //////     CREATE / UPDATE / DELETE   ///////
        /////////////////////////////////////////////
        update: {
            /*
            * @params {Number} query.count
            */
            usage: (query, callback) => {
                let date = new Date();
                let thisYear = date.getFullYear();
                let thisMonth = date.getMonth() + 1; // month는 0부터 시작해서 1을 더해주어야함 (1월이 0임)
                let hasUsageData = false;
                dbConnectionHelper.getConnection((err, connection) => {
                    async.waterfall([
                        (callback) => {
                            connection.query('SELECT * FROM smsUsage WHERE year=? AND month=?', [thisYear, thisMonth], (err, results) => {
                                if (!err && results[0]) {
                                    hasUsageData = true;
                                }
                                callback(null);
                            });
                        },
                    ], (data) => {
                        if (hasUsageData) {
                            connection.query('UPDATE smsUsage SET count=count+1 WHERE year=? AND month=?', [thisYear, thisMonth], (err, result) => {
                                connection.release();
                                callback(null, true);
                            });
                        } else {
                            connection.query('INSERT INTO smsUsage SET ?', [{
                                year: thisYear,
                                month: thisMonth,
                                count: 1,
                            }], (err, result) => {
                                connection.release();
                                callback(null, true);
                            });
                        }
                    });
                });
            },
            /*
            * @params {Boolean} query.isSend
            */
            setting: (query, callback) => {
                query.updatedAt = new Date();
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('UPDATE smsSetting SET ? WHERE id=1', [{ isSend: query.isSend }], (err, result) => {
                        connection.release();
                        callback(null, true);
                    });
                });
            },
        },
    },
    push: {
        ////////////////////////////////////
        //////////       GET      //////////
        ////////////////////////////////////

        /////////////////////////////////////////////
        //////     CREATE / UPDATE / DELETE   ///////
        /////////////////////////////////////////////
        send: {
            /*
            * @params {String} query.text
            * @params {Number} query.uIdTo
            */
            one: (query, callback) => {

            },
            /*
            * @params {String} query.description
            * @params {Number} query.uId
            */
            all: (query, callback) => {
                if (!query.description || !query.uId) {
                    callback('InvalidQueryParameterValue', null);
                    return null;
                } else {
                    dbConnectionHelper.getConnection((err, connection) => {
                        connection.query('SELECT * FROM user WHERE androidToken IS NOT NULL OR iphoneToken IS NOT NULL', (err, results) => {
                            connection.release();
                            async.each(results, (user, callback) => {
                                console.log('--------------');
                                console.log(user.name);
                                console.log(user.androidToken);
                                console.log(user.iphoneToken);
                            }, (err) => {
                                callback(null, true);
                            });
                        });
                    });
                    callback(null, true);
                }
            },
        },
    },
}
module.exports = Notification;

