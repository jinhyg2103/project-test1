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
    router.post('/agency/update', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/user.js :: /agency/update called');
        let query = {
            uId: Number(request.user.id),
        };
        if (request.body.type) query.type = request.body.type;
        if (request.body.countryDialCode) query.countryDialCode = request.body.countryDialCode || 82;
        if (request.body.phoneNumber) query.phoneNumber = request.body.phoneNumber;
        if (request.body.ceoName) query.ceoName = request.body.ceoName;
        if (request.body.agencyName) query.agencyName = request.body.agencyName;
        if (request.body.state) query.state = request.body.state;
        if (request.body.city) query.city = request.body.city;
        if (request.body.address1) query.address1 = request.body.address1;
        if (request.body.address2) query.address2 = request.body.address2;
        if (request.body.address2) query.address2 = request.body.address2;
        if (request.body.addressFull) query.addressFull = request.body.addressFull;
        if (request.body.longitude) query.longitude = Number(request.body.longitude);
        if (request.body.latitude) query.latitude = Number(request.body.latitude);
        if (request.body.isCertified) query.isCertified = (request.body.isCertified === 'true');
        Models.agency().update.agency(query, (err, isFavorite) => { // True or False
            if (!err) {
                responseHelper.success_send(200, isFavorite, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

