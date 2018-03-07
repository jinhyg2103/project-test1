const async = require('async');
const fs = require('fs');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const Report = {

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /**
         * @param {number} query.from
         * @param {number} query.count
         * @param {number} query.searchQuery
         */
        search: (query, callback) => {
            let sql = 'SELECT report.*, user.name, user.id AS uId' +
                ' FROM report ' +
                'LEFT JOIN user ON report.uId=user.id';
            let sqlParams = [];
            if (query.searchQuery) {
                sql += ' WHERE report.title LIKE ? OR user.name LIKE ?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery + '%');
            }
            // Sort
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
        /*
        * @params {String} query.searchQuery
         */
        search: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM report ' +
                'LEFT JOIN user ON report.uId=user.id';
            let sqlParams = [];
            if (query.searchQuery) {
                sql += ' WHERE report.title LIKE ? OR user.name LIKE ?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery + '%');
            }
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
    /**
     * @param {number} query.uId
     * @param {string} query.email
     * @param {string} query.title
     * @param {string} query.description
     */
    create: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            // Save Travel
            connection.query('INSERT INTO report SET ?', query, (err, result) => {
                connection.release();
                callback(null, true);
            });
        });
    },

    ////////////////////////////////////
    //////       Init            ///////
    ////////////////////////////////////

}
module.exports = Report;
