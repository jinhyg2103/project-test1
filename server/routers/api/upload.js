const async = require('async');
const fs = require('fs');
const Router = require('express');
const multiparty = require('multiparty');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');

module.exports = () => {
    const router = Router();

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////


    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/upload/image', (request, response) => {
        console.log('(POST) controller/api/upload.js :: /upload/image called');
        let form = new multiparty.Form();
        form.parse(request, (err, fields, files) => {
            if (err || !files || !files.file || files.length == 0) {
                responseHelper.err_send('ResourceNotFound', response);
                return;
            }
            let query = {
                file: JSON.parse(JSON.stringify(files.file[0])) || null,
            };
            Models.fileUpload().image.upload(query, (err, url) => {
                if (url && !err) {
                    responseHelper.success_send(200, url, response);
                } else {
                    responseHelper.err_send(err, response);
                }
            });
        });
    });
    return router;
};

