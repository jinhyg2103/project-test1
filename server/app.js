
global.__base = __dirname + '/';
global.poolCluster = null;

try {
// AppDynamics
    /*require('appdynamics').profile({
        controllerHostName: 'monroe2017092117022117.saas.appdynamics.com',
        controllerPort: 443,

        // If SSL, be sure to enable the next line
        controllerSslEnabled: true,
        accountName: 'monroe2017092117022117',
        accountAccessKey: 'krkfmrtcpbc7',
        applicationName: 'Jivida',
        tierName: 'jivida1',
        nodeName: 'process', // The controller will automatically append the node name with a unique number
    });*/

// Library
    const fs = require('fs');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const passport = require('passport');
    const express = require('express');
    const path = require('path');
    const async = require('async');
    const MySQLStore = require('express-mysql-session')(session);
    const React = require('react');

// Models
    const Models = require('./models/index');
    Models.init();

// Lib
    const dbConnectionHelper = require('./lib/db/dbConnectionHelper');
    dbConnectionHelper.init();

// Config
    const c = require('./config/const.json');


    const app = express();
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, '/public')));
    app.set('views', path.join(__dirname, '/public'));
    app.set('view engine', 'ejs');
    app.set('json spaces', 2);
    app.use(cookieParser());
    const dbConfig = require(__base + 'config/db.conf.json').app;

    dbConfig.createDatabaseTable = true;
    dbConfig.schema = {
        tableName: 'sessions',
        columnNames: { // 이 폼은 건드리지 말 것
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        },
    };
    app.use(session({ resave: true,
        saveUninitialized: false,
        rolling: true,
        secret: 'codecrain',
        store: new MySQLStore(dbConfig),
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'bower_components')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Credentials', true);
        response.header('Access-Control-Allow-Origin', request.headers.origin);
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        response.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

// Serve static files
    app.use('/abeabewab', express.static(path.join(__dirname, '../server/48168B3EC8EC2ABA906323488FEB22F2.txt'), { maxAge: 30 }));
    app.use('/jivida', express.static(path.join(__dirname, '../public/' + c.APP_NAME), { maxAge: 30 }));
    app.use('/admin', express.static(path.join(__dirname, '../public/Admin'), { maxAge: 30 }));
    app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'), { maxAge: 30 }));
    app.use('/sitemap.xml', express.static(path.join(__dirname, 'src/build/sitemap.xml'), { maxAge: 30 }));
    app.use('/.well-known/pki-validation/48168B3EC8EC2ABA906323488FEB22F2.txt', express.static('./48168B3EC8EC2ABA906323488FEB22F2.txt', { maxAge: 30 }));

// **  API
// Route Common
    const routeClientPopup = require('./routers/popup');
    const routeClientJivida = require('./routers/jivida');
    const routeClientAdmin = require('./routers/admin');
    const routeAuth = require('./routers/api/auth');
    const routeUpload = require('./routers/api/upload');
    const routeReport = require('./routers/api/report');
    const routeHouse = require('./routers/api/house');
    const routeRequest = require('./routers/api/request');
    const routeChat = require('./routers/api/chat');
    const routeUser = require('./routers/api/user');
    const routeInquiry = require('./routers/api/inquiry');
    const routeAgency = require('./routers/api/agency');
    const routeGps = require('./routers/api/gps');

    app.use('/api', routeAuth());
    app.use('/api', routeUpload());
    app.use('/api', routeReport());
    app.use('/api', routeHouse());
    app.use('/api', routeRequest());
    app.use('/api', routeChat());
    app.use('/api', routeUser());
    app.use('/api', routeInquiry());
    app.use('/api', routeAgency());
    app.use('/api', routeGps());

    // Admin
    const routeAdminAuth = require('./routers/api/admin/auth');
    const routeAdminAgency = require('./routers/api/admin/agency');
    const routeAdminHouse = require('./routers/api/admin/house');
    const routeAdminUser = require('./routers/api/admin/user');
    const routeAdminSms = require('./routers/api/admin/sms');
    const routeAdminPush = require('./routers/api/admin/push');
    const routeAdminReport = require('./routers/api/admin/report');
    const routeAdminGps = require('./routers/api/admin/gps');

    app.use('/api/admin', routeAdminAuth());
    app.use('/api/admin', routeAdminAgency());
    app.use('/api/admin', routeAdminHouse());
    app.use('/api/admin', routeAdminUser());
    app.use('/api/admin', routeAdminSms());
    app.use('/api/admin', routeAdminPush());
    app.use('/api/admin', routeAdminReport());
    app.use('/api/admin', routeAdminGps());

    // Route App
    routeClientPopup(app);
    routeClientAdmin(app);
    routeClientJivida(app);


    // Server
    const http = require('http').Server(app);
    http.listen(app.get('port'), () => {
        console.log('app.js :: app.listen :: Server Start on port number ' + app.get('port'));
    });
    const httpsOption = {
        ca: [
            fs.readFileSync(path.join(__dirname, './config/cert/AddTrustExternalCARoot.crt')),
            fs.readFileSync(path.join(__dirname, './config/cert/COMODORSAAddTrustCA.crt')),
            fs.readFileSync(path.join(__dirname, './config/cert/COMODORSADomainValidationSecureServerCA.crt')),
        ],
        key: fs.readFileSync(path.join(__dirname, './config/cert/jivida_com_SHA256WITHRSA.key')),
        cert: fs.readFileSync(path.join(__dirname, './config/cert/jivida_com.crt')),
    };
    const https = require('https').createServer(httpsOption, app);
    https.listen(4443, () => {
        console.log('app.js :: app.listen :: Server Start on port number 4443');
    });

    // Socket
    const io = require('socket.io')(http);
    const ioSSL = require('socket.io')(https);
    const socket = require('./routers/socket/chat');
    socket(io);
    socket(ioSSL);

    /*const Aws = require(__base + 'lib/aws/aws');
    Aws.sns.sendSMS({
        fullPhoneNumber: '821048719653',
        message: '부동산 어플 지비다(w ww.jivida.com)\n' +
        '현재 이의동에서 고객이 찾고 있습니다.\n' +
        '아파트 매매\n' +
        '엄청나게 큰 평수를 원하고 있으니 좋은 매물을 찾아서 넘겨야 한다\n' +
        '회원가입 후 고객 확인하기',
    }, (err, data) => {});*/
    Models.notification().push.send.all({
        title: "지비다 전체공지",
        body: "테스트 메세지입니다.",
        uId: 12,
    }, () => {});
} catch (e) {
    console.log(e);
}
