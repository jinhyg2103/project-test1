const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
const passport = require('passport');
const serializeJ = require('serialize-javascript'); // 보안 상 JSON.stringify 대신 이걸 쓸 것

// Config
const c = require('../config/const.json');

// React
const reactRender = require(__base + '../src/' + c.APP_NAME + '/serverRender.bundle');

// Helper
const responseHelper = require('../lib/responseHelper');
const authValidHelper = require('../middleware/authValidHelper');
const base64Helper = require('../lib/base64Helper');


// Models
const Models = require('../models/index');

module.exports = (app) => {
    app.route('*').get((request, response) => {
        if (request.url.split('/')[1] == 'admin' || request.url.split('/')[1] == 'jivida' || request.url.split('/')[1] == 'admin' || request.url.split('/')[1] == 'api') {
            return;
        }
        let meta = {
            title: c.META_TITLE,
            description: c.META_DESCRIPTION,
            keywords: c.META_KEYWORD,
            image: c.META_IMAGE,
            url: c.DOMAIN,
        };
        let query = {
            response: response,
            request: request,
            data: null,
            store: null,
            author: null,
        }
        async.waterfall([
            (callback) => {
                if (request.user) { // 로그인되어있으면 로그인정보를 포함하자
                    Models.user().get.findById({ id: request.user.id }, (err, doc) => {
                        query.author = doc;
                        callback(null);
                    });
                } else {
                    callback(null);
                }
            },
        ], (err) => {
            reactRender.default(query, (err, reactHtml, store) => {
                let file = fs.readFileSync(__base + '../public/' + c.APP_NAME + '/index.ejs', 'ascii');
                let rendered = ejs.render(file, {
                    meta: meta,
                    reactHtml: reactHtml,
                    state: JSON.stringify(store.getState()),
                });
                response.send(rendered);
            });
        });
    });
};
