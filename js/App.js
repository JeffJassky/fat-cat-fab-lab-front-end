'use strict';
var App = new Backbone.Marionette.Application({
    config: {

    },
    pushState:true,
    events: null,
    regions: {
        body: 'div#body'
    },
    onBeforeStart: function(){
        Backbone.LocalStorage.setVersion(this.todaysDate());
    },
    todaysDate: function(){
        var date = new Date();
        return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    }
});