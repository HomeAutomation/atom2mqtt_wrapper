"use strict";

const EventEmitter = require("events");
const mqtt = require("mqtt");

class MqttManager extends EventEmitter {
    constructor(configuration, protocol) {
        super();
        this.config = configuration;
        this.protocol = protocol;
        this.messageCallbacks = [];
    }

    connect() {
        this.mqttclient = mqtt.connect(this.config.url, this.config);
        this.mqttclient.on("connect", () => {
            this.mqttclient.subscribe("CAN/#");
            this.mqttclient.publish("presence", "Hello mqtt from nodejs logic");
        });

        this.mqttclient.on("message", (topic, message) => {
            console.log("Got mqtt:_", topic, "_", message.toString(), "_");
            
            this.processCallbacks(topic, message.toString());
            //const res = topic.split("/");
            //const data = JSON.parse(message);
            
            //const msg = this.protocol.lookupMessage(res[1]);
            //console.log("Got: ", JSON.stringify(msg));

            //this.emit("message", this.protocol.appendVariablesToMessage(msg, data.command, data.variables));
        });
    }

    processCallbacks(topic, message) {
        for (const propertyName of Object.keys(this.messageCallbacks)) {
            //Add regex or similar to support wildcards in topic
            if (this.messageCallbacks[propertyName].topic === topic ) {
                console.log("found callback for topic: ", topic, " with value; ", message);
                this.messageCallbacks[propertyName].callback(this.messageCallbacks[propertyName].obj,topic, message);
            }
        }
    }

    registerCallback(obj,topic, callback) {
        for (const propertyName of Object.keys(this.messageCallbacks)) {
            if (this.messageCallbacks[propertyName].topic === topic && this.messageCallbacks[propertyName].callback === callback) {
                return propertyName;
            }
        }
        let index = this.messageCallbacks.length;
        if (index === undefined)
        {
            index = 0;
        }
        this.messageCallbacks[index] = [];
        this.messageCallbacks[index].topic = topic;
        this.messageCallbacks[index].callback = callback;
        this.messageCallbacks[index].obj = obj;
        console.log("Registered new callback: ", JSON.stringify(this.messageCallbacks));
        return index;
    }

    unregisterCallback(index) {
        // do something to remove from this.messageCallbacks
    }

    close() {
        this.mqttclient.end();
    }

    publish(topic, value) {
        this.mqttclient.publish(topic, value);
    
        console.log("Sent msg topic: ",topic, " with value: ", value)
        /*if (!mqttmessagelist[topic]) {
            mqttmessagelist[topic] = "";
        }
        if (mqttmessagelist[topic] !== value) {
            this.mqttclient.publish(topic, value);
            // console.log("Sent topic");
            mqttmessagelist[topic] = value;
        }
        */
    }
}

module.exports = MqttManager;
