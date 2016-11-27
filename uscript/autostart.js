"use strict";

const SkoHylla = require("./skohylla.js");

class AutoStart {
    constructor(mqttManager) {
        var globalSkothing = new SkoHylla(mqttManager,"PIR_Kok","koksbank","High",10000);
        console.log("Autostart created.");
    }

/*
Require("CLCD_Display.js");
Require("GLCD_Display.js");
Require("skohylla.js");
Require("RRD_Tool.js");
Require("badrumsdimmer.js");
Require("TouchPanel.js");
Require("bardisk.js");
Require("IR.js");
Require("temperatur.js");
Require("bedroomDisplay.js");
//Require("stdCanTest.js");
Require("adventsljusstake.js");
Require("wifipid.js");
Require("wifiroomba.js");


//var sensorRKSEEK_API = "08f77243163de85ee4f89d606b04f1c46bea8740";
var globalCLCDthing = new CLCD_Display("SovrumDisplay","SovrumRotary");
var globalGLCDthing = new GLCD_Display("Hall_display","HallRotary_left");
//var globalRRDthing = new RRD_Tool("RRD_Tool_config");
var globalSkothing = new skohylla("PIR_Hallen","Skohylla","Low",255);
var globalSangHelena = new skohylla("PIR_Helena","Sang_Helena","High",10);
var globalSangLinus = new skohylla("PIR_Linus","Sang_Linus","High",10);
var globalbeddisplay = new bedroomDisplay("dotmatrix","Power", "Vastersensor", "StekTermometer");
var globalSkothing2 = new skohylla("PIR_Kok","koksbank","High",255);
var globalbadrumsdimmer = new badrumsdimmer("PIR_Badrum", "Badrum", "BadrumRotary", "Badrum1", "Badrum_LedVal", "PIR_Korridor"); 
var globalTouchthing = new TouchPanel("TouchRGB_red","TouchRGB_green", "TouchRGB_blue", "HallenTouch", "Badrum_grupp", "Hall_ljus", "TakSovrum","bardisk", "bardisk_tak", "bardisk_tv", "Hall_ljus_bad", "irVardagsrum");
var globalBardiskthing = new bardisk("bardisk_knapp","bardisk_tv_knapp", "bardisk","bardisk_tv", "bardisk_tak");
var globalIRthing = new IR("IR_Transmit_HDMI", "IRr");
//var globalTestthing = new stdCanTest("StdCanDebug");
//var globalRfthing = new temperatur("rf");
var globalWifipidthing = new wifipid("hok.famlundin.org:8181/sensors",9980, "PIDwifi");
var globalWifiroombathing = new wifiroomba("pumba.lan/sensors",9980, "Pumba");
Log("\033[31mAutostart done.\033[0m\n");
*/

}

module.exports = AutoStart;