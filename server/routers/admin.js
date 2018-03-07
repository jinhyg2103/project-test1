const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
const passport = require('passport');
const serializeJ = require('serialize-javascript'); // 보안 상 JSON.stringify 대신 이걸 쓸 것

// Config
const c = require('../config/const.json');

// React
const reactRender = require(__base + '../src/Admin/serverRender.bundle');

// Helper
const responseHelper = require('../lib/responseHelper');
const authValidHelper = require('../middleware/authValidHelper');
const base64Helper = require('../lib/base64Helper');

// Models
const Models = require('../models/index');

const adminPage = (request, response) => {
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
            let file = fs.readFileSync(__base + '../public/Admin/index.ejs', 'ascii');
            let rendered = ejs.render(file, {
                meta: meta,
                reactHtml: reactHtml,
                state: JSON.stringify(store.getState()),
            });
            response.send(rendered);
        });
    });
};

module.exports = (app) => {
    app.route('/admin').get(adminPage);
    app.route('/admin/*').get(adminPage);
};
