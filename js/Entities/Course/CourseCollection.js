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
          
          // Reject the objects that represent sessions
          response = _.reject(response, function(course){
            return course.event_type_id == 8 && !course.sessions;
          });
          
          var masterCourses = _.uniq(response, function(course){
              return course.title
          });

          _.each(masterCourses, function(masterCourse){
              masterCourse.startDates = _.filter(response, function(course){
                  return course.title === masterCourse.title;
              });
          });
      
          return masterCourses;
        }
    });
});
