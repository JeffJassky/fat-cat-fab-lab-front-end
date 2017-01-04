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
            start_date: startDate.start_date_timestamp,
            end_date: startDate.end_date_timestamp,
            registration_url: startDate.registration_url,
            sessions: startDate.sessions
          };
        });

        // FORMAT START DATE STRINGS TO BE PRETTIER
        response.startDates = _.each(response.startDates, function(startDate){
          
           var start_time = new Date();
           start_time.setTime(startDate.start_date * 1000);
          
           var nyc = 5*60*60000;
           var user = start_time.getTimezoneOffset()*60000;
           var renderedDate = new Date(start_time.getTime() + user - nyc);
          startDate.startDateNice = dateHelper.dateNice(renderedDate);
          startDate.startTimeNice = dateHelper.timeOfDay(renderedDate);
          if(startDate.sessions){
            // FORMAT SESSION DATE STRINGS TO BE PRETTIER
            startDate.sessions = _.each(startDate.sessions, function(session, index){
              session.number = index + 1;
              session.startDateNice = dateHelper.dateNice(new Date(session.start_date * 1000));
              session.startTimeNice = dateHelper.timeOfDay(new Date(session.start_date *1000));
            });
          }
        });
      }
      response.skillLevel = response.level ? skillLevels[response.level -1] : skillLevels[0];
      return response;
    }
  });
  
});
