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
    router.get('/chat/get/chatByUId', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/get/chats called');
        let query = {
            uIdA: Number(request.query.uId) || 0,
            uIdB: request.user.id || 0,
        };
        Models.chat().get.chatByUId(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/chat/get/chats', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/get/chats called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
        };
        query.uId = request.user.id;
        Models.chat().get.chats(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/chat/get/lines', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/get/lines called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            cId: Number(request.query.cId) || null,
        };
        query.uId = request.user.id;

        Models.chat().get.lines(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/chat/get/houses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/get/houses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            cId: Number(request.query.cId) || null,
        };
        query.uId = request.user.id;
        Models.chat().get.houses(query, (err, data) => {
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
    router.post('/chat/reset/chatCount', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/reset/chatCount called');
        let query = {
            cId: Number(request.body.cId) || null,
        };
        query.uId = request.user.id;
        Models.chat().resetChatCount(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/chat/delete', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/chat.js :: /chat/delete called');
        let query = {
            cId: Number(request.body.cId) || null,
        };
        console.log(query);
        Models.chat().delete.chats(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

