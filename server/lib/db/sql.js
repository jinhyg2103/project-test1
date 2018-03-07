module.exports = {
    HOUSE_AGENCY_CONCAT: 'CONCAT(\'{"id": \', agency.id, \', "ceoName": "\', agency.ceoName, \'", "agencyName": "\', agency.agencyName, \'", "phoneNumber": "\', agency.phoneNumber, \'", "state": "\', agency.state, \'", "city": "\', agency.city, \'", "address1": "\', agency.address1, \'", "address2": "\', agency.address2, \'", "type": "\', agency.type,\'"}\') agency',
    HOUSE_USER_CONCAT: 'CONCAT(\'{"id": \', user.id, \', "name": "\', COALESCE(user.name,\'\'), \'", "profileUrl": "\', COALESCE(user.profileUrl,\'\'), \'", "coverUrl": "\', COALESCE(user.coverUrl,\'\'), \'"}\') user',
    HOUSE_AGENCY_OWNER_CONCAT: 'CONCAT(\'{"id": \', agencyOwner.id, \', "ceoName": "\', agencyOwner.ceoName, \'", "agencyName": "\', agencyOwner.agencyName, \'", "phoneNumber": "\', agencyOwner.phoneNumber, \'", "state": "\', agencyOwner.state, \'", "city": "\', agencyOwner.city, \'", "address1": "\', agencyOwner.address1, \'", "address2": "\', agencyOwner.address2, \'", "type": "\', agencyOwner.type,\'"}\') agencyOwner',
    HOUSE_USER_OWNER_CONCAT: 'CONCAT(\'{"id": \', userOwner.id, \', "name": "\', COALESCE(userOwner.name,\'\'), \'", "profileUrl": "\', COALESCE(userOwner.profileUrl,\'\'), \'", "coverUrl": "\', COALESCE(userOwner.coverUrl,\'\'), \'"}\') userOwner',
    HOUSE_FAVORITE: 'IFNULL((SELECT true FROM houseFavorite WHERE house.id=houseFavorite.hId AND houseFavorite.uId=?), false) AS isFavorite',
    HOUSE_OPTION: 'CONCAT(\'{"options": \', IFNULL(houseOption.options, 0), \', "room": "\', IFNULL(houseOption.room, 0), \'", "bathroom": "\', IFNULL(houseOption.bathroom, 0), \'", "verandaExtension": "\', IFNULL(houseOption.verandaExtension, 0), \'", "direction": "\', IFNULL(houseOption.direction, 0), \'", "bay": "\', IFNULL(houseOption.bay, 0), \'", "boiler": "\', IFNULL(houseOption.boiler, 0), \'", "interior": "\', IFNULL(houseOption.interior, 0), \'", "paper": "\', IFNULL(houseOption.paper, 0), \'", "floor": "\', IFNULL(houseOption.floor, 0), \'", "parkingLot": "\', IFNULL(houseOption.parkingLot, 0), \'", "elevator": "\', IFNULL(houseOption.elevator, 0), \'", "entrance": "\', IFNULL(houseOption.entrance, 0), \'"}\') houseOption',

    INQUIRY_HOUSE: 'inquiryHouse.id AS ihId, inquiryHouse.isAccepted, inquiryHouse.isCanceled, inquiryHouse.isExpired',
    INQUIRY_USER_FROM_CONCAT: 'CONCAT(\'{"id": \', userFrom.id, \', "name": "\', COALESCE(userFrom.name,\'\'), \'", "profileUrl": "\', COALESCE(userFrom.profileUrl,\'\'), \'", "coverUrl": "\', COALESCE(userFrom.coverUrl,\'\'), \'"}\') userFrom',

    // User
    USER_AGENCY_CONCAT: 'CONCAT(\'{"id": \', agency.id, \', "registrationNumber": "\', agency.registrationNumber, \'", "ceoName": "\', agency.ceoName, \'", "agencyName": "\', agency.agencyName, \'", "phoneNumber": "\', agency.phoneNumber, \'", "state": "\', agency.state, \'", "city": "\', agency.city, \'", "address1": "\', agency.address1, \'", "address2": "\', agency.address2, \'", "addressFull": "\', agency.addressFull, \'", "longitude": "\', agency.longitude, \'", "latitude": "\', agency.latitude, \'", "type": "\', agency.type, \'", "isCertified": "\', agency.isCertified, \'"}\') agency',
    USER_FAVORITE: 'IFNULL((SELECT true FROM userFavorite WHERE user.id=userFavorite.uIdTo AND userFavorite.uIdFrom=?), false) AS isFavorite',

    // Request Sell
    REQUEST_SELL_CONCAT: 'requestSell.id AS rsId, requestSell.requestToAgency AS requestToAgency, requestSell.isAccepted',

    // Request Find Customer
    REQUEST_FIND_CUSTOMER_CONCAT: 'requestFindCustomer.id AS rfcId, requestFindCustomer.memo AS memo, requestFindCustomer.isAccepted AS isAccepted, requestFindCustomer.uIdTo AS uIdTo',
    REQUEST_FIND_CUSTOMER_HOUSE_CONCAT: 'house.title AS title, house.description AS description, house.price AS price, house.type AS type, house.area AS area, house.areaForExclusiveUse AS areaForExclusiveUse, house.dealingType AS dealingType, house.state AS state, house.city AS city, house.address1 AS address1, house.address2 AS address2, house.addressFull AS addressFull, house.longitude AS longitude, house.latitude AS latitude, house.memo AS memo, house. houseStatus AS houseStatus',

    // Chat
    CHAT_AGENCY_CONCAT: 'CONCAT(\'{"id": \', agency.id, \', "ceoName": "\', agency.ceoName, \'", "agencyName": "\', agency.agencyName, \'", "phoneNumber": "\', agency.phoneNumber, \'", "state": "\', agency.state, \'", "city": "\', agency.city, \'", "address1": "\', agency.address1, \'", "address2": "\', agency.address2, \'"}\') agency',
    CHAT_CHATLINE_CONCAT: 'CONCAT(\'{"url": \', chatLine.url, \', "text": "\', chatLine.text, \'", "hId": "\', chatLine.hId, \'"}\') chatLine',
    CHAT_USER_CONCAT: 'CONCAT(\'{"id": \', user.id, \', "name": "\', COALESCE(user.name,\'\'), \'", "profileUrl": "\', COALESCE(user.profileUrl,\'\'), \'", "coverUrl": "\', COALESCE(user.coverUrl,\'\'), \'"}\') user',

    // Common
    HOUSE_PHOTOS_CONCAT: 'GROUP_CONCAT(CONCAT(\'{"url": "\', housePhoto.url, \'", "order": \', housePhoto.order, \'}\') ORDER BY housePhoto.order ASC) photos',
};
