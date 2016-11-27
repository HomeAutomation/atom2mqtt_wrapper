"use strict";

const Connection = require("./lib/connection");
const configuration = require("./configuration.json");

console.log(`Connecting to ${configuration.mqtt.url}:${configuration.mqtt.port}`);

const conn = new Connection(configuration);

conn.on("error", (error) => {
    console.error(error);
    process.exit(255);
});
/*
conn.on("message", (message) => {
    console.log("message", JSON.stringify(message));
});

conn.on("mqttmessage", (message) => {
    console.log("Message", JSON.stringify(message));
});
*/
conn.start().then(() => {
    console.log(`Listening on`);//${address.address}:${address.port}`);
})
.catch((error) => {
    console.error(error);
    process.exit(255);
});
