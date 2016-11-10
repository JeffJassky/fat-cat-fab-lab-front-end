  var msInDay = 1000 * 60 * 60 * 24;
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

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
    },
    dateFormatted: function(date){
      return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    },
    dateNice: function(date){
      return days[date.getDay()] + ' ' +months[date.getMonth()] + ' ' + date.getDate();
    },
    timeOfDay: function(date){
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var meridian = hours <= 11 ? 'am' : 'pm';
      hours = hours ? hours : 12;
      if(meridian === 'pm'){
        hours = hours - 12;
      }
      if(minutes < 10){
        minutes = '0' + minutes ;
      }
      return hours + ':' + minutes + meridian;
    }
  };


var scriptPath = document.domain === 'www.fatcatfablab.org' ? 'https://civicrm.fatcatfablab.org/webapp/' : '';
var scripts = [
		"bower_components/handlebars/handlebars.js",
		"bower_components/underscore/underscore.js",
		"bower_components/backbone/backbone.js",
		"bower_components/backbone-localstorage/backbone-localstorage.js",
		"bower_components/marionette/lib/backbone.marionette.js",
		"js/App.js",
		"js/Router.js",
  
		"js/Entities/Event/EventModel.js",
		"js/Entities/Event/EventCollection.js",
		"js/Apps/Events/EventController.js",
		"js/Apps/Events/EventViews.js",
  
		"js/Entities/Course/CourseModel.js",
		"js/Entities/Course/CourseCollection.js",
		"js/Apps/Courses/CourseController.js",
		"js/Apps/Courses/CourseViews.js"
	];

function loadScriptAtIndex(i){
	$.getScript(scriptPath + scripts[i]).done(function(){
		if(scripts[i + 1]){
			loadScriptAtIndex(i+1);
		}else{
			initializeApplication();
		}
	}).fail(function(){
		alert('Failed to dynamically load Javascript', arguments);
	});
}
loadScriptAtIndex(0);

function initializeApplication(){
	App.events = new App.Entities.Event.EventCollection();
	App.courses = new App.Entities.Course.CourseCollection();
  	App.courses.fetch();
    App.events.fetch();
  	App.start();
}