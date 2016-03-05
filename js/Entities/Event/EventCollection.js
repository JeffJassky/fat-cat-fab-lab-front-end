App.module('Entities.Event', function(Event){
    'use strict';

    Event.EventCollection = Backbone.Collection.extend({
    	model: Event.EventModel,
    	url: 'https://www.googleapis.com/calendar/v3/calendars/7sng0uhmbhps29hbpfturq8ncsvmhlco%40import.calendar.google.com/events?key=AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
    	localStorage: true,
    	parse: function(response){
    		return response.items;
    	},
    	getNextEvent: function(){
    		return this.find(function(model){
    			return model.get('isInFuture');
    		});
    	},
    	getFutureEvents: function(){
    		return this.filter(function(model){
    			return model.get('isInFuture');
    		});
    	}
    });

});