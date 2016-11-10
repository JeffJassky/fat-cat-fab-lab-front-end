App.module('Routes', function(Routes, App){
    'use strict';

    Routes.onStart = function() {
        console.log('Initializing Routes');
        App.Router = new Routes.Router();
        Backbone.history.start({pushState: true});
      
      
    };

	Routes.Router = Backbone.Router.extend({
      	initialize: function(){
          var re = new RegExp("(\/)+$", "g");
          this.route(/(.*)\/+$/, "trailFix", function (id) {
              // remove all trailing slashes if more than one
              id = id.replace(re, '');
              this.navigate(id, true);
          });
    	},
		routes: {
			"home": "home",
			"home/:trail": "home",
			"events": "events",
			"events/:trail": "events",
			"workshops": "workshops",
			"workshops/:trail": "workshops",
		},
		home: function(){
	    	App.Events.Controller.showFeaturedEvent();
		},
		events: function(){
	    	App.Events.Controller.showFutureEvents();
		},
		workshops: function(){
	    	App.Courses.Controller.showAllCourses();
		}
	});
});
