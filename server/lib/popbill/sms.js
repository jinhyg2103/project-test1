const async = require('async');
const fs = require('fs');
const popbill = require('popbill');
const Models = require(__base + 'models/index');

/**
* 팝빌 서비스 연동환경 초기화
*/
popbill.config({
  // 링크아이디
  LinkID: 'AZNA',

  // 비밀키
  SecretKey: 'uaduq5XcBxy968S2B8HP1qAQ4bmKL8Pw+zA3hIuzEnM=',

  // 연동환경 설정값, 개발용(true), 상업용(false)
  IsTest: false,

  defaultErrorHandler: (err) => {
    console.log('Error Occur : [' + err.code + '] ' + err.message);
  },
});

/**
* 문자 API 서비스 클래스 생성
*/
const messageService = popbill.MessageService();

const popbillSms = {
    send: {
        /*
        * @params {Array} query.phoneNumbers
        * @params {Array} query.messages
        * @params {Boolean} query.isAds // 광고문자 전송여부
        */
        multi: (query, callback) => {
            let corpRegistrationNum = '4938800350';
            let sendNum = '18000740';
            let reserveDT = '';
            // 메시지 내용(동보전송용), 90Byte 초과시 길이가 조정되어 전송
            let contents = '';
            let messages = [];
            async.each(query.phoneNumbers, (phoneNumber, callback) => {
                let index = query.phoneNumbers.indexOf(phoneNumber);
                messages.push({
                    Sender: '', // 발신번호, 개별전송정보 배열에 발신자번호(Sender)가 없는 경우 동보전송 발신번호로 전송
                    SenderName: '지비다', // 발신자명
                    Receiver: phoneNumber, // 수신번호
                    ReceiverName: '손님', // 수신자명
                    Contents: query.messages[index], // 메시지 내용, 90Byte 초과시 길이가 조정되어 전송
                });
                Models.notification().sms.update.usage(1, (err, result) => { });
                callback();
            }, (err) => {
                messageService.sendSMS_multi(corpRegistrationNum, sendNum, contents, messages, reserveDT, query.isAds,
                    (receiptNum) => {
                        callback(null, receiptNum.toString());
                    }, (err) => {
                        callback(err, null);
                    });
            });
        },
    },
};

module.exports = popbillSms;
