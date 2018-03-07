const AWS = require('aws-sdk');
const accessKeyId = 'AKIAJQ54DQWFP47M7OHQ';
const secretAccessKey = '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';
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});
const S3 = new AWS.S3();
const SNS = new AWS.SNS({
    apiVersion: '2010-03-31',
    accessKeyId: 'AKIAJUC4B2YGCXQ7YUSA',
    secretAccessKey: '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',
    endpoint: 'sns.ap-northeast-1.amazonaws.com',
    region: 'ap-northeast-1',
});
const Models = require(__base + 'models/index');

module.exports = {
    s3_upload: (params, callback) => {
        S3.putObject(params, (err, data) => {
            callback(err, data);
        });
    },
    s3_delete: (params, callback) => {
        S3.deleteObject(params, (err, data) => {
            callback(err, data);
        });
    },
    s3_get: (params, callback) => {
        S3.getObject(params, (err, data) => {
            callback(err, data);
        });
    },
	getContentTypeByFile: (fileName) => {
		let rc = 'application/octet-stream';
        let fn = fileName.toLowerCase();

		if (fn.indexOf('.html') >= 0) rc = 'text/html';
		else if (fn.indexOf('.css') >= 0) rc = 'text/css';
		else if (fn.indexOf('.json') >= 0) rc = 'application/json';
		else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
		else if (fn.indexOf('.png') >= 0) rc = 'image/png';
		else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
        else if (fn.indexOf('.gif') >= 0) rc = 'image/gif';
		else if (fn.indexOf('.mp3') >= 0) rc = 'audio/mpeg';
		else if (fn.indexOf('.mpeg') >= 0) rc = 'audio/mpeg';
		else if (fn.indexOf('.wma') >= 0) rc = 'audio/x-ms-wma';
        else if (fn.indexOf('.wav') >= 0) rc = 'audio/mpeg';
        else if (fn.indexOf('.ogg') >= 0) rc = 'audio/mpeg';
        else if (fn.indexOf('.m4a') >= 0) rc = 'audio/mpeg';
		return rc;
	},

    // SMS
    sns: {
        /*
         * @param {Strinb} query.fullPhoneNumber **required
         * @param {Strinb} query.message **required
         */
        sendSMS: (query, callback) => {
            SNS.publish({
                PhoneNumber: query.fullPhoneNumber,
                Message: query.message,
            }, (err, data) => {
                if (!err && data) {
                    Models.notification().sms.update.usage(1, (err, result) => { });
                }
                callback(err, data);
            });
        },
    },
};
