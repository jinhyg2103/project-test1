const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
const Models = require(__base + 'models/index');

// Config
const c = require('../config/const.json');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');

const Agency = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////

    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    /*
    * @params {Number} query.uId
    * @params {Number} query.type // 개설 공인중개사(1), 소속 공인중개사(2), 중개 보조원(3) // 비회원 중개사(9)
    * @params {String} query.registrationNumber // 사업자번호
    * @params {String} query.ceoName
    * @params {String} query.agencyName // 중개사무소명
    * @params {Number} query.countryDialCode
    * @params {Number} query.phoneNumber
    * @params {String} query.state
    * @params {String} query.city
    * @params {String} query.address1
    * @params {String} query.address2
    * @params {String} query.addressFull
    * @params {String} query.isCertified (option)
    */
    create: (query, callback) => {
        console.log(query);
        query.address1 = query.address1.replace(/[0-9]/g, '');
        if (query.phoneNumber.substring(0, 1) == 0) {
            query.phoneNumber = query.phoneNumber.substring(1);
        }
        query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
        let cbErr;
        let isUnregisteredAgency = false;
        let aId;
        try {
            dbConnectionHelper.getConnection((err, connection) => {
                async.waterfall([
                    (callback) => {
                        connection.query('SELECT * FROM agency WHERE uId=?', [query.uId], (err, results) => {
                            // 1. 비회원 초기등록 때는 User type을 바꾸지 않고 만들어주어야 한다.
                            // 1. 비회원 등록되어있을 때는 type을 바꿔주어야 한다
                            // 3. 이미 등록 되어있을 때는 아무 액션도 하지 않는다.
                            // 4. 등록한다
                            if (query.type == 9) {
                                callback(null);
                            } else if (results[0] && results[0].type == 9) {
                                connection.query('UPDATE agency SET ? WHERE id = ?', [query, results[0].id], (err, result) => {
                                    aId = results[0].id;
                                    connection.query('UPDATE user SET type=2 WHERE id=?', [query.uId], (err, result) => {});
                                    isUnregisteredAgency = true;
                                    callback(null);
                                });
                            } else if (!err && results.length > 0 && results[0].type != 9) {
                                cbErr = 'EmailAlreadyExists';
                                callback(null);
                            } else {
                                connection.query('UPDATE user SET type=2 WHERE id=?', [query.uId], (err, result) => {
                                    callback(null);
                                });
                            }
                        });
                    },
                    (callback) => {
                        if (aId || cbErr || isUnregisteredAgency) {
                            callback(null);
                        } else {
                            connection.query('INSERT INTO agency SET ?', query, (err, result) => {
                                if (err && !result) {
                                    cbErr = 'ResourceTypeMismatch';
                                    connection.query('UPDATE user SET type=1 WHERE id=?', [query.uId], (err, result) => {
                                        callback(null);
                                    });
                                } else {
                                    aId = result.insertId;
                                }
                                callback(null);
                            });
                        }
                    },
                ], (err) => {
                    connection.release();
                    if (cbErr) {
                        callback(cbErr, null);
                    } else {
                        callback(null, aId.toString());
                    }
                });
            });
        } catch(e) {
            console.log('----err');
            console.log(e);
        }

    },
    /*
    * @params {Number} query.uId
    * @params {Number} query.aId
    * @params {String} query.url
    */
    createLicense: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('INSERT INTO agencyLicense SET ?', query, (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch');
                    return;
                }
                callback(null);
            });
        });
    },
    /*
    * @params {Number} query.uId
    * @params {Number} query.aId
    * @params {String} query.url
    */
    createRegistrationCertificate: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('INSERT INTO agencyRegistrationCertificate SET ?', query, (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch');
                    return;
                }
                callback(null);
            });
        });
    },
    /**
     * @param {number} query.countryDialCode
     * @param {number} query.phoneNumber
     * @param {number} query.officePhoneNumber
     * @param {string} query.ceoName
     * @param {string} query.agencyName
     * @param {String} query.state
     * @param {String} query.city
     * @param {string} query.address1
     * @param {string} query.address2
     * @param {string} query.longitude
     * @param {string} query.latitude
     * @param {string} query.addressFull
     */
    createUnregisteredAgency: (query, callback) => {
        Models.auth().signup({
            countryDialCode: query.countryDialCode,
            phoneNumber: '' + query.phoneNumber,
            idText: 'agency' + query.phoneNumber,
            name: query.agencyName + ' - ' + query.ceoName,
            password: Math.floor(Math.random() * 900000) + 100000 + '-' + query.phoneNumber,
            email: '',
            type: 9,
            state: query.state,
            city: query.city,
            address1: query.address1.replace(/[0-9]/g, ''),
            address2: query.address2,
        }, (err, result) => {
            if (err)  {
                callback(err, null);
                return;
            }
            let uId = result.id;
            Agency.create({
                uId: uId,
                type: 9,
                registrationNumber: Math.floor(Math.random() * 900) + 100 + '-' + query.phoneNumber,
                ceoName: query.ceoName,
                agencyName: query.agencyName,
                countryDialCode: query.countryDialCode,
                phoneNumber: '' + query.officePhoneNumber,
                state: query.state,
                city: query.city,
                address1: query.address1.replace(/[0-9]/g, ''),
                address2: query.address2,
                addressFull: query.addressFull,
                longitude: query.longitude,
                latitude: query.latitude,
                isCertified: true,
            }, (err, aId) => {
                callback(null, true);
            });
        });
    },
    update: {
        /**
         * @param {number} query.uId **required
         * @param {number} query.countryDialCode
         * @param {number} query.phoneNumber
         * @param {string} query.type
         * @param {string} query.ceoName
         * @param {string} query.agencyName
         * @param {Number} query.type
         * @param {string} query.state
         * @param {string} query.city
         * @param {string} query.address1
         * @param {string} query.address2
         * @param {string} query.addressFull
         * @param {string} query.longitude
         * @param {string} query.latitude
         * @param {Boolean} query.isCertified
         * @param {Callback} callback
         */
        agency: (query, callback) => {
            let uId = query.uId;
            delete query.uId;
            if (query.phoneNumber) {
                if (query.phoneNumber.substring(0, 1) == 0) {
                    query.phoneNumber = query.phoneNumber.substring(1);
                }
                query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('UPDATE agency SET ? WHERE uId=?', [query, uId], (err, result) => {
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
module.exports = Agency;

