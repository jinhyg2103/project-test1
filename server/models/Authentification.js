const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const async = require('async');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connection Helper
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');

const Models = require(__base + 'models/index');

// Libraries
const Popbill = require(__base + 'lib/popbill/index');
const Aws = require(__base + 'lib/aws/aws');

const Authentification = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    /**
     * @param {Object} query
     * @param {string} query.id **required
     * @param {Callback} callback
     */
    session: (query, callback) => {
        Models.user().get.findById(query, callback);
    },

    /**
     * @param {string} query.countryDialCode **required
     * @param {string} query.phoneNumber **required
     * @param {string} query.langCode **required
     */
    getVerificationCode: (query, callback) => {
        if (query.phoneNumber.substring(0, 1) == 0) {
            query.phoneNumber = query.phoneNumber.substring(1);
        }
        const fullPhoneNumber = query.countryDialCode + query.phoneNumber;
        const verificationCode = Math.floor(Math.random() * 900000) + 100000;
        let message = '인증번호(xxxx)를 정확히 입력해주세요. [지비다]';
        message = message.replace('xxxx', verificationCode);
        Popbill.sms().send.multi({
            phoneNumbers: [query.phoneNumber],
            messages: [message],
            isAds: false,
        }, (err, result) => {
            console.log(err);
            console.log(result);
            console.log(verificationCode.toString());
            callback(null, { verificationCode: verificationCode.toString() });
        });
    },

    /**
     * @param {string} query.idText **required
     */
    isIdExist: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE idText=?', [query.idText], (err, results) => {
                // Has result?
                if (err || !results[0]) {
                    callback(null, true);
                } else {
                    callback('EmailAlreadyExists', null);
                }
                connection.release();
            });
        });
    },
    /**
     * @param {string} query.countryDialCode **required
     * @param {string} query.phoneNumber **required
     */
    isPhoneNumberExist: (query, callback) => {
        if (query.phoneNumber.substring(0, 1) == 0) {
            query.phoneNumber = query.phoneNumber.substring(1);
        }
        query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE fullPhoneNumber=? AND type <> 9', [query.fullPhoneNumber], (err, results) => {
                // Has result?
                if (err || results.length == 0) {
                    callback(null, true);
                } else {
                    callback('EmailAlreadyExists', null);
                }
                connection.release();
            });
        });
    },
    find: {
        /**
         * @param {string} query.countryDialCode **required
         * @param {string} query.phoneNumber **required
         */
        idText: (query, callback) => {
            if (query.phoneNumber.substring(0, 1) == 0) {
                query.phoneNumber = query.phoneNumber.substring(1);
            }
            query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('SELECT * FROM user WHERE fullPhoneNumber=' + query.fullPhoneNumber, (err, results) => {
                    if (err || results.length == 0) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, results[0].idText);
                    }
                    connection.release();
                });
            });
        },
    },
    ////////////////////////////////////
    //////     Create / Update   ///////
    ////////////////////////////////////
    /**
     * @param {string} query.idText **required
     * @param {string} query.password **required
     */
    login: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE idText=?', [query.idText], (err, results) => {
                // Has result?
                if (err || results.length == 0) {
                    callback('InvalidAuthenticationEmail', null);
                    connection.release();
                    return;
                }

                // Password Collect?
                let user = JSON.parse(JSON.stringify(results[0]));
                bcrypt.compare(query.password, user.password, (err, isCollect) => {
                    if (isCollect) {
                        Models.user().get.findById({ id: user.id, uId: user.id }, callback);
                    } else {
                        callback('InvalidAuthenticationPassword', null);
                    }
                    connection.release();
                });
            });
        });
    },
    /**
     * @param {Object} query
     * @param {number} query.countryDialCode **required
     * @param {number} query.phoneNumber **required
     * @param {string} query.idText **required
     * @param {string} query.name **required
     * @param {string} query.password **required
     * @param {string} query.email
     * @param {Number} query.type **required // 1: 일반회원, 2: 중개사 // 9: 비회원 중개사
     * @param {Callback} callback
     */
    signup: (query, callback) => {
        console.log(query);
        let uId;
        let cbErr;
        dbConnectionHelper.getConnection((err, connection) => {
            async.waterfall([
                (callback) => {
                    if (query.phoneNumber.substring(0, 1) == 0) {
                        query.phoneNumber = query.phoneNumber.substring(1);
                    }
                    query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;

                    // 비밀번호 암호화
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(query.password, salt, (err, hash) => {
                            query.password = hash;
                            callback(null);
                        });
                    });
                },
                (callback) => {
                    connection.query('SELECT * FROM user WHERE idText=? OR fullPhoneNumber=?', [query.idText, query.fullPhoneNumber], (err, results) => {
                        if (results[0] && results[0].type == 9) {
                            connection.query('UPDATE user SET ? WHERE id = ?', [query, results[0].id], (err, result) => {
                                uId = results[0].id;
                                callback(null);
                            });
                        } else if (!err && results.length > 0 && results[0].type != 9) {
                            cbErr = 'EmailAlreadyExists';
                            callback(null);
                        } else {
                            connection.query('INSERT INTO user SET ?', query, (err, result) => {
                                console.log(err);
                                console.log(result);
                                if (err || !result) {
                                    cbErr = 'InvalidAuthenticationInfo';
                                    callback(null);
                                } else {
                                    uId = result.insertId;
                                    callback(null);
                                }
                            });
                        }
                    });
                },
            ], (err) => {
                connection.release();
                if (cbErr) {
                    callback(cbErr, null);
                } else {
                    Models.user().get.findById({ id: uId, uId: uId }, callback);
                }
            });
        });
    },
    password: {
        /**
         * @param {number} query.countryDialCode
         * @param {number} query.phoneNumber
         * @param {number} query.idText
         *
         * @param {number} query.uId
         * @param {number} query.currentPassword
         *
         * @param {string} query.password **required
         * @param {Callback} callback
         */
        change: (query, callback) => {
            async.waterfall([
                (callback) => {
                    if (query.phoneNumber) {
                        if (query.phoneNumber.substring(0, 1) == 0) {
                            query.phoneNumber = query.phoneNumber.substring(1);
                        }
                        query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
                    }

                    // 비밀번호 암호화
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(query.password, salt, (err, hash) => {
                            query.password = hash;
                            if (query.currentPassword) {
                                bcrypt.hash(query.currentPassword, salt, (err, hash) => {
                                    query.currentPassword = hash;
                                    callback(null);
                                });
                            } else {
                                callback(null);
                            }
                        });
                    });
                },
            ], (err) => {
                dbConnectionHelper.getConnection((err, connection) => {
                    console.log(query);
                    if (query.currentPassword) {
                        // 비밀번호 암호화
                        connection.query('UPDATE user SET password = ? WHERE id=?', [query.password, query.uId], (err, results) => {
                            connection.release();
                            if (err) {
                                callback('InvalidAuthenticationInfo', null);
                                return;
                            }
                            callback(null, true);
                        });
                    } else {
                        connection.query('UPDATE user SET password = ? WHERE fullPhoneNumber=? AND idText=?', [query.password, query.fullPhoneNumber, query.idText], (err, results) => {
                            connection.release();
                            if (err || results.changedRows == 0) {
                                callback('InvalidAuthenticationInfo', null);
                                return;
                            }
                            callback(null, true);
                        });
                    }
                });
            });
        },
    },
}
module.exports = Authentification;


////////////////////////////////////
//////       Init            ///////
////////////////////////////////////
passport.use(new PassportLocalStrategy({
        usernameField: 'idText',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (request, idText, password, done) => {
        Authentification.login({
            idText: idText,
            password: password,
        }, (err, doc) => {
            if (!err && doc) {
                done(null, doc);
            } else {
                done(err, false, { message: err });
            }
        });
    }));

passport.serializeUser((user, done) => {
    let sessionUser = {
        id: user.id,
        fullPhoneNumber: user.fullPhoneNumber,
        countryDialCode: user.countryDialCode,
        phoneNumber: user.phoneNumber,
        androidToken: user.androidToken,
        iphoneToken: user.iphoneToken,
        name: user.name,
        email: user.email,
    };
    done(null, sessionUser);
    //로그인 로그를 여기서 저장해주어야함
});

passport.deserializeUser((user, done) => {
    done(null, user);
});