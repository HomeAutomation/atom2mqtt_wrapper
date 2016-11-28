"use strict";

var rrd = require('rrd');
const fs = require("fs");
const RrdModuleInstance = require("./rrdmoduleinstance");

class RrdModule {
    constructor(filename, mqttManager) {
        this.filename = filename;
        this.rrdEntries = {};
        this.mqttManager  = mqttManager;
        this.rrdInstances = [];
    }

    load() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filename, (error, data) => {
                if (error) {
                    return reject(error);
                }

                this._parseRRD(data.toString());
                resolve();
            });
        });
    }

    begin() {
    /*
        const filename = 'test.rrd';
        let now = Math.ceil((new Date).getTime() / 1000);
        
        rrd.create(filename, 60, now, ["DS:busy:GAUGE:120:0:U", "RRA:LAST:0.5:1:60"], function (error) { 
            if (error) console.log("Error:", error);
        });
        let value = 80.0;
        rrd.update(filename, 'busy', [[now, value].join(':')], function (error) { 
            if (error) console.log("Error:", error);
        });
        this.value = 81;
        setInterval(this.timerUpdate.bind(this), 5000);
    */
    /*    
        "powerEnergy": {
        "rrd": {
            "file": "/var/www/html/can/CANgraph/powerEnergy.rrd",
            "Period_s": "300"
        },
        "rrdNames": {
            "watthour": {
                "Module": "Power",
                "data": "EnergySum",
                "value": "value"
            }
        }
    },*/

        
        
        for (const propertyName of Object.keys(this.rrdEntries)) {
            this.rrdInstances[propertyName] = new RrdModuleInstance(this.rrdEntries[propertyName].rrd.file, this.rrdEntries[propertyName].rrd.Period_s*1000,this.rrdEntries[propertyName].rrdNames, this.mqttManager);
        }
        
        
        
        
        
        
    }
    /*
    timerUpdate(timer)
    {
      console.log("RRD timer called.");
      const filename = 'test.rrd';
      let now = Math.ceil((new Date).getTime() / 1000);
      rrd.update(filename, 'busy', [[now, this.value].join(':')], function (error) { 
            if (error) console.log("Error:", error);
        });
        this.value++;
    }
*/
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

module.exports = RrdModule;
