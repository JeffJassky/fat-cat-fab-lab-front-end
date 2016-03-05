App.module('Entities.Event', function(Event){
  'use strict';

  var msInDay = 1000 * 60 * 60 * 24;

  var dateHelper = {
    todaysDate: function(date){
      return this.stringify(new Date());
    },
    tomorrowsDate: function(date){
      return this.stringify(new Date(new Date().toString + msInDay));
    },
    yesterdaysDate: function(date){
      return this.stringify(new Date(new Date().toString - msInDay));
    },
    stringify: function(date){
      return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
    }
  }

  Event.EventModel = Backbone.Model.extend({
    initialize: function(data){
      if(data.start){
        this.date = new Date(this.get('start').dateTime);
        this.set({
          wasYesterday: this.wasYesterday(),
          isToday: this.isToday(),
          isTomorrow: this.isTomorrow(),
          isInFuture: this.isInFuture(),
          isInPast: this.isInPast()
        });
      }
    },
    wasYesterday: function(){
      return dateHelper.stringify(this.date) === dateHelper.yesterdaysDate();
    },
    isToday: function(){
      return dateHelper.stringify(this.date) === dateHelper.todaysDate();
    },
    isTomorrow: function(){
      return dateHelper.stringify(this.date) === dateHelper.tomorrowsDate();
    },
    isInFuture: function(){
      return this.date.getTime() > new Date().getTime();
    },
    isInPast: function(){
      return this.date.getTime() < new Date().getTime();
    }
  });
});