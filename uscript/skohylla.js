"use strict";


class skohylla {
    constructor(mqttManager,aliasSensor, aliasDimmer, triggerstate, defaultValue) {
        /* We must always call the parent constructor, initialization
           of variables could be done here, but initialize is a better place */
        this.mySensor = aliasSensor;
        this.myDimmer = aliasDimmer;
        this.triggstate = triggerstate;
        this.defaultValue = defaultValue;
        this.mqttManager  = mqttManager;
        
        /* Declaration of instance variables*/
        this.outputStatus = "Low";
        this.myInterval = null;
        this.oldPwmValue = 0;
        this.turnOffCnt = 0;
        this.last_dimmer_value = 0;
        const SkoMovementTimeout = 100;
        
        mqttManager.registerCallback(`CAN/${this.mySensor}/Status`, this.sensorOnMessage.bind(this));
        mqttManager.registerCallback(`CAN/${this.myDimmer}/Pwm`, this.dimmerOnMessage.bind(this));

        /*
        Module_RegisterToOnMessage(aliasnameSensor, function(alias_name, command, variables) { self.sensorOnMessage(alias_name, command, variables) });
        Module_RegisterToOnChange( aliasnameSensor, function(alias_name, available,test) { self.sensorOnline(alias_name, available,test) });
        Module_RegisterToOnChange( aliasnameDimmer, function(alias_name, available) { self.dimmerOnline(alias_name, available) });
        */
        /* Start interval timer for sending timestamp to network. Arguments are the callback function and time in milliseconds 
        used to make sure an eth-node gets its init packet (600s) */
        //this.myTimer = Timer_SetTimer(function(timer) {self.timerUpdate(timer)}, 5000, true);
        setInterval(this.timerUpdate.bind(this), 5000);
        console.log("Skohylla created.", this.mySensor, this.myDimmer, this.triggstate);
    }
    
    sensorOnMessage(topic, value)
    {
      console.log("Got Callback!!!!");
      //Log("\033[33mMessage.\033[0m\n");
      console.log("Is ", value, "===" , this.triggstate);
      if (value === this.triggstate) {
        console.log("Match triggerstate! ",this.last_dimmer_value, "=", "0");
        //Log("\033[33mPin low.\033[0m\n");
        if (this.last_dimmer_value == "0") {
          //log(this.myName + ":" + this.myId + "> Light on.\n");
          if (this.oldPwmValue == 0) {
            this.oldPwmValue = this.defaultValue;
          }
          console.log("Send new value to dimmer: ", this.oldPwmValue);
          //Dimmer_AbsoluteFade(this.myDimmer, 129, this.oldPwmValue);
          this.mqttManager.publish("CAN/"+this.myDimmer, '{"command":"Abs_Fade","variables":{"EndValue":'+this.oldPwmValue+',"Speed":135}}');
          //CAN/koksbank -m '{"command":"Abs_Fade","variables":{"EndValue":8000,"Speed":135}}'
          
        }
      } else {
        //Log("\033[33mPin high.\033[0m\n");
        console.log("Not Match triggerstate!");
      }
      if (this.turnOffCnt <  this.SkoMovementTimeout) {
        this.turnOffCnt = this.SkoMovementTimeout;
      }
    }
    
    dimmerOnMessage(topic, value)
    {
      this.last_dimmer_value = value;
      console.log("Got dimmer Callback!!!! ", value);
    }
    
    timerUpdate(timer)
    {
      console.log("Timer called.", this.turnOffCnt);
      
    	if (this.turnOffCnt > 0) {
    		this.turnOffCnt -= 5;
    		if (this.turnOffCnt < 0) {
    			this.turnOffCnt = 0;
    		}
    		if (this.turnOffCnt == 0) {
    			//Turn off light
    			//log(this.myName + ":" + this.myId + "> Light off.\n");
    			var last_value_string = Storage_GetParameter("LastValues", this.myDimmer);
    			var last_value = eval("(" + last_value_string + ")");
    			this.oldPwmValue = last_value["Level"]["value"];
    			//this.myPWM.setPWMValue(0,2);
    			Dimmer_AbsoluteFade(this.myDimmer, 132, 0);
    			//getDimmerService('Skohylla').absFade(2,129, 0);
    		}
    	}
    }
    
    
    sensorOnline(alias_name, available)
    {
      
    }
    
    dimmerOnline(alias_name, available)
    {
      
    }
}


module.exports = skohylla;
