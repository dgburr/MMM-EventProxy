/*
 * File:        MMM-EventProxy.js
 * Created:     04/03/2019 by Daniel Burr <dburr@dburr.net>
 * Description: Main file for MMM-EventProxy
 * License:     GNU Public License, version 3
 */

Module.register("MMM-EventProxy", {
    notificationReceived: function(notification, payload) {
        var self = this;

        Object.keys(this.config).forEach(event_in => {
            if(notification == event_in) {
                var event_config = this.config[event_in];

                // send notifications and commands (if any)
                event_config.forEach(event_out => {
                    if(event_out.notification) {
                        this.sendNotification(event_out.notification, event_out.payload);
                    }

                    if(event_out.command) {
                        this.sendSocketNotification("COMMAND", event_out.command);
                    }
                });
            }
        });
    },
});
