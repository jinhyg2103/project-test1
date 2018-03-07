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
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
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

    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
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
    router.post('/auth/logout', (request, response) => {
        console.log('(POST) controller/api/auth.js :: /auth/logout called');
        request.logout();
        request.logOut();
        response.clearCookie('accessToken');
        responseHelper.success_send(200, true, response);
    });
    return router;
};

