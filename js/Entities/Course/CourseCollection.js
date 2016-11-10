App.module('Entities.Course', function(Course){
    'use strict';

    Course.CourseCollection = Backbone.Collection.extend({
    	model: Course.CourseModel,
    	url: 'https://civicrm.fatcatfablab.org/json/events',
    	localStorage: true,
        comparator: function(model){
            return model.get('id');
        },
      	getUniqueCourses: function(){
          return this;
        },
        parse: function(response){
          App.courseResponse = response;
          
          response = _.reject(response, function(course){
            return course.event_type_id == 8 && !course.sessions;
          });
          
          var uniqueCourses = _.uniq(response, function(course){
              return course.title
          });

          _.each(uniqueCourses, function(uniqueCourse){
              uniqueCourse.startDates = _(response.filter(function(course) {
                  return course.title === uniqueCourse.title;
				  
              })).pluck("start_date");
          });
          
		  _.each(uniqueCourses, function(uniqueCourse){
              uniqueCourse.registrationURLs = _(response.filter(function(course) {
                  return course.title === uniqueCourse.title;
				  
              })).pluck("registration_url");
          });
		  
          
		  
          
          return uniqueCourses;
        }
    });
});
