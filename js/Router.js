App.module('Routes', function(Routes, App){
    'use strict';

    Routes.onStart = function() {
        console.log('Initializing Routes');
        App.Router = new Routes.Router();
        Backbone.history.start();
    };

	Routes.Router = Backbone.Router.extend({
		routes: {
			"home": "home",
			"events": "events"
		},
		home: function(){
	    	App.Events.Controller.showNextEvent();
		},
		events: function(){
	    	App.Events.Controller.showAllEvents();
		}
	});
});
