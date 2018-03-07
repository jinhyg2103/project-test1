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
const Gps = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /**
         * @param {number} query.from
         * @param {number} query.count
         * @param {number} query.searchQuery
         */
        access: (query, callback) => {
            let sql = 'SELECT *' +
                ' FROM gpsAccess';
            let sqlParams = [];
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, results);
                    }
                });
            });
        },
        /**
         * @param {number} query.from
         * @param {number} query.count
         */
        usage: (query, callback) => {
            let sql = 'SELECT *' +
                ' FROM gpsUsage';
            let sqlParams = [];
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, results);
                    }
                });
            });
        },
        /**
         * @param {number} query.from
         * @param {number} query.count
         */
        read: (query, callback) => {
            let sql = 'SELECT *' +
                ' FROM gpsRead';
            let sqlParams = [];
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, results);
                    }
                });
            });
        },
    },
    count: {
        /**
         */
        access: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM gpsAccess';
            let sqlParams = [];
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        /**
         */
        usage: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM gpsUsage';
            let sqlParams = [];
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        /**
         */
        read: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM gpsRead';
            let sqlParams = [];
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
    create: {
        /*
        * 위치정보 시스템 접근기록 사실: 관리자 로그인 및 위치정보 이용사실 조회 기록을 만듬
        * @params {Number} query.uId
        * @params {String} query.description //무슨 목적인지에 대한 서술
        */
        access: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO gpsAccess SET ?', [{
                    uId: query.uId,
                    description: query.description,
                }], (err, result) => {
                    connection.release();
                    callback(null, true);
                });
            });
        },
        /*
        * 위치정보 사용 내역: 위치정보를 제공한 사람은 누구이고, 언제 제공하였고, 접근경로는 무엇인지에 대한 기록
        * '제공자', '접근경로', '제공서비스', '요청자', '제공일시'
        * @params {Number} query.uIdFrom
        * @params {Number} query.uIdTo
        * @params {String} query.device
        */
        usage: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO gpsUsage SET ?', [{
                    uIdFrom: query.uIdFrom,
                    uIdTo: query.uIdTo,
                    device: query.device,
                }], (err, result) => {
                    connection.release();
                    callback(null, true);
                });
            });
        },
        /*
        * 위치정보 제공사실 열람 내역: 위치정보를 어떤 요청자에게 어떤 목적으로 열람허락하였는지에 대한 기록
        * @params {Number} query.uId //요청자의 uId
        * @params {String} query.description //무슨 목적인지에 대한 서술
        */
        read: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO gpsRead SET ?', [{
                    uIdTo: query.uIdTo,
                    description: query.description,
                }], (err, result) => {
                    connection.release();
                    callback(null, true);
                });
            });
        },
    },
}

module.exports = Gps;

