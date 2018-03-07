const async = require('async');
const fs = require('fs');
const Router = require('express');
const multiparty = require('multiparty');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');
const authValidHelper = require(__base + 'middleware/authValidHelper');

module.exports = () => {
    let router = Router();

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    router.get('/user/get/id', (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/get/id called');
        let query = {
            id: Number(request.query.uId) || 0,
            uId: null,
        };
        if (request.user) query.uId = request.user.id;
        Models.user().get.findById(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/get/favoriteUsers', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/get/favoriteUsers called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
        };
        query.uId = request.user.id;
        Models.user().get.favoriteUsers(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/count/favoriteUsers', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/count/favoriteUsers called');
        let query = {};
        query.uId = request.user.id;
        Models.user().count.favoriteUsers(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/get/favoriteAgencies', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/get/favoriteAgencies called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
        };
        query.uId = request.user.id;
        Models.user().get.favoriteAgencies(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/count/favoriteAgencies', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/count/favoriteAgencies called');
        let query = {};
        query.uId = request.user.id;
        Models.user().count.favoriteAgencies(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/user/get/nearAgencyIds', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/user.js :: /user/get/favoriteAgencies called');
        let query = {
            si: request.query.si || null,
            gu: request.query.gu || null,
            dong: request.query.dong || null,
        };
        if (request.query.leftTop) query.leftTop = JSON.parse(request.query.leftTop) || { longitude: 0, latitude: 0 };
        if (request.query.rightBottom) query.rightBottom = JSON.parse(request.query.rightBottom) || { longitude: 0, latitude: 0 };
        query.uId = request.user.id;
        Models.user().get.nearAgencyIds(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/user/update', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/user.js :: /user/update called');
        let query = {
            uId: Number(request.user.id),
        };
        if (request.body.password) query.password = request.body.password;
        if (request.body.fullPhoneNumber) query.fullPhoneNumber = request.body.fullPhoneNumber;
        if (request.body.countryDialCode) query.countryDialCode = request.body.countryDialCode || 82;
        if (request.body.phoneNumber) query.phoneNumber = request.body.phoneNumber;
        if (request.body.profileUrl) query.profileUrl = request.body.profileUrl;
        if (request.body.coverUrl) query.coverUrl = request.body.coverUrl;
        if (request.body.name) query.name = request.body.name;
        if (request.body.email) query.email = request.body.email;
        if (request.body.state) query.state = request.body.state;
        if (request.body.city) query.city = request.body.city;
        if (request.body.address1) query.address1 = request.body.address1;
        if (request.body.address2) query.address2 = request.body.address2;
        if (request.body.androidToken) query.androidToken = request.body.androidToken;
        if (request.body.iphoneToken) query.iphoneToken = request.body.iphoneToken;
        if (request.body.pushAllOn || request.body.pushAllOn === false) query.pushAllOn = request.body.pushAllOn;
        if (request.body.pushChatOn || request.body.pushChatOn === false) query.pushChatOn = request.body.pushChatOn;
        if (request.body.pushRequestOn || request.body.pushRequestOn === false) query.pushRequestOn = request.body.pushRequestOn;
        Models.user().update.user(query, (err, isFavorite) => { // True or False
            if (!err) {
                responseHelper.success_send(200, isFavorite, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/user/favorite', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/user.js :: /user/favorite called');
        let query = {
            uIdTo: Number(request.body.uIdTo) || null,
        };
        query.uIdFrom = Number(request.user.id);
        Models.user().favorite(query, (err, isFavorite) => { // True or False
            if (!err) {
                responseHelper.success_send(200, isFavorite, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

