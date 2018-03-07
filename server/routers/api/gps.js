const async = require('async');
const fs = require('fs');
const Router = require('express');
const multiparty = require('multiparty');
const axios = require('axios');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');
const authValidHelper = require(__base + 'middleware/authValidHelper');

module.exports = () => {
    let router = Router();

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    router.get('/gps/get/geoGu', (request, response) => {
        console.log('(GET) controller/api/gps.js :: /gps/get/geoGu called');
        axios.get('http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admSiList.json', {
            params: {
                admCode: request.query.admCode,
                authkey: 'b0888bae39fbd0463a9252',
            },
        }).then((result) => {
            responseHelper.success_send(200, result.data['admVOList']['admVOList'], response);
        }).catch((err) => {
            responseHelper.err_send(err, response);
        });
    });
    router.get('/gps/get/geoDong', (request, response) => {
        console.log('(GET) controller/api/gps.js :: /gps/get/geoDong called');
        axios.get('http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admDongList.json', {
            params: {
                admCode: request.query.admCode,
                authkey: '91afccaa8d7f499151ee3b',
            },
        }).then((result) => {
            responseHelper.success_send(200, result.data['admVOList']['admVOList'], response);
        }).catch((err) => {
            responseHelper.err_send(err, response);
        });
    });



    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    return router;
};

