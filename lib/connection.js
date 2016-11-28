"use strict";
const AutoStart = require("../uscript/autostart.js");
const EventEmitter = require("events");
const dgram = require("dgram");
const MqttManager = require("./mqttmanager");
const RrdModule = require("./rrdmodule");


class Connection extends EventEmitter {
    constructor(configuration) {
        super();
        this.mqttManager = new MqttManager(configuration.mqtt);
        this.rrdManager = new RrdModule(configuration.rrd, this.mqttManager);

/*
        this.mqttManager.on("message", (message) => {
            console.log("Got: ", JSON.stringify(message));
            this.send(message);
        });
        //
*/
    }

    async start() {
        await this.mqttManager.connect();
        await this.rrdManager.load();
        console.log("Starting Connection");
        this.autostart = new AutoStart(this.mqttManager);
        this.rrdManager.begin();
        
    }
/*
    send(message) {
        return this._send(this.encoder.encode(message));
    }
*/
/*
    _send(data) {
        const client = dgram.createSocket("udp4");

        return new Promise((resolve, reject) => {
            //console.log("Sending data to CAN-node. ", data.toString());
            client.send(data, this.port, this.host, (error) => {
                if (error) {
                    console.log("Error sending message to CAN-node.");
                    return reject(error);
                }

                client.close();
                resolve();
            });
        });
    }
*/
    dispose() {
        if (this.MqttManager) {
            this.MqttManager.close();
            this.MqttManager = null;
        }
    }
}

module.exports = Connection;
