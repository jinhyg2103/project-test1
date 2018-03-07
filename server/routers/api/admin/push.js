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

    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/push/create/all', authValidHelper.isAdmin, (request, response) => {
        console.log('(POST) controller/api/admin/push.js :: /push/send/all called');
        let query = {
            title: "지비다 전체공지",
            body: request.body.description || null,
        };
        query.uId = request.user.id;
        Models.notification().push.send.all(query, (err, data) => { // True or False
            if (!err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

