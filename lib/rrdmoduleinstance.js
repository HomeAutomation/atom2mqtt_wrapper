"use strict";

var rrd = require('rrd');
const fs = require("fs");

class RrdModuleInstance {
    constructor(filename, time, variables, mqttManager) {
        this.filename = filename;
        this.time = time;
        this.variables = variables;
        this.values = {};
        this.mqttManager  = mqttManager;
        
        
        for (const propertyName of Object.keys(this.variables)) {
            
            mqttManager.registerCallback(`CAN/${this.variables[propertyName].Module}/${this.variables[propertyName].Data}`, this.valueUpdate.bind(this));
        }
        
        setInterval(this.timerUpdate.bind(this), time);
    }

    valueUpdate(topic, message)
    {
      this.values[topic] = message;
    }

    timerUpdate()
    {
      console.log("RRD timer called.");
      let now = Math.ceil((new Date).getTime() / 1000);
      
      
      //rrd.update(this.filename, 'busy', [[now, this.value].join(':')], function (error) { 
            if (error) console.log("Error:", error);
        });
        this.value++;
    }

    _parseRRD(data) {
        const regexp = /([A-Za-z0-9_]*)=(.*)/g;
        const regexp2 = /([A-Za-z0-9_]*)=(.*)/;
        const matchesArray = data.match(regexp);

        for (let i = 0; i < matchesArray.length; i++) {
            const match = matchesArray[i].match(regexp2);
            const parseddata = JSON.parse(match[2]);
            const group = parseddata.group;
            const name = match[1];
            this.rrdEntries[name] = parseddata;
            /*
            if (group === false) {
                const modName = parseddata.module_name.toString();
                const modId = parseInt(parseddata.module_id, 10);
                const specific = parseddata.specific;
                this.protocol.appendModuleInstance(name, modName, modId, specific);
            }
            
            */
        }
        console.log("Found rrd: ", JSON.stringify(this.rrdEntries, null, 4));
    }
}

module.exports = RrdModuleInstance;
