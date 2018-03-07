
module.exports = {
    auth: () => { return require('./Authentification'); },
    fileUpload: () => { return require('./FileUpload'); },
    house: () => { return require('./House'); },
    admin: () => { return require('./Admin'); },
    report: () => { return require('./Report'); },
    agency: () => { return require('./Agency'); },
    user: () => { return require('./User'); },
    inquiry: () => { return require('./Inquiry'); },
    request: () => { return require('./Request'); },
    chat: () => { return require('./Chat'); },
    gps: () => { return require('./Gps'); },
    notification: () => { return require('./Notification'); },
    init: () => {
        require('./Authentification');
        require('./FileUpload');
        require('./House');
        require('./Admin');
        require('./Report');
        require('./Agency');
        require('./User');
        require('./Inquiry');
        require('./Request');
        require('./Chat');
        require('./Gps');
        require('./Notification');
    },
}
