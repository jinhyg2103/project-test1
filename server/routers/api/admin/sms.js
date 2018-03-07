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
    router.get('/sms/get/usage', authValidHelper.isAdmin, (request, response) => {
        console.log('(GET) controller/api/admin/sms.js :: /sms/get/usage called');
        let query = {
            year: Number(request.query.year),
            month: Number(request.query.month),
        };
        query.uId = request.body.uId;
        Models.notification().sms.get.usage(query, (err, data) => { // True or False
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/sms/get/setting', authValidHelper.isAdmin, (request, response) => {
        console.log('(GET) controller/api/admin/sms.js :: /sms/get/setting called');
        let query = {
        };
        query.uId = request.body.uId;
        Models.notification().sms.get.setting(query, (err, data) => {
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/sms/update/setting', authValidHelper.isAdmin, (request, response) => {
        console.log('(POST) controller/api/admin/sms.js :: /sms/post/setting called');
        let query = {
            isSend: Boolean(request.body.isSend),
        };
        query.uId = request.body.uId;
        Models.notification().sms.update.setting(query, (err, data) => { // True or False
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

