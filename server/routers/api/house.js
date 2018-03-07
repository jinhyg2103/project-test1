const async = require('async');
const fs = require('fs');
const Router = require('express');
const multiparty = require('multiparty');

const responseHelper = require(__base + 'lib/responseHelper');
const Models = require(__base + 'models/index');
const authValidHelper = require(__base + 'middleware/authValidHelper');

module.exports = () => {
    let router = Router();

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    router.get('/house/get/id', (request, response) => {
        console.log('(GET) controller/api/house.js :: /house/get/id called');
        let query = {
            hId: Number(request.query.hId) || 0,
            uId: null,
        };
        if (request.user) query.uId = request.user.id;
        Models.house().get.findById(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/get/searchHouses', (request, response) => {
        console.log('(GET) controller/api/house.js :: /house/get/searchHouses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            type: Number(request.query.type) || null,
            dealingType: Number(request.query.dealingType) || null,
            areaStart: Number(request.query.areaStart) || null,
            areaEnd: Number(request.query.areaEnd) || null,
            price: Number(request.query.price) || null,
            deposit: Number(request.query.deposit) || null,
            si: request.query.si || null,
            gu: request.query.gu || null,
            dong: request.query.dong || null,
            searchQuery: request.query.searchQuery || null,
            uId: null,
        };

        if (request.query.leftTop) query.leftTop = JSON.parse(request.query.leftTop);
        if (request.query.rightBottom) query.rightBottom = JSON.parse(request.query.rightBottom);
        if (request.query.longitude) query.longitude = Number(request.query.longitude);
        if (request.query.latitude) query.latitude = Number(request.query.latitude);
        if (request.user) query.uId = request.user.id;
        Models.house().get.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/count/searchHouses', (request, response) => {
        console.log('(GET) controller/api/house.js :: /house/count/searchHouses called');
        let query = {
            type: Number(request.query.type) || null,
            dealingType: Number(request.query.dealingType) || null,
            areaStart: Number(request.query.areaStart) || null,
            areaEnd: Number(request.query.areaEnd) || null,
            price: Number(request.query.price) || null,
            deposit: Number(request.query.deposit) || null,
            si: request.query.si || null,
            gu: request.query.gu || null,
            dong: request.query.dong || null,
            uId: null,
        };
        if (request.user) query.uId = request.user.id;
        Models.house().count.search(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/get/searchHousesForMap', (request, response) => { // 지도상에 띄울 매물들
        console.log('(GET) controller/api/house.js :: /house/get/searchHousesForMap called');
        let query = {
            type: Number(request.query.type) || null,
            dealingType: Number(request.query.dealingType) || null,
            areaStart: Number(request.query.areaStart) || null,
            areaEnd: Number(request.query.areaEnd) || null,
            price: Number(request.query.price) || null,
            deposit: Number(request.query.deposit) || null,
            si: request.query.si || null,
            gu: request.query.gu || null,
            dong: request.query.dong || null,
            leftTop: JSON.parse(request.query.leftTop) || {},
            rightBottom: JSON.parse(request.query.rightBottom) || {},
        };
        console.log(query);
        if (request.user) query.uId = request.user.id;
        Models.house().get.searchHousesForMap(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/get/favoriteHouses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/house.js :: /house/get/favoriteHouses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
        };
        query.uId = request.user.id;
        Models.house().get.favorite(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/count/favoriteHouses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/house.js :: /house/count/favoriteHouses called');
        let query = {};
        query.uId = request.user.id;
        Models.house().count.favorite(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/get/myHouses', authValidHelper.is_login, (request, response) => { // 나의 매물
        console.log('(GET) controller/api/house.js :: /house/get/myHouses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            includeMine: (request.query.includeMine === 'true'),
            includeCustomer: (request.query.includeCustomer === 'true'),
            includeAgency: (request.query.includeAgency === 'true'),
        };
        query.uId = request.user.id;
        Models.house().get.myHouses(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/house/count/myHouses', authValidHelper.is_login, (request, response) => { // 나의 매물
        console.log('(GET) controller/api/house.js :: /house/count/myHouses called');
        let query = {};
        query.uId = request.user.id;
        Models.house().count.myHouses(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    router.get('/house/get/agencyOtherHouses', authValidHelper.is_login, (request, response) => { // 나의 매물
        console.log('(GET) controller/api/house.js :: /house/get/agencyOtherHouses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 10,
            uIdAgency: Number(request.query.uIdAgency) || null,
            hId: Number(request.query.hId) || 0,
        };
        query.uId = request.user.id;
        Models.house().get.agencyOtherHouses(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    ////////////////////////////////////
    ///////////     POST    ////////////
    ////////////////////////////////////
    router.post('/house/create', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/create called');
        let query = {
            title: request.body.title || null,
            description: request.body.description || null,
            type: Number(request.body.type) || null,
            area: Number(request.body.area) || null,
            areaForExclusiveUse: Number(request.body.areaForExclusiveUse) || null,
            dealingType: Number(request.body.dealingType) || null,
            state: request.body.state || null,
            city: request.body.city || null,
            address1: request.body.address1.replace(/[0-9]/g, '') || null,
            address2: request.body.address2 || null,
            addressFull: request.body.addressFull || null,
            longitude: Number(request.body.longitude) || null,
            latitude: Number(request.body.latitude) || null,
        };
        if (request.body.price) query.price = Number(request.body.price);
        if (request.body.deposit) query.deposit = Number(request.body.deposit);
        query.uId = request.user.id;
        Models.house().create(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data.toString(), response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/house/create/options', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/create/options called');
        let query = {
            hId: request.body.hId || null,
            rfhId: request.body.rfhId || null,
            options: request.body.options || null,
            room: Number(request.body.room) || null,
            bathroom: Number(request.body.bathroom) || null,
            verandaExtension: Number(request.body.verandaExtension) || null,
            direction: Number(request.body.direction) || null,
            bay: Number(request.body.bay) || null,
            boiler: Number(request.body.boiler) || null,
            interior: Number(request.body.interior) || null,
            paper: Number(request.body.paper) || null,
            floor: Number(request.body.floor) || null,
            parkingLot: Number(request.body.parkingLot) || null,
            elevator: Number(request.body.elevator) || null,
            entrance: Number(request.body.entrance) || null,

            //////////////비주거//////////////////////
            roadType: Number(request.body.roadType) || null,
            roadWidth: Number(request.body.roadWidth) || null,
            signboard: Number(request.body.signboard) || null,
            veranda: Number(request.body.veranda) || null,
            landShare: Number(request.body.landShare) || null,
            buildingUsedFor: request.body.buildingUsedFor || null,

            /////////////토지/////////////////////////
            roadLength: Number(request.body.roadLength) || null,
            landShape: Number(request.body.landShape) || null,
            landCategory: request.body.landCategory || null,
            landUsedFor: Number(request.body.landUsedFor) || null,
            landUsedForValue: request.body.landUsedForValue || null,
            floorAreaRatio: Number(request.body.floorAreaRatio) || null,
            buildingRatio: Number(request.body.buildingRatio) || null,
            grave: Number(request.body.grave) || null,
            graveMove: Number(request.body.graveMove) || null,
            ////////////기타사항/////////////////////
            owners: Number(request.body.owners) || null,
            relationOfRights: Number(request.body.relationOfRights) || null,
            loan: Number(request.body.loan) || null,
            loanValue: Number(request.body.loanValue) || null,
            cctv: Number(request.body.cctv) || null,
            security: Number(request.body.security) || null,
            managementCost: Number(request.body.managementCost) || null,
            managementCostValue: Number(request.body.managementCostValue) || null,
            managementCompany: request.body.managementCompany || null,
            builtYear: Number(request.body.builtYear) || null,
            builtBy: request.body.builtBy || null,
            /*playground: Number(request.body.playground) || null,
            kidHospital: Number(request.body.kidHospital) || null,
            hospital: Number(request.body.hospital) || null,
            elementarySchool: Number(request.body.elementarySchool) || null,
            middleSchool: Number(request.body.middleSchool) || null,
            highSchool: Number(request.body.highSchool) || null,
            university: Number(request.body.university) || null,*/
            subway: Number(request.body.subway) || null,
            /*bus: Number(request.body.bus) || null,
            departmentStore: Number(request.body.departmentStore) || null,
            mart: Number(request.body.mart) || null,
            supermarket: Number(request.body.supermarket) || null,
            convenienceStore: Number(request.body.convenienceStore) || null,*/
        };
        query.uId = request.user.id;
        Models.house().createOptions(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data.toString(), response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/house/create/photo', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/photo/create called');
        let query = {
            hId: Number(request.body.hId) || null,
            order: Number(request.body.order) || 0,
            url: request.body.url || null,
        };
        Models.house().createPhoto(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/house/favorite', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/favorite called');
        let query = {
            hId: Number(request.body.hId) || null,
        };
        query.uId = Number(request.user.id);
        console.log(query);
        Models.house().favorite(query, (err, isFavorite) => { // True or False
            if (!err) {
                responseHelper.success_send(200, isFavorite, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    router.post('/house/delete', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/delete called');
        let query = {
            hId: Number(request.body.hId) || null,
        };
        Models.house().delete(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    router.post('/house/update', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/update called');
        let query = {
            hId: Number(request.body.hId) || null,
        };
        if (request.body.title) query.title = request.body.title;
        if (request.body.description) query.description = request.body.description;
        if (request.body.price) query.price = Number(request.body.price);
        if (request.body.deposit || request.body.deposit == 0) query.deposit = Number(request.body.deposit);
        if (request.body.type) query.type = Number(request.body.type);
        if (request.body.area) query.area = Number(request.body.area);
        if (request.body.areaForExclusiveUse) query.areaForExclusiveUse = Number(request.body.areaForExclusiveUse);
        if (request.body.dealingType) query.dealingType = Number(request.body.dealingType);
        if (request.body.state) query.state = request.body.state;
        if (request.body.city) query.city = request.body.city;
        if (request.body.address1) query.address1 = request.body.address1.replace(/[0-9]/g, '');
        if (request.body.address2) query.address2 = request.body.address2;
        if (request.body.addressFull) query.addressFull = request.body.addressFull;
        if (request.body.memo) query.memo = request.body.memo;
        if (request.body.longitude) query.longitude = Number(request.body.longitude);
        if (request.body.latitude) query.latitude = Number(request.body.latitude);
        if (request.body.isPublic) query.isPublic = (request.body.isPublic == 'true');
        Models.house().update.house(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/house/update/options', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/update/options called');
        let query = {
            hId: request.body.hId || null,
            options: request.body.options || null,
            room: Number(request.body.room) || null,
            bathroom: Number(request.body.bathroom) || null,
            verandaExtension: Number(request.body.verandaExtension) || null,
            direction: Number(request.body.direction) || null,
            bay: Number(request.body.bay) || null,
            boiler: Number(request.body.boiler) || null,
            interior: Number(request.body.interior) || null,
            paper: Number(request.body.paper) || null,
            floor: Number(request.body.floor) || null,
            parkingLot: Number(request.body.parkingLot) || null,
            elevator: Number(request.body.elevator) || null,
            entrance: Number(request.body.entrance) || null,

            //////////////비주거//////////////////////
            roadType: Number(request.body.roadType) || null,
            roadWidth: Number(request.body.roadWidth) || null,
            signboard: Number(request.body.signboard) || null,
            veranda: Number(request.body.veranda) || null,
            landShare: Number(request.body.landShare) || null,
            buildingUsedFor: request.body.buildingUsedFor || null,

            /////////////토지/////////////////////////
            roadLength: Number(request.body.roadLength) || null,
            landShape: Number(request.body.landShape) || null,
            landCategory: request.body.landCategory || null,
            landUsedFor: Number(request.body.landUsedFor) || null,
            landUsedForValue: request.body.landUsedForValue || null,
            floorAreaRatio: Number(request.body.floorAreaRatio) || null,
            buildingRatio: Number(request.body.buildingRatio) || null,
            grave: Number(request.body.grave) || null,
            graveMove: Number(request.body.graveMove) || null,
            ////////////기타사항/////////////////////
            owners: Number(request.body.owners) || null,
            relationOfRights: Number(request.body.relationOfRights) || null,
            loan: Number(request.body.loan) || null,
            loanValue: Number(request.body.loanValue) || null,
            cctv: Number(request.body.cctv) || null,
            security: Number(request.body.security) || null,
            managementCost: Number(request.body.managementCost) || null,
            managementCostValue: Number(request.body.managementCostValue) || null,
            managementCompany: request.body.managementCompany || null,
            builtYear: Number(request.body.builtYear) || null,
            builtBy: request.body.builtBy || null,
            /*playground: Number(request.body.playground) || null,
            kidHospital: Number(request.body.kidHospital) || null,
            hospital: Number(request.body.hospital) || null,
            elementarySchool: Number(request.body.elementarySchool) || null,
            middleSchool: Number(request.body.middleSchool) || null,
            highSchool: Number(request.body.highSchool) || null,
            university: Number(request.body.university) || null,*/
            subway: Number(request.body.subway) || null,
            /*bus: Number(request.body.bus) || null,
            departmentStore: Number(request.body.departmentStore) || null,
            mart: Number(request.body.mart) || null,
            supermarket: Number(request.body.supermarket) || null,
            convenienceStore: Number(request.body.convenienceStore) || null,*/
        };

        Models.house().update.houseOptions(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/house/update/photos', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/house.js :: /house/photo/update/photos called');
        let query = {
            photos: request.body.photos || [],
        };
        if (query.photos[0].length == 0) {
            responseHelper.success_send(200, true, response);
            return;
        }
        Models.house().update.housePhotos(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

