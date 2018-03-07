
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
        applicationName: 'Sellev',
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
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'bower_components')));
    app.use(passport.initialize());
    app.use(passport.session());

// Serve static files
    app.use('/sellev', express.static(path.join(__dirname, '../public/' + c.APP_NAME), { maxAge: 30 }));
    app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'), { maxAge: 30 }));

// **  API
// Route Common
    const routeClient = require('./routers/sellev');
    const routeAuth = require('./routers/api/auth');
    //const routeUpload = require('./routers/api/upload');

    app.use('/api', routeAuth());
    //App.use('/api', routeUpload());

    // Route App
    routeClient(app);

    // Server
    const http = require('http').Server(app);
    http.listen(app.get('port'), () => {
        console.log('app.js :: App.listen :: Server Start on port number ' + app.get('port'));
    });
} catch (e) {
    console.log(e);
}
