App.module('Entities.Event', function(Event){
  'use strict';

  var defaultEventMetadata = {
    page: false,
    price: false,
    image: false,
    public: true,
    className: 'arduino-tuesday'
  };

  var eventMetadata = [
    {
      searchString: 'arduino tuesday',
      page: '/arduino-tuesdays',
      image: '',
      public: true,
      className: 'arduino-tuesday'
    },
    {
      searchString: 'laser class',
      image: '',
      public: true,
      className: 'laser-class'
    },
    {
      searchString: 'cnc',
      image: '',
      public: true,
      className: 'cnc-class'
    },
    {
      searchString: 'wearable wednesday',
      image: '',
      public: true,
      className: 'wearable-wednesday'
    },
  ];

  Event.EventModel = Backbone.Model.extend({
    initialize: function(data){

    },
    parse: function(data){
      var descriptionLines = data.description.split('\n'),
        descriptionFormatted,
        descriptionWithLinks,
        meetupLink;

      if(descriptionLines.length){
        if(descriptionLines.length > 4){
          descriptionFormatted = descriptionLines[3];
        }
        meetupLink = descriptionLines[descriptionLines.length -1];
        descriptionWithLinks = descriptionFormatted.replace(/(\s)(http:\/\/[^\s]+)(\s)/g, '$1<a href="$2" target="_blank">$2</a>$3');
      }


      if(data.start){
        this.date = new Date(data.start.dateTime);
      }

      if(data.end){
        this.endDate = new Date(data.end.dateTime);
      }
      $.extend(data, {
        wasYesterday: this.wasYesterday(),
        isToday: this.isToday(),
        isTomorrow: this.isTomorrow(),
        isInFuture: this.isInFuture(),
        isInPast: this.isInPast(),
        dateLabel: this.getDateLabel(),
        metadata: this.getMetadata(data),
        timestamp: this.getTimestamp(),
        meetupLink: meetupLink,
        descriptionFormatted: descriptionFormatted,
        descriptionWithLinks: descriptionWithLinks,
        startTime: this.getStartTime(),
        endTime: this.getEndTime(),
        maxPrice: this.getPriceArray(descriptionFormatted)
      });
      return data;
    },
    getDateLabel: function(){
      if(this.wasYesterday()){
        return 'yesterday';
      }else if(this.isToday()){
        return 'today';
      }else if(this.isTomorrow()){
        return 'tomorrow';
      }else{
        return this.getFormattedDate();
      }
    },
    getFormattedDate: function(){
      return dateHelper.dateFormatted(this.date);
    },
    getTimestamp: function(){
      return this.date.getTime();
    },
    getStartTime(){
      return dateHelper.timeOfDay(this.date);
    },
    getEndTime: function(){
      return dateHelper.timeOfDay(this.endDate);
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
    },
    getMetadata: function(data){
      if(data.summary){
        var metadata = _.find(eventMetadata, function(metadata){
          return data.summary.toLowerCase().indexOf(metadata.searchString.toLowerCase()) !== -1
        });
      }
      return metadata ? metadata : defaultEventMetadata;
    },
    getPriceArray: function(str){
      var regex = /\$/gi, result, indicies = [];
      var maxPrice = 0;
      while ( (result = regex.exec(str)) ) {
          indicies.push(result.index);
      }

      for(var i=0; i<indicies.length; i++){
        var dollarSignIndex = indicies[i];
        var stringStartingWithDollarSign = str.substring(dollarSignIndex);
        var split = stringStartingWithDollarSign.split(' ');
        var priceAbsolute = split[0].substring(1);
        maxPrice = maxPrice > priceAbsolute ? maxPrice : priceAbsolute;
      }
      console.log(maxPrice);
      return maxPrice;
    }
  });
  
});