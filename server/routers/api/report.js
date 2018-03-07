const async = require('async');
const fs = require('fs');
const Router = require('express');

const authValidHelper = require(__base + "middleware/authValidHelper");
const responseHelper = require(__base + "lib/responseHelper");
const Models = require(__base + "models/index");

module.exports = () => {
    const router = Router();
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////

    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    router.post('/report/post/create', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/report.js :: /report/post/create called');
        let query = {
            email: request.body.email || null,
            title: request.body.title || null,
            description: request.body.description || null,
            uId: null,
        };
        if (request.user) query.uId = request.user.id;
        Models.report().create(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

