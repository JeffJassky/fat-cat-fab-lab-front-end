App.module('Entities.Course', function(Course){
  'use strict';
  
  var skillLevels = ['Everyone', 'Beginners', 'Intermediate', 'Advanced'];
  
  Course.CourseModel = Backbone.Model.extend({
    parse: function(response){
      if(response.photos){
        response.mainPhoto = response.photos[0];
        delete response.photos[0];
      }
      if(response.startDates){

        // FILTER OUT ALL UNUSED KEYS FOR START DATES
        response.startDates = _.map(response.startDates, function(startDate){
          return {
            start_date: startDate.start_date.replace(/\s/, 'T'),
            end_date: startDate.end_date.replace(/\s/, 'T'),
            registration_url: startDate.registration_url,
            sessions: startDate.sessions
          };
        });

        // FORMAT START DATE STRINGS TO BE PRETTIER
        response.startDates = _.each(response.startDates, function(startDate){
          startDate.startDateNice = dateHelper.dateNice(new Date(startDate.start_date));
          startDate.startTimeNice = dateHelper.timeOfDay(new Date(startDate.start_date));
          if(startDate.sessions){
            // FORMAT SESSION DATE STRINGS TO BE PRETTIER
            startDate.sessions = _.each(startDate.sessions, function(session, index){
              session.number = index + 1;
              session.startDateNice = dateHelper.dateNice(new Date(session.start_date));
              session.startTimeNice = dateHelper.timeOfDay(new Date(session.start_date));
            });
          }
        });
      }
      response.skillLevel = response.level ? skillLevels[response.level -1] : skillLevels[0];
      return response;
    }
  });
  
});
