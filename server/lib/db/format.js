module.exports = {
    house: (house) => {
        if (house.photos) house.photos = JSON.parse('[' + house.photos + ']');
        if (house.user) house.user = JSON.parse(house.user);
        if (house.agency) house.agency = JSON.parse(house.agency);
        if (house.userOwner) house.userOwner = JSON.parse(house.userOwner);
        if (house.agencyOwner) house.agencyOwner = JSON.parse(house.agencyOwner);
        if (house.userFrom) house.userFrom = JSON.parse(house.userFrom);
        if (house.options) house.options = JSON.parse(house.options);
        return house;
    },
    user: (user) => {
        if (user.agency) user.agency = JSON.parse(user.agency);
        if (user.agency) user.agency.isCertified = (user.agency.isCertified === '1');
        if (user.agency) user.agency.type = Number(user.agency.type);
        return user;
    },
    chat: (chat) => {
        if (chat.user) chat.user = JSON.parse(chat.user);
        if (chat.agency) chat.agency = JSON.parse(chat.agency);
        if (chat.chatLine) {
            if (chat.chatLine.text) {
                chat.text = chat.chatLine.text;
            } else if (chat.chatLine.image) {
                chat.text = '(사진)';
            } else if (chat.chatLine.hId) {
                chat.text = '(집 정보)';
            } else {
                chat.text = '';
            }
        } else {
            chat.text = '';
        }
        return chat;
    },
    chatLine: (chatLine) => {
        if (chatLine.user) chatLine.user = JSON.parse(chatLine.user);
        if (chatLine.agency) chatLine.agency = JSON.parse(chatLine.agency);
        return chatLine;
    },
};
