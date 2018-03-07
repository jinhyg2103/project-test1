const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const async = require('async');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connection Helper
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const User = {

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /**
         * @param {string} query.searchQuery
         * @param {number} query.from
         * @param {number} query.count
         * @param {Boolean} query.isCertified
         * @param {Boolean} query.notRegistered
         */
        search: (query, callback) => {
            let sql = 'SELECT user.*' +
                ', ' + SQL.USER_AGENCY_CONCAT +
                ', agencyLicense.url AS agencyLicense, agencyRegistrationCertificate.url AS agencyRegistrationCertificate' +
                ' FROM user' +
                ' LEFT JOIN agency ON user.id=agency.uId' +
                ' LEFT JOIN agencyLicense ON user.id=agencyLicense.uId' +
                ' LEFT JOIN agencyRegistrationCertificate ON user.id=agencyRegistrationCertificate.uId';
                let sqlParams = [];
            if (query.searchQuery || query.isCertified == false || query.notRegistered == true) {
                sql += ' WHERE';
            }
            if (query.searchQuery) {
                sql += ' user.name LIKE ? OR user.id=? OR agency.agencyName LIKE ?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery);
                sqlParams.push(query.searchQuery + '%');
            }
            if (query.isCertified == false) {
                sql += ' agency.isCertified=?';
                sqlParams.push(query.isCertified);
            }
            if (query.notRegistered == true) {
                sql += ' user.type=9';
            }
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
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
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /**
         * @param {string} query.id **required
         * @param {string} query.uId
         */
        findById: (query, callback) => {
            let sql = 'SELECT user.* ' +
                ', ' + SQL.USER_AGENCY_CONCAT +
                ', ' + SQL.USER_FAVORITE +
                ' FROM user ' +
                'LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE user.id=?';
            let sqlParams = [];
            sqlParams.push(query.uId); // SQL.USER_FAVORITE
            sqlParams.push(query.id);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release(); // Done with the connection.
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, DBFormat.user(results[0]));
                    }
                });
            });
        },
        /**
         * @param {string} query.uId
         * @param {number} query.from
         * @param {number} query.count
         */
        favoriteUsers: (query, callback) => {
            let sql = 'SELECT user.*' +
                ', true AS isFavorite' +
                ' FROM user ' +
                'WHERE user.id IN (SELECT uIdTo FROM userFavorite WHERE uIdTo=user.id AND uIdFrom=?) AND user.type=1';
            let sqlParams = [];
            sqlParams.push(query.uId);
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.user(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /**
         * @param {string} query.uId
         * @param {number} query.from
         * @param {number} query.count
         */
        favoriteAgencies: (query, callback) => {
            let sql = 'SELECT user.*' +
                ', ' + SQL.USER_AGENCY_CONCAT +
                ', true AS isFavorite' +
                ' FROM user ' +
                'LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE agency.isCertified=1 AND user.id IN (SELECT uIdTo FROM userFavorite WHERE uIdTo=user.id AND uIdFrom=?) AND user.type=2';
            let sqlParams = [];
            sqlParams.push(query.uId);
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
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
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /**
         * @param {Number} query.uId
         * @param {Number} query.leftTop.longitude
         * @param {Number} query.leftTop.latitude
         * @param {Number} query.rightBottom.longitude
         * @param {Number} query.rightBottom.latitude
         *
         * @param {String} query.si
         * @param {String} query.gu
         * @param {String} query.dong
         */
        nearAgencyIds: (query, callback) => {
            let sql = 'SELECT user.id' +
                ' FROM user ' +
                'LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE (agency.isCertified=1 OR user.type = 9) ' +
                'AND user.id <> ? ';
            let sqlParams = [];
            sqlParams.push(query.uId);
            if (query.leftTop && query.rightBottom) {
                sql += 'AND agency.longitude < ? AND agency.longitude > ? ';
                sql += 'AND agency.latitude < ? AND agency.latitude > ? ';
                sqlParams.push(query.leftTop.longitude);
                sqlParams.push(query.rightBottom.longitude);
                sqlParams.push(query.rightBottom.latitude);
                sqlParams.push(query.leftTop.latitude);
            } else {
                if (query.si) {
                    sql += 'AND agency.state = ? ';
                    sqlParams.push(query.si);
                }
                if (query.gu) {
                    sql += 'AND agency.city LIKE ? ';
                    sqlParams.push(query.gu + '%');
                }
                if (query.dong) {
                    sql += 'AND agency.address1 = ? ';
                    sqlParams.push(query.dong);
                }
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results[0]) {
                        callback('ResourceNotFound', null);
                    } else {
                        let ids = [];
                        async.each(results, (user, callback) => {
                            ids.push(user.id);
                            callback();
                        }, (err) => {
                            callback(null, ids);
                        });
                    }
                });
            });
        },
    },
    count: {
        /**
         * @param {string} query.searchQuery
         * @param {Boolean} query.isCertified
         * @param {Boolean} query.notRegistered
         */
        search: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM user' +
                ' LEFT JOIN agency ON user.id=agency.uId';
            let sqlParams = [];
            if (query.searchQuery || query.isCertified == false || query.notRegistered == true) {
                sql += ' WHERE';
            }
            if (query.searchQuery) {
                sql += ' user.name LIKE ? OR user.id=? OR agency.agencyName LIKE ?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery);
                sqlParams.push(query.searchQuery + '%');
            }
            if (query.isCertified == false) {
                sql += ' agency.isCertified=?';
                sqlParams.push(query.isCertified);
            }
            if (query.notRegistered == true) {
                sql += ' agency.isCertified=?';
                sqlParams.push(query.isCertified);
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        favoriteUsers: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM user' +
                ' LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE user.id IN (SELECT uIdTo FROM userFavorite WHERE uIdTo=user.id AND uIdFrom=?)';
            let sqlParams = [];
            sqlParams.push(query.uId);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        favoriteAgencies: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM user' +
                ' LEFT JOIN agency ON user.id=agency.uId ' +
                'WHERE agency.isCertified=1 AND user.id IN (SELECT uIdTo FROM userFavorite WHERE uIdTo=user.id AND uIdFrom=?)';
            let sqlParams = [];
            sqlParams.push(query.uId);
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
    update: {
        user: (query, callback) => {
            let uId = query.uId;
            delete query.uId;
            async.waterfall([
                (callback) => {
                    if (query.password) {
                        // 비밀번호 암호화
                        bcrypt.genSalt(saltRounds, (err, salt) => {
                            bcrypt.hash(query.password, salt, (err, hash) => {
                                query.password = hash;
                                callback(null);
                            });
                        });
                    } else {
                        callback(null);
                    }
                },
            ], (err) => {
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('UPDATE user SET ? WHERE id=?', [query, uId], (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', null);
                            return;
                        }
                        callback(null, true);
                    });
                });
            });
        },
    },
    /*
    * @params {Number} query.hId
    */
    delete: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('DELETE FROM user WHERE id=?', [query.uId], (err, result) => {
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
    * @params {Number} query.uIdFrom
    * @params {Number} query.uIdTo
    */
    favorite: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM userFavorite WHERE uIdFrom=? AND uIdTo=?', [query.uIdFrom, query.uIdTo], (err, results) => {
                if (!err && results.length > 0) { // already like
                    connection.query('DELETE FROM userFavorite WHERE uIdFrom=? AND uIdTo=?', [query.uIdFrom, query.uIdTo], (err, result) => {
                        connection.release();
                        callback(null, false);
                    });
                } else {
                    connection.query('INSERT INTO userFavorite SET ?', query, (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', false);
                            return;
                        }
                        callback(null, true);
                    });
                }
            });
        });
    },
}
module.exports = User;

