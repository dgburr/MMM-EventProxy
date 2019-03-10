Module.register("MMM-EventProxy", {
    notificationReceived: function(notification, payload) {
	Object.keys(this.config).forEach(event_in => {
            if(notification == event_in) {
		this.config[event_in].forEach(event_out => {
			this.sendNotification(event_out.notification, event_out.payload);
		});
	    }
	});
    },
});
