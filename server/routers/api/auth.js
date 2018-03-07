const async = require('async');
const fs = require('fs');
const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const Router = require('express');

const responseHelper = require(__base + 'lib/responseHelper');
const authValidHelper = require(__base + 'middleware/authValidHelper');
const Models = require(__base + 'models/index');

module.exports = () => {
    const router = Router();
    router.post('/auth/login', (request, response, next) => {
        console.log('(POST) controller/api/auth.js :: /auth/login called');
        passport.authenticate('local', (err, user) => {
            if (err || !user) {
                console.error('(GET) controller/api/auth.js :: /auth/login failed');
                responseHelper.err_send(err || 'AuthenticationFailed', response);
                return;
            }
            request.logIn(user, (err) => {
                responseHelper.success_send(200, user, response);
            });
        })(request, response, next);
    });
    router.get('/auth/logout', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/logout called');
        request.logout();
        request.logOut();
        response.clearCookie('accessToken');
        responseHelper.success_send(200, true, response);
    });
    router.post('/auth/logout', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/logout called');
        request.logout();
        request.logOut();
        response.clearCookie('accessToken');
        responseHelper.success_send(200, true, response);
    });

    // 회원가입
    router.post('/auth/signup', (request, response, next) => {
        console.log('(POST) controller/api/auth.js :: /auth/signup called');
        const query = {
            idText: request.body.idText,
            countryDialCode: request.body.countryDialCode,
            phoneNumber: request.body.phoneNumber,
            password: request.body.password,
            name: request.body.name,
            email: request.body.email || null,
            state: request.body.state || null,
            city: request.body.city || null,
            address1: request.body.address1 || null,
            address2: request.body.address2 || null,
            type: Number(request.body.type) || 1,
        };
        Models.auth().signup(query, (err, user) => {
            if (user) {
                passport.authenticate('local', (err, user) => {
                    if (user) {
                        request.logIn(user, (err) => {
                            responseHelper.success_send(200, user, response);
                        });
                    } else {
                        responseHelper.err_send('InternalError', response);
                    }
                })(request, response, next);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    router.get('/auth/session', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/auth.js :: /auth/session called');
        let query = {
            id: request.user.id,
        };
        Models.auth().session(query, (err, doc) => {
            if (!err) {
                responseHelper.success_send(200, doc, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    // 휴대폰인증번호
    router.get('/auth/sms/getVerificationCode', (request, response) => {
        console.log('(GET) controller/api/auth.js :: /auth/sms/getVerificationCode called');
        const query = {
            countryDialCode: 82,
            phoneNumber: request.query.phoneNumber,
            langCode: request.query.langCode || 'zh',
            force: request.query.force || false,
        };
        Models.auth().isPhoneNumberExist(query, (err, notExist) => {
            if (notExist || query.force) {
                Models.auth().getVerificationCode(query, (err, verificationCode) => {
                    if (!err) {
                        responseHelper.success_send(200, verificationCode, response);
                    } else {
                        responseHelper.err_send(err, response);
                    }
                });
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    // ID 중복 검사
    router.get('/auth/is/idDuplicated', (request, response) => {
        console.log('(GET) controller/api/auth.js :: /auth/sms/idDuplicated called');
        const query = {
            idText: request.query.idText || false,
        };
        Models.auth().isIdExist(query, (err, notExist) => {
            if (!err && notExist) {
                responseHelper.success_send(200, true, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    // 아이디 찾기
    router.get('/auth/find/idText', (request, response, next) => {
        console.log('(POST) controller/api/auth.js :: /auth/find/idText called');
        const query = {
            countryDialCode: request.query.countryDialCode || null,
            phoneNumber: request.query.phoneNumber || null,
        };
        Models.auth().find.idText(query, (err, idText) => {
            if (!err) {
                console.log(idText);
                responseHelper.success_send(200, idText, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    // 비밀번호 변경
    router.post('/auth/password/change', (request, response, next) => {
        console.log('(POST) controller/api/auth.js :: /auth/password/change called');
        const query = {
            countryDialCode: request.body.countryDialCode || null, // option
            phoneNumber: request.body.phoneNumber || null, // option
            idText: request.body.idText || null, // option

            currentPassword: request.body.currentPassword || null,
            uId: null,

            password: request.body.password,
        };
        if (request.user) query.uId = request.user.id;
        Models.auth().password.change(query, (err, success) => {
            if (!err) {
                responseHelper.success_send(200, null, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    /////////////////
    //// Agency /////
    /////////////////

    // 회원가입 (중개사)
    router.post('/auth/agency/create', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/agency/create called');
        const query = {
            type: Number(request.body.type) || 1, // 개설 공인중개사(1), 소속 공인중개사(2), 중개 보조원(3)
            registrationNumber: request.body.registrationNumber || null, // 사업자번호
            ceoName: request.body.ceoName || null,
            agencyName: request.body.agencyName || null, // 중개사무소명
            countryDialCode: Number(request.body.countryDialCode) || 82,
            phoneNumber: request.body.phoneNumber || null,
            state: request.body.state || null,
            city: request.body.city || null,
            address1: request.body.address1 || null,
            address2: request.body.address2 || '',
            addressFull: request.body.addressFull || null,
            longitude: Number(request.body.longitude) || null,
            latitude: Number(request.body.latitude) || null,
        };
        query.uId = request.user.id;
        Models.agency().create(query, (err, data) => {
            if (!err && data) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    router.post('/auth/agency/create/license', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/agency/create/license called');
        const query = {
            aId: Number(request.body.aId) || null,
            url: request.body.url || null,
        };
        query.uId = request.user.id;
        Models.agency().createLicense(query, (err) => {
            if (!err) {
                responseHelper.success_send(200, null, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/auth/agency/create/registrationCertificate', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/agency/create/registrationCertificate called');
        const query = {
            aId: Number(request.body.aId) || null,
            url: request.body.url || null,
        };
        query.uId = request.user.id;
        Models.agency().createRegistrationCertificate(query, (err) => {
            if (!err) {
                responseHelper.success_send(200, null, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });


    return router;
};

