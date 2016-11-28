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
        //console.log("Variables: ", (this.variables[propertyName]));
            //console.log("Variables: ", JSON.stringify(this.variables[propertyName]));
            mqttManager.registerCallback(`CAN/${this.variables[propertyName].Module}/${this.variables[propertyName].data}`, this.valueUpdate.bind(this));
            console.log("Registered topic: ", `CAN/${this.variables[propertyName].Module}/${this.variables[propertyName].data}`);
        }
        
        setInterval(this.timerUpdate.bind(this), time);
    }

    valueUpdate(topic, message)
    {
      this.values[topic] = {}
      this.values[topic].msg = message;
      this.values[topic].time = (new Date).getTime(); 
      //console.log("Updated topic: ", topic, " with value ", message, " at time ", this.values[topic].time);
    }

    timerUpdate()
    {
      //console.log("RRD timer called for ", this.filename);
      let now = Math.ceil((new Date).getTime() / 1000);
      
      for (const propertyName of Object.keys(this.variables)) {
          //console.log("Update RRD ",this.filename, " With ", propertyName);
          let topic = `CAN/${this.variables[propertyName].Module}/${this.variables[propertyName].data}`
          if (this.values[topic])
          {
              //if (this.values[topic].time > (now*1000 - 20000))
              {
                  console.log("\tValue ", propertyName, " = ",this.values[topic].msg);
          
                  /*
                  rrd.update(this.filename, propertyName., [[now, this.value].join(':')], function (error) { 
                      if (error) console.log("Error:", error);
                  });
                  */
              //} else {
              //    console.log("\tValue was old ", propertyName, " time ",this.values[topic].time, " now: ", now*1000);
              }
          }
          
      }
    }
}

module.exports = RrdModuleInstance;
