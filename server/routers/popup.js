const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
const passport = require('passport');
const serializeJ = require('serialize-javascript'); // 보안 상 JSON.stringify 대신 이걸 쓸 것
const axios = require('axios');
const proj4 = require('proj4');
proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs');

// Config
const c = require('../config/const.json');

// Helper
const responseHelper = require('../lib/responseHelper');
const authValidHelper = require('../middleware/authValidHelper');
const base64Helper = require('../lib/base64Helper');


// Models
const Models = require('../models/index');

module.exports = (app) => {
    app.route('/popup/jusoPopup')
        .get((request, response) => {
            console.log('(GET) routers/popup.js :: /popup/jusoPopup called');
            let file = fs.readFileSync(__base + '../public/' + c.APP_NAME + '/popup/jusoPopup.ejs', 'ascii');
            let rendered = ejs.render(file, {
                juso: {
                    inputYn: 'N',
                },
            });
            response.send(rendered);
        });
    app.route('/popup/jusoPopup')
        .post((request, response) => {
            console.log('(POST) routers/popup.js :: /popup/jusoPopup called');
            let wgs84 = proj4('EPSG:5179', 'EPSG:4326', [Number(request.body.entX), Number(request.body.entY)]);
            request.body.entX = wgs84[0].toFixed(7);
            request.body.entY = wgs84[1].toFixed(7);
            console.log(request.body);
            let file = fs.readFileSync(__base + '../public/' + c.APP_NAME + '/popup/jusoPopup.ejs', 'ascii');
            let rendered = ejs.render(file, {
                juso: request.body,
            });
            response.send(rendered);
        });

    app.route('/popup/jusoMobilePopup')
        .get((request, response) => {
            console.log('(GET) routers/popup.js :: /popup/jusoMobilePopup called');
            let file = fs.readFileSync(__base + '../public/' + c.APP_NAME + '/popup/jusoMobilePopup.ejs', 'ascii');
            let rendered = ejs.render(file, {
                juso: {
                    inputYn: 'N',
                },
            });
            response.send(rendered);
        });
    app.route('/popup/jusoMobilePopup')
        .post((request, response) => {
            console.log('(POST) routers/popup.js :: /popup/jusoMobilePopup called');
            console.log(request.body);
            let params = {
                confmKey: 'U01TX0FVVEgyMDE3MTAwNjIwMjExMDEwNzM5MDM=', // 위치 검색 Key
                admCd: request.body.admCd,
                rnMgtSn: request.body.rnMgtSn,
                udrtYn: request.body.udrtYn,
                buldMnnm: request.body.buldMnnm,
                buldSlno: request.body.buldSlno,
                resultType: 'json',
            };
            async.waterfall([
                (callback) => {
                    axios.get('http://www.juso.go.kr/addrlink/addrCoordApi.do', { params: params })
                        .then((response) => {
                            let wgs84 = proj4('EPSG:5179', 'EPSG:4326', [Number(response.data.results.juso[0].entX), Number(response.data.results.juso[0].entY)]);
                            request.body.entX = wgs84[0].toFixed(7);
                            request.body.entY = wgs84[1].toFixed(7);
                            callback(null);
                        })
                        .catch((err) => {
                            request.body.entX = 0;
                            request.body.entY = 0;
                            callback(null);
                        });
                },
            ], (err) => {
                let file = fs.readFileSync(__base + '../public/' + c.APP_NAME + '/popup/jusoMobilePopup.ejs', 'ascii');
                let rendered = ejs.render(file, {
                    juso: request.body,
                });
                response.send(rendered);
            });
        });
};
