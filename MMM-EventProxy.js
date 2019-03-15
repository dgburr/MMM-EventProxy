/*
 * File:        MMM-EventProxy.js
 * Created:     04/03/2019 by Daniel Burr <dburr@dburr.net>
 * Description: Main file for MMM-EventProxy
 * License:     GNU Public License, version 3
 */

Module.register("MMM-EventProxy", {
    defaults: {
        timeout: 1000,
    },

    start: function() {
        this.current_message = null;
        this.current_message_timeout = null;
    },

    updateCurrentMessage: function(new_message) {
        this.clearCurrentMessage();
        this.current_message = new_message;
        this.updateDom();
    },

    clearCurrentMessage: function(new_message) {
        if(this.current_message_timeout) {
            clearTimeout(this.current_message_timeout);
        }
        this.start();
    },

    notificationReceived: function(notification, payload) {
        var self = this;

        Object.keys(this.config).forEach(event_in => {
            if(notification == event_in) {
                var event_config = this.config[event_in];

                // update UI with message (if requested)
                if(event_config.message) {
                    this.updateCurrentMessage(this.config[event_in].message);
                    this.current_message_timeout = setTimeout(function() {
                        self.updateCurrentMessage();
                    }, this.config.timeout);
                }

                // send notifications and commands (if any)
                if(event_config.actions) {
                    event_config.actions.forEach(event_out => {
                        if(event_out.notification) {
                            this.sendNotification(event_out.notification, event_out.payload);
                        }

                        if(event_out.command) {
                            this.sendSocketNotification("COMMAND", event_out.command);
                        }
                    });
                }
            }
        });
    },

    getDom: function() {
        // Create and configure DOM elements
        var wrapper = document.createElement("div");
        wrapper.classList.add("small");
        if(this.current_message) wrapper.innerHTML = this.current_message;
        return wrapper;
    },
});
