App.module('Entities.Event', function(Event){
    'use strict';

    Event.EventCollection = Backbone.Collection.extend({
    	model: Event.EventModel,
    	url: 'https://www.googleapis.com/calendar/v3/calendars/7sng0uhmbhps29hbpfturq8ncsvmhlco%40import.calendar.google.com/events?key=AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
    	localStorage: true,
        comparator: function(model){
            return model.get('timestamp');
        },
    	parse: function(response){
    		return response.items;
    	},
        getFeaturedEvent: function(){
            return this.find(function(model){
                return model.get('isToday') || model.get('isInFuture');
            });
        },
        getNextEvent: function(){
            return this.find(function(model){
                return model.get('isInFuture');
            });
        },
    	getFutureEvents: function(){
    		return new Event.EventCollection(
                this.filter(function(model){
        			return model.get('isInFuture') || model.get('isToday');
        		})
            );
    	}
    });

});