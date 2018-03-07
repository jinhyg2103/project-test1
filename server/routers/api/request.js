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

    // Request Sell
    router.get('/request/get/sells', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/sells called');
        let query = {
            uId: null,
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            uIdFrom: Number(request.query.uIdFrom) || null,
            uIdTo: Number(request.query.uIdTo) || null,
        };
        query.uId = request.user.id;
        Models.request().get.sells(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    // Request SellAgencies
    router.get('/request/get/sellAgencies', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/sellAgencies called');
        let query = {
            uId: null,
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            hId: Number(request.query.hId) || null,
        };
        query.uId = request.user.id;
        Models.request().get.sellAgencies(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    // Request Find House
    router.get('/request/get/findHouses', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findHouses called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            uId: null,
            requestType: Number(request.query.requestType) || 1,
        };
        query.uId = request.user.id;
        Models.request().get.findHouses(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/request/get/findHouseById', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findHouseById called');
        let query = {
            rfhId: Number(request.query.rfhId) || 0,
            uId: null,
        };
        query.uId = request.user.id;
        Models.request().get.findHouseById(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/request/get/findHouseAsks', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findHouseAsks called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            uIdTo: null,
            uId: null,
            requestType: Number(request.query.requestType) || 1,
        };
        query.uIdTo = request.user.id;
        query.uId = request.user.id;
        Models.request().get.findHouseAsks(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.get('/request/get/findHouseAnswers', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findHouseAnswers called');
        let query = {
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            rfhId: Number(request.query.rfhId) || null,
        };
        query.uId = request.user.id;
        Models.request().get.findHouseAnswers(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    // Request Find Customers
    router.get('/request/get/findCustomers', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findCustomers called');
        let query = {
            uId: null,
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            uIdFrom: Number(request.query.uIdFrom) || null,
            uIdTo: Number(request.query.uIdTo) || null,
        };
        query.uId = request.user.id;
        Models.request().get.findCustomers(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    // Request Customer Agencies
    router.get('/request/get/findCustomerAgencies', authValidHelper.is_login, (request, response) => {
        console.log('(GET) controller/api/request.js :: /request/get/findCustomerAgencies called');
        let query = {
            uId: null,
            from: Number(request.query.from) || 0,
            count: Number(request.query.count) || 20,
            hId: Number(request.query.hId) || null,
        };
        query.uId = request.user.id;
        console.log(query);
        Models.request().get.findCustomerAgencies(query, (err, data) => {
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

    // Request Sell
    router.post('/request/create/sell', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/create/sell called');
        let query = {
            hId: Number(request.body.hId) || null,
            uIdFrom: null,
            uIdsTo: request.body.uIdsTo || null,
            requestToAgency: request.body.requestToAgency || '',
        };
        query.uIdFrom = request.user.id;
        Models.request().create.sell(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/accept/sell', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/accept/sell called');
        let query = {
            rsId: Number(request.body.rsId) || null,
            hId: Number(request.body.hId) || null,
        };
        query.uId = request.user.id;
        Models.request().accept.sell(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/delete/sell', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/delete/sell called');
        let query = {
            hId: Number(request.body.hId) || null,
            uIdFrom: Number(request.body.uIdFrom) || null,
            uIdTo: Number(request.body.uIdTo) || null,
        };
        Models.request().delete.sell(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    // Request Find House
    router.post('/request/create/find/house', (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/create/find/house called');
        let query = {
            uIdFrom: null,
            uIdsTo: request.body.uIdsTo || null,
            price: Number(request.body.price) || null,
            deposit: Number(request.body.deposit) || null,
            houseType: Number(request.body.houseType) || null,
            area: Number(request.body.area) || null,
            areaForExclusiveUse: Number(request.body.areaForExclusiveUse) || null,
            dealingType: Number(request.body.dealingType) || null,
            state: request.body.state || null,
            city: request.body.city || null,
            address1: request.body.address1 || null,
            address2: request.body.address2 || null,
            addressFull: request.body.addressFull || null,
            requestType: Number(request.body.requestType) || null, // 1은 고객 -> 중개사(집찾기), 2는 중개사 -> 중개사 (매물요청)
            memo: request.body.memo || null,
        };
        query.uIdFrom = request.user.id;
        Models.request().create.findHouse(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data.toString(), response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/delete/find/house', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/delete/find/house called');
        let query = {
            rfhId: request.body.rfhId || null,
        };
        Models.request().delete.findHouse(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/accept/find/house/ask', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/accept/find/house/ask called');
        let query = {
            rfhaId: Number(request.body.rfhaId) || null,
            hIds: request.body.hIds || null,
            requestType: request.body.requestType || null,
        };
        query.uId = request.user.id;
        Models.request().accept.findHouseAsk(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/delete/find/house/ask', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/delete/find/house called');
        let query = {
            rfhaId: request.body.rfhaId || null,
        };
        Models.request().delete.findHouseAsk(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });

    // Request Find Customer
    router.post('/request/create/find/customer', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/create/find/customer called');
        let query = {
            uIdFrom: null,
            uIdsTo: request.body.uIdsTo || null,
            hIds: request.body.hIds || null,
            memo: request.body.memo || null,
        };
        query.uIdFrom = request.user.id;
        Models.request().create.findCustomer(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/accept/find/customer', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/accept/find/customer called');
        let query = {
            rfcId: Number(request.body.rfcId) || null,
            hId: Number(request.body.hId) || null,
        };
        query.uId = request.user.id;
        Models.request().accept.findCustomer(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    router.post('/request/delete/find/customer', authValidHelper.is_login, (request, response) => {
        console.log('(POST) controller/api/request.js :: /request/delete/find/customer called');
        let query = {
            hId: Number(request.body.hId) || null,
            uIdFrom: Number(request.body.uIdFrom) || null,
            uIdTo: Number(request.body.uIdTo) || null,
        };
        Models.request().delete.findCustomer(query, (err, data) => {
            if (data && !err) {
                responseHelper.success_send(200, data, response);
            } else {
                responseHelper.err_send(err, response);
            }
        });
    });
    return router;
};

