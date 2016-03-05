App.module('Events', function(Events){
    'use strict';

    Events.Controller = {
        showNextEvent: function(){
        	var eventItemView = new Events.Views.EventItemView({
        		model: App.events.getNextEvent()
        	});
        	App.body.show(eventItemView);
        },
        showAllEvents: function(){
            var eventCollectionView = new Events.Views.EventCollectionView({
                collection: App.events
            });
            App.body.show(eventCollectionView);
        }
    };

});