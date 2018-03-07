module.exports = {
    sms: () => { return require('./sms'); },
    init: () => {
        require('./sms');
    },
}