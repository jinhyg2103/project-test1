const async = require('async');
const fs = require('fs');

const admin = require("firebase-admin");
const serviceAccount = require("./jivida-1506869834434-firebase-adminsdk-rc7xj-acf5c25b45.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jivida-1506869834434.firebaseio.com"
});



module.exports = {
    send: (token, title, body) => {
        // See the "Defining the message payload" section below for details
        // on how to define a message payload.
        const payload = {
            notification: {
                title: title,
                body: body,
            },
        };
        // Send a message to the device corresponding to the provided
        // registration token.
        admin.messaging().sendToDevice(token, payload)
            .then((response) => {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
/*
                console.log("Successfully sent message:", response);
*/
                console.log(response.results[0]);
            })
            .catch((error) => {
                console.log("Error sending message:", error);
            });
    },
};