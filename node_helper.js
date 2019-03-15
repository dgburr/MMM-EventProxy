/*
 * File:        node_helper.js
 * Created:     11/03/2019 by Daniel Burr <dburr@dburr.net>
 * Description: Node helpers for MMM-EventProxy
 * License:     GNU Public License, version 3
 */

/* jshint node: true, esversion: 6*/

"use strict";

var NodeHelper = require("node_helper");
const exec = require("child_process").exec;

module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        if(notification === 'COMMAND') {
            exec(payload);
        }
    },
});
