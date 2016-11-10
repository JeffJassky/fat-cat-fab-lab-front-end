App.module('Events', function(Events){
    'use strict';

    Events.Controller = {
        showFeaturedEvent: function(){
            var eventItemView = new Events.Views.EventItemView({
                model: App.events.getFeaturedEvent()
            });
            App.eventRegion.show(eventItemView);
        },
        showFutureEvents: function(){
            var eventCollectionView = new Events.Views.EventCollectionView({
                collection: App.events.getFutureEvents()
            });
            App.eventRegion.show(eventCollectionView);
        }
    };

});