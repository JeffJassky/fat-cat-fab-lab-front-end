'use strict';
var App = new Backbone.Marionette.Application({
    config: {

    },
    pushState:true,
    events: null,
    regions: {
        mainRegion: 'main#page',
        eventRegion: 'main#events'
    },
    onBeforeStart: function(){
        Backbone.LocalStorage.setVersion(this.todaysDate());
    },
    todaysDate: function(){
        var date = new Date();
        return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    }
});