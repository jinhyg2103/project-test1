const async = require('async');
const fs = require('fs');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');
const authValidHelper = require(__base + 'middleware/authValidHelper');

module.exports = (io) => {
    // Socket
/*
    console.log('io : ');
*/
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        // Join & Leave Room
        /*
        * @params {Number} query.cId
        */
        socket.on('join:room', (data) => {
            console.log('join:room : ');
            socket.join('room' + data.cId);
        });
        /*
        * @params {Number} query.cId
        */
        socket.on('leave:room', (data) => {
            console.log('leave:room : ');
            socket.leave('room' + data.cId);
        });

        // Messages
        /*
        * @params {Number} data.uId
        * @params {Number} data.cId
        * @params {String} data.message
        */
        socket.on('message', (data) => {
            console.log('socket on :: message');
            Models.chat().create.chatLine({
                uId: data.uId,
                cId: data.cId,
                text: data.message,
            }, (err, clId) => {
                Models.chat().get.lines({
                    from: 0,
                    count: 1,
                    cId: data.cId,
                    uId: data.uId,
                }, (err, chatLine) => {
                    io.sockets.in('room' + data.cId).emit('message', chatLine);
                });
            });
        });
        /*
        * @params {Number} data.uId
        * @params {Number} data.cId
        * @params {Number} data.hId
        */
        socket.on('house', (data) => {
            console.log('socket on :: house');
            Models.chat().create.chatLine({
                uId: data.uId,
                cId: data.cId,
                hId: data.hId,
            }, (err, clId) => {
                Models.chat().get.lineById({
                    clId: clId,
                }, (err, chatLine) => {
                    io.sockets.in('room' + data.cId).emit('house', chatLine);
                });
            });
        });
        /*
        * @params {Number} data.uId
        * @params {Number} data.cId
        * @params {String} data.url
        */
        socket.on('image', (data) => {
            console.log('socket on :: image');
            Models.chat().create.chatLine({
                uId: data.uId,
                cId: data.cId,
                url: data.url,
            }, (err, clId) => {
                Models.chat().get.lineById({
                    clId: clId,
                }, (err, chatLine) => {
                    io.sockets.in('room' + data.cId).emit('image', chatLine);
                });
            });
        });
    });
};

