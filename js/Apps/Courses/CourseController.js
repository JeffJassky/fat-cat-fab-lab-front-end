App.module('Courses', function(Courses){
    'use strict';

    Courses.Controller = {
        showAllCourses: function(){
            var courseCollectionView = new Courses.Views.CourseCollectionView({
                collection: App.courses
            });
            App.mainRegion.show(courseCollectionView);
        },
        showCourseDetails: function(id){
            var courseDetailView = new Courses.Views.CourseItemDetailView({
                model: App.courses.get(id)
            });
            App.mainRegion.show(courseDetailView);
        }
    };

});