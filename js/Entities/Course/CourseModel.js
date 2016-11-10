App.module('Entities.Course', function(Course){
  'use strict';
  
  var skillLevels = ['Everyone', 'Beginners', 'Intermediate', 'Advanced'];
  
  Course.CourseModel = Backbone.Model.extend({
    parse: function(response){
      console.log(response);
      if(response.photos){
        response.mainPhoto = response.photos[0];
        delete response.photos[0];
      }
      if(response.sessions){
        for(var i=0; i < response.sessions.length; i++){
          response.sessions[i].startDateNice = dateHelper.dateNice(new Date(response.sessions[i].start_date));
          response.sessions[i].startTimeNice = dateHelper.timeOfDay(new Date(response.sessions[i].start_date));
        }
      }
      if(response.startDates){
        for(var i=0; i < response.startDates.length; i++){
          response.startDates[i].startDateNice = dateHelper.dateNice(new Date(response.startDates[i].start_date));
          response.startDates[i].startTimeNice = dateHelper.timeOfDay(new Date(response.startDates[i].start_date));
        }
      }
      response.skillLevel = response.level ? skillLevels[response.level -1] : skillLevels[0];
      return response;
    }
  });
  
});