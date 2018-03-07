
module.exports = {
    auth: () => { return require('./Authentification'); },
    //fileUpload: () => { return require('./FileUpload'); },
    user: () => { return require('./User'); },
    notification: () => { return require('./Notification'); },
    init: () => {
        require('./Authentification');
        //require('./FileUpload');
        require('./User');
        require('./Notification');
    },
}
