const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

// Config
const c = require('../config/const.json');

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');
const SQL = require(__base + 'lib/db/sql');
const DBFormat = require(__base + 'lib/db/format');

const House = {
    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    get: {
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {String} query.searchQuery
        */
        list: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON house.uId=agency.uId';
            let sqlParams = [];
            if (query.searchQuery) {
                sql += ' WHERE house.title LIKE ? OR house.id=?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery);
            }
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.user(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.type
        * @params {Number} query.dealingType
        * @params {Number} query.areaStart
        * @params {Number} query.areaEnd
        * @params {Number} query.price
        * @params {Number} query.deposit
        * @params {String} query.si
        * @params {String} query.gu
        * @params {String} query.dong
        * @params {String} query.searchQuery
        * @params {Object} params.leftTop
        * @params {Object} params.rightBottom
        */
        search: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON house.uId=agency.uId ' +
                'LEFT JOIN housePhoto ON house.id=housePhoto.hId ' +
                'WHERE (house.houseStatus = 1 OR house.houseStatus = 2) AND agency.isCertified=1 AND house.isPublic=1';
            let sqlParams = [];
            if (query.type) {
                sql += ' AND house.type=?';
                sqlParams.push(query.type);
            }
            if (query.dealingType) {
                sql += ' AND house.dealingType=?';
                sqlParams.push(query.dealingType);
            }
            if (query.areaStart) {
                sql += ' AND house.area>=?';
                sqlParams.push(query.areaStart);
            }
            if (query.areaEnd) {
                sql += ' AND house.area<?';
                sqlParams.push(query.areaEnd);
            }
            if (query.price) {
                sql += ' AND house.price<=?';
                sqlParams.push(query.price);
            }
            if (query.deposit) {
                sql += ' AND house.deposit<=?';
                sqlParams.push(query.deposit);
            }
            if (query.si) {
                sql += ' AND house.state=?';
                sqlParams.push(query.si);
            }
            if (query.gu) {
                sql += ' AND house.city LIKE ?';
                sqlParams.push(query.gu + '%');
            }
            if (query.dong) {
                sql += ' AND house.address1=?';
                sqlParams.push(query.dong);
            }

            // Center;
            if (query.leftTop && query.rightBottom && query.si == null) {
                sql += ' AND house.longitude < ? AND house.longitude > ?';
                sql += ' AND house.latitude < ? AND house.latitude > ?';
                sqlParams.push(query.rightBottom.longitude);
                sqlParams.push(query.leftTop.longitude);
                sqlParams.push(query.leftTop.latitude);
                sqlParams.push(query.rightBottom.latitude);
            }

            if (query.searchQuery) {
                sql += ' AND house.id LIKE ?';
                sqlParams.push(query.searchQuery);
            }
            // Sort
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.type
        * @params {Number} query.dealingType
        * @params {Number} query.areaStart
        * @params {Number} query.areaEnd
        * @params {Number} query.price
        * @params {Number} query.deposit
        * @params {String} query.si
        * @params {String} query.gu
        * @params {String} query.dong
        * @params {Object} params.leftTop
        * @params {Object} params.rightBottom
        */
        searchHousesForMap: (query, callback) => {
            let sql = 'SELECT house.id, house.title, house.longitude, house.latitude' +
                ' FROM house ' +
                'LEFT JOIN agency ON house.uId=agency.uId ' +
                'WHERE (house.houseStatus = 1 OR house.houseStatus = 2) AND agency.isCertified=1 AND house.isPublic=1';
            let sqlParams = [];
            if (query.si == null && query.gu == null && query.dong == null) {
                sql += ' AND house.longitude < ? AND house.longitude > ?';
                sql += ' AND house.latitude < ? AND house.latitude > ?';
                sqlParams.push(query.rightBottom.longitude);
                sqlParams.push(query.leftTop.longitude);
                sqlParams.push(query.leftTop.latitude);
                sqlParams.push(query.rightBottom.latitude);
            }
            if (query.type) {
                sql += ' AND house.type=?';
                sqlParams.push(query.type);
            }
            if (query.dealingType) {
                sql += ' AND house.dealingType=?';
                sqlParams.push(query.dealingType);
            }
            if (query.areaStart) {
                sql += ' AND house.area>=?';
                sqlParams.push(query.areaStart);
            }
            if (query.areaEnd) {
                sql += ' AND house.area<?';
                sqlParams.push(query.areaEnd);
            }
            if (query.price) {
                sql += ' AND house.price<=?';
                sqlParams.push(query.price);
            }
            if (query.deposit) {
                sql += ' AND house.deposit<=?';
                sqlParams.push(query.deposit);
            }
            if (query.si) {
                sql += ' AND house.state=?';
                sqlParams.push(query.si);
            }
            if (query.gu) {
                sql += ' AND house.city LIKE ?';
                sqlParams.push(query.gu + '%');
            }
            if (query.dong) {
                sql += ' AND house.address1=?';
                sqlParams.push(query.dong);
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    if (err || !results) {
                        callback('ResourceNotFound', null);
                    } else {
                        callback(null, results);
                    }
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uId
        */
        favorite: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ', true AS isFavorite' +
                ' FROM houseFavorite ' +
                'LEFT JOIN house ON houseFavorite.hId=house.id ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON house.uID=agency.uId ' +
                'LEFT JOIN housePhoto ON houseFavorite.hId=housePhoto.hId ' +
                'WHERE agency.isCertified=1 AND housePhoto.order=0 AND houseFavorite.uId=? AND house.isPublic=1';
            let sqlParams = [];
            sqlParams.push(query.uId);
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY houseFavorite.createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uId
        * @params {Boolean} query.includeMine
        * @params {Boolean} query.includeCustomer
        * @params {Boolean} query.includeAgency
        */
        myHouses: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ', ' + SQL.HOUSE_USER_OWNER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_OWNER_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user user ON house.uId=user.id ' +
                'LEFT JOIN agency agency ON house.uId=agency.uId ' +
                'LEFT JOIN user userOwner ON house.uIdParent=userOwner.id ' +
                'LEFT JOIN agency agencyOwner ON house.uIdParent=agencyOwner.uId ' +
                'LEFT JOIN housePhoto ON house.id=housePhoto.hId ' +
                'WHERE house.uId=?';
            let sqlParams = [];
            sqlParams.push(query.uId);
            if (!query.includeMine) {
                sql += ' AND houseStatus <> 1';
            }
            if (!query.includeCustomer) {
                sql += ' AND houseStatus <> 2';
            }
            if (!query.includeAgency) {
                sql += ' AND houseStatus <> 3';
            }
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uIdAgency
        * @params {Number} query.hId
        */
        agencyOtherHouses: (query, callback) => {
            let sql = 'SELECT house.*' +
                ', ' + SQL.HOUSE_PHOTOS_CONCAT +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON house.uID=agency.uId ' +
                'LEFT JOIN housePhoto ON house.id=housePhoto.hId ' +
                'WHERE house.uId=? AND NOT(house.id=?)';
            let sqlParams = [];
            sqlParams.push(query.uIdAgency);
            sqlParams.push(query.hId);
            sql += ' GROUP BY house.id';
            sql += ' ORDER BY createdAt DESC LIMIT ?,?';
            sqlParams.push(query.from);
            sqlParams.push(query.count);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    async.each(results, (house, callback) => {
                        let i = results.indexOf(house);
                        results[i] = DBFormat.house(house);
                        callback();
                    }, (err) => {
                        if (err || !results) {
                            callback('ResourceNotFound', null);
                        } else {
                            callback(null, results);
                        }
                    });
                });
            });
        },
        /*
        * @params {Number} query.hId
        * @params {Number} query.uId
        */
        findById: (query, callback) => {
            let sql = 'SELECT houseOption.*, house.*' +
                ', ' + SQL.HOUSE_USER_CONCAT +
                ', ' + SQL.HOUSE_AGENCY_CONCAT +
                ', ' + SQL.HOUSE_FAVORITE +
                ' FROM house ' +
                'LEFT JOIN user ON house.uId=user.id ' +
                'LEFT JOIN agency ON house.uID=agency.uId ' +
                'LEFT JOIN houseOption ON house.id=houseOption.hId ' +
                'WHERE house.id=?';
            let sqlParams = [];
            sqlParams.push(query.uId); // SQL.HOUSE_FAVORITE
            sqlParams.push(query.hId);
            sql += ' GROUP BY house.id';
            dbConnectionHelper.getConnection((err, connection) => {
                async.waterfall([
                    (callback) => {
                        connection.query(sql, sqlParams, (err, results) => {
                            if (err || !results[0]) {
                                callback('ResourceNotFound', null);
                            } else {
                                callback(DBFormat.house(results[0]));
                            }
                        });
                    },
                ], (house) => {
                    connection.query('SELECT * FROM housePhoto WHERE hId=? ORDER BY createdAt ASC', [house.id], (err, photos) => {
                        connection.release();
                        if (!err && photos[0]) {
                            house.photos = photos;
                        } else {
                            house.photos = [];
                        }
                        callback(null, house);
                    });
                });
            });
        },
    },
    count: {
        /*
        * @params {String} query.searchQuery
        */
        list: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM house' +
                ' LEFT JOIN agency ON house.uID=agency.uId';
            let sqlParams = [];
            if (query.searchQuery) {
                sql += ' WHERE house.title LIKE ? OR house.id=?';
                sqlParams.push(query.searchQuery + '%');
                sqlParams.push(query.searchQuery);
                sqlParams.push(query.searchQuery + '%');
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        /*
          * @params {Number} query.type
          * @params {Number} query.dealingType
          * @params {Number} query.areaStart
          * @params {Number} query.areaEnd
          * @params {Number} query.price
          * @params {Number} query.deposit
          * @params {String} query.si
          * @params {String} query.gu
          * @params {String} query.dong
        */
        search: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM house' +
                ' LEFT JOIN agency ON house.uID=agency.uId ' +
                ' WHERE agency.isCertified=1';
            let sqlParams = [];
            if (query.type) {
                sql += ' AND house.type=?';
                sqlParams.push(query.type);
            }
            if (query.dealingType) {
                sql += ' AND house.dealingType=?';
                sqlParams.push(query.dealingType);
            }
            if (query.areaStart) {
                sql += ' AND house.area>=?';
                sqlParams.push(query.areaStart);
            }
            if (query.areaEnd) {
                sql += ' AND house.area<?';
                sqlParams.push(query.areaEnd);
            }
            if (query.price) {
                sql += ' AND house.price<=?';
                sqlParams.push(query.price);
            }
            if (query.deposit) {
                sql += ' AND house.deposit<=?';
                sqlParams.push(query.deposit);
            }
            if (query.si) {
                sql += ' AND house.state=?';
                sqlParams.push(query.si);
            }
            if (query.gu) {
                sql += ' AND house.city=?';
                sqlParams.push(query.gu);
            }
            if (query.dong) {
                sql += ' AND house.address1=?';
                sqlParams.push(query.dong);
            }
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        /*
        * @params {Number} query.from
        * @params {Number} query.count
        * @params {Number} query.uId
        */
        favorite: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM house' +
                ' LEFT JOIN agency ON house.uID=agency.uId ' +
                ' WHERE agency.isCertified=1 AND house.id IN (SELECT hId FROM houseFavorite WHERE hId=house.id AND uId=?)';
            let sqlParams = [];
            sqlParams.push(query.uId);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
        /*
        * @params {Number} query.uId
        * @params {Boolean} query.includeMine
        * @params {Boolean} query.includeCustomer
        * @params {Boolean} query.includeAgency
        */
        myHouses: (query, callback) => {
            let sql = 'SELECT count(*)' +
                ' FROM house' +
                ' WHERE house.uId=?';
            let sqlParams = [];
            sqlParams.push(query.uId);
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query(sql, sqlParams, (err, results) => {
                    connection.release();
                    callback(null, results[0]['count(*)'].toString());
                });
            });
        },
    },

    /////////////////////////////////////////////
    //////     CREATE / UPDATE / DELETE   ///////
    /////////////////////////////////////////////
    /*
    * @params {Number} query.uId
    * @params {String} query.title
    * @params {String} query.description
    * @params {Number} query.price
    * @params {Number} query.deposit
    * @params {Number} query.type // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
    * @params {Number} params.area // 공급면적
    * @params {Number} params.areaForExclusiveUse // 전용면적
    * @params {Number} query.dealingType // 매매(1), 전세(2), 월세(3),
    * @params {String} query.state // 주소에서 시(광역), 도 ex)서울시 / 경기도 / 강원도
    * @params {String} query.city // 주소에서 구(광역), 시 / 군 ex) 서초구 / 성남시 / 횡성군
    * @params {String} query.address1  // 주소에서 동(광역) / 구 / 읍 ex) 서초동 / 분당구 / 횡성읍
    * @params {String} query.address2 // 자세한 주소
    * @params {Number} query.houseStatus // 1: (고객/중개사) 나의 매물, 2: (중개사) 고객 매물, 3: (중개사) 공동 중개
    */
    create: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('INSERT INTO house SET ?', query, (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch', null);
                    return;
                }
                const hId = result.insertId;
                callback(null, hId);
            });
        });
    },
    /*
    */
    createOptions: (query, callback) => {
        if (query.options) query.options = JSON.stringify(query.options);
        setTimeout(() => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('INSERT INTO houseOption SET ?', query, (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    const hoId = result.insertId;
                    callback(null, hoId);
                });
            });
        }, 50);
    },
    /*
    * @params {Number} query.hId
    * @params {Number} query.order
    * @params {String} query.url
    */
    createPhoto: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('INSERT INTO housePhoto SET ?', query, (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch', null);
                    return;
                }
                callback(null, result.insertId.toString());
            });
        });
    },
    /*
    * @params {Number} query.hId
    * @params {Number} query.uId
    */
    favorite: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM houseFavorite WHERE uId=? AND hId=?', [query.uId, query.hId], (err, results) => {
                if (!err && results.length > 0) { // already like
                    connection.query('DELETE FROM houseFavorite WHERE uId=? AND hId=?', [query.uId, query.hId], (err, result) => {
                        connection.release();
                        callback(null, false);
                    });
                } else {
                    connection.query('INSERT INTO houseFavorite SET ?', query, (err, result) => {
                        connection.release();
                        if (err || !result) {
                            callback('ResourceTypeMismatch', false);
                            return;
                        }
                        callback(null, true);
                    });
                }
            });
        });
    },
    /*
    * @params {Number} query.hId
    */
    delete: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('DELETE FROM house WHERE id=?', [query.hId], (err, result) => {
                connection.release();
                if (err || !result) {
                    callback('ResourceTypeMismatch', null);
                    return;
                }
                callback(null, true);
            });
        });
    },
    /*
    * @params {Number} query.hId
    * @params {String} query.title
    * @params {String} query.description
    * @params {Number} query.price
    * @params {Number} query.deposit
    * @params {Number} query.type // [주거] 아파트(1), 아파트분양권(2), 원룸(3), 투룸(4), 쓰리룸(5), 연립(6), 다세대(빌라)(7), 다가구(8), 오피스텔(9), 단독주택(10) [비주거] 상가(11), 상가 분양권(12), 사무실(13), 오피스텔(14), 공장(15) [토지] 토지(16)
    * @params {Number} params.area // 공급면적
    * @params {Number} params.areaForExclusiveUse // 전용면적
    * @params {Number} query.dealingType // 매매(1), 전세(2), 월세(3),
    * @params {String} query.state // 주소에서 시(광역), 도 ex)서울시 / 경기도 / 강원도
    * @params {String} query.city // 주소에서 구(광역), 시 / 군 ex) 서초구 / 성남시 / 횡성군
    * @params {String} query.address1  // 주소에서 동(광역) / 구 / 읍 ex) 서초동 / 분당구 / 횡성읍
    * @params {String} query.address2 // 자세한 주소
    * @params {String} query.memo
    * @params {String} query.isPublic
    *
    */
    update: {
        house: (query, callback) => {
            let hId = query.hId;
            delete query.hId;
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('UPDATE house SET ? WHERE id=?', [query, hId], (err, result) => {
                    connection.release();
                    if (err || !result) {
                        callback('ResourceTypeMismatch', null);
                        return;
                    }
                    callback(null, true);
                });
            });
        },
        houseOptions: (query, callback) => {
            if (query.options) query.options = JSON.stringify(query.options);
            setTimeout(() => {
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('UPDATE houseOption SET ? WHERE hId=?', [query, query.hId], (err, result) => {
                        if (err || !result) {
                            connection.release();
                            callback('ResourceTypeMismatch', null);
                            return;
                        }
                        if (result.affectedRows == 0) {
                            connection.query('INSERT INTO houseOption SET ?', query, (err, result) => {
                                connection.release();
                                const hoId = result.insertId;
                                callback(null, hoId);
                            });
                            return;
                        }
                        connection.release();
                        callback(null, true);
                    });
                });
            }, 50);
        },
        /*
        * @params {Array} query.photos
        */
        housePhotos: (query, callback) => {
            dbConnectionHelper.getConnection((err, connection) => {
                connection.query('DELETE FROM housePhoto WHERE hId=?', [query.photos[0].hId], (err, result) => {
                    async.each(query.photos, (photo, callback) => {
                        connection.query('INSERT INTO housePhoto SET ?', photo, (err, result) => {
                            callback();
                        });
                    }, (err) => {
                        connection.release();
                        callback(null, true);
                    });
                });
            });
        },
    },
    /////////////////////////////////////////////
    //////     Functions                  ///////
    /////////////////////////////////////////////
    /*
    * @params {Number} query.hIdOriginal
    * @params {Number} query.uId
    * @params {Number} query.houseStatus
    * @params {String} query.memo (option)
    */
    _copy: (query, callback) => {
        console.log(query);
        dbConnectionHelper.getConnection((err, connection) => {
            let cbErr;
            let hIdCopy;
            let uIdCustomer;
            let houseOriginal;
            async.waterfall([
                (callback) => { // Check already exist
                    connection.query('SELECT * FROM house WHERE hIdParent=? AND uId=?', [query.hIdOriginal, query.uId], (err, results) => {
                        if (!results[0]) {
                            callback(null);
                        } else if (err) {
                            connection.release();
                            callback(null);
                            return;
                        } else {
                            connection.query('UPDATE house SET ? WHERE hIdParent=?', [{ createdAt: new Date() }, query.hIdOriginal], (err, result) => {
                                cbErr = 'ResourceAlreadyExists';
                                callback(null);
                            });
                        }
                    });
                },
                (callback) => { // House Copy
                    if (cbErr) {
                        callback(null);
                    } else {
                        connection.query('SELECT * FROM house WHERE id=?', [query.hIdOriginal], (err, results) => {
                            if (err || !results[0]) {
                                cbErr = 'ResourceTypeMismatch';
                                callback(null);
                                return;
                            }
                            let house = results[0];
                            houseOriginal = results[0];
                            house.hIdParent = query.hIdOriginal;
                            house.uIdParent = results[0].uId;
                            uIdCustomer = house.uId;
                            house.uId = query.uId;
                            delete house.id;
                            delete house.createdAt;
                            house.houseStatus = query.houseStatus; // 2: 고객 매물 / 3: 공동 중개
                            if (query.memo) house.memo = query.memo;
                            connection.query('INSERT INTO house SET ?', house, (err, result) => {
                                if (err || !result) {
                                    cbErr = 'ResourceTypeMismatch';
                                    callback(null);
                                    return;
                                }
                                hIdCopy = result.insertId;
                                callback(null);
                            });
                        });
                    }
                },
                (callback) => { // Option Copy
                    if (cbErr) {
                        callback(null);
                    } else {
                        connection.query('SELECT * FROM houseOption WHERE hId=?', [query.hIdOriginal], (err, results) => {
                            if (err || !results[0]) {
                                connection.release();
                                callback(null);
                                return;
                            }
                            let houseOption = results[0];
                            delete houseOption.id;
                            delete houseOption.rfhId;
                            houseOption.hId = hIdCopy;
                            houseOption.uId = uIdCustomer;
                            connection.query('INSERT INTO houseOption SET ?', houseOption, (err, result) => {
                                callback(null);
                            });
                        });
                    }
                },
                (callback) => { // Photos Copy
                    if (cbErr) {
                        callback(null);
                    } else {
                        connection.query('SELECT * FROM housePhoto WHERE hId=?', [query.hIdOriginal], (err, results) => {
                            async.each(results, (housePhoto, callback) => {
                                delete housePhoto.id;
                                housePhoto.hId = hIdCopy;
                                delete housePhoto.createdAt;
                                connection.query('INSERT INTO housePhoto SET ?', housePhoto, (err, result) => {
                                    callback();
                                });
                            }, (err) => {
                                callback(null);
                            });
                        });
                    }
                },
            ], (results) => {
                connection.release();
                if (cbErr) {
                    callback(cbErr, null);
                } else {
                    callback(null, {
                        houseOriginal: houseOriginal,
                        hIdCopy: hIdCopy,
                        uIdCustomer: uIdCustomer,
                    });
                }
            });
        });
    },
};
module.exports = House;
