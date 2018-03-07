const async = require('async');
const dbConfig = require(__base + 'config/db.conf.json');
const mysql = require('mysql');

// Config
const c = require('../../config/const.json');
let currentConnection = [];
let currentConnectionPosition = 0;

module.exports = {
    init: () => {
        console.log('dbConnectionHelper.js :: init :: Database Connection Start');
        dbConfig.app.acquireTimeout = Number.POSITIVE_INFINITY;
        global.poolCluster = mysql.createPoolCluster();
        global.poolCluster.add(c.APP_NAME, dbConfig.app);
    },
    // callback ( )
    end: (callback) => {
        console.log('dbConnectionHelper.js :: end :: Database Connection End');
        global.poolCluster.end((err) => {
            if (err) console.error(err);
            callback();
        });
    },
    // callback ( err, connection )
    getConnection: (callback) => {
        global.poolCluster.getConnection(c.APP_NAME, (err, connection) => {
            if (err) {
                console.log('dbConnectionHelper.js :: getConnection :: Database getConnection Failed');
                console.log(err);
                connection = mysql.createConnection(dbConfig.app);
                connection.connect((err) => {
                    callback(err, connection);
                });
            } else {
                callback(err, connection);
            }
        });
    },
    /*getConnection: (callback) => {
        currentConnectionPosition += 1;
        if (currentConnectionPosition >= 20) {
            currentConnectionPosition = 0;
        }
        if (!currentConnection[currentConnectionPosition].query) {
            console.log('--1');
            try {
                currentConnection[currentConnectionPosition].release();
                global.poolCluster.getConnection(c.APP_NAME, (err, connection) => {
                    if (err) {
                        console.error('dbConnectionHelper.js :: getConnection :: Database getConnection Failed');
                    }
                    currentConnection[currentConnectionPosition] = connection;
                    callback(err, connection);
                });
            } catch (e) {
                global.poolCluster.end((err) => {
                    global.poolCluster = mysql.createPoolCluster();
                    global.poolCluster.add(c.APP_NAME, dbConfig.app);
                    global.poolCluster.getConnection(c.APP_NAME, (err, connection) => {
                        callback(err, connection);
                    });
                });
            }
        } else {
            console.log('--2');
            console.log(currentConnection[currentConnectionPosition]);
            callback(null, currentConnection[currentConnectionPosition]);
        }
    },*/
};