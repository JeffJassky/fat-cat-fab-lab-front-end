App.module('Courses.Views', function(Views, App){
    'use strict';


    Views.CourseItemView = Backbone.Marionette.ItemView.extend({
        className: 'course',
		template: function(data){
			return Handlebars.compile(
                '<div class="course-image-wrapper">' +
                    '{{#if mainPhoto}}<img src="{{mainPhoto}}">{{/if}}' +
                '</div>' +
                '<div class="course-details">' +
                    '<span class="course-title">{{title}}</span>' +
                    '<span class="course-price">${{price}}</span>' +
                '</div>'
			)(data);
		},
      	events: {
          click: 'onClick'
        },
        onClick: function(){
          App.Courses.Controller.showCourseDetails(this.model.get('id'));
        }
    });

    Views.CourseItemDetailView = Backbone.Marionette.ItemView.extend({
        className: 'course-page',
		template: function(data){
			return Handlebars.compile(
                '<div class="course-image-wrapper">' +
                    '{{#if mainPhoto}}<img src="{{mainPhoto}}">{{/if}}' +
                '</div>' +
                '<div class="course-details" id={{hash}}>' +
                  '<h1 class="course-title">{{title}}</h1>' +
              		'<span class="course-price">${{price}}</span>' +
                  '<span class="course-description">{{{description}}}</span>' +
                  '{{#if skillLevel}}' +
                    '<span class="skill-level">Skill Level: {{{skillLevel}}}</span>' +
                  '{{/if}}' +
                  '{{#if max_participants}}' +
                    '<span class="max-participants">Maximum Students: {{{max_participants}}}</span>' +
                  '{{/if}}' +
                '</div>' +
              	'{{#if startDates}}' +
                  '<div class="course-details">' +
                    '<span class="label starting-dates-label">Select a Date</span>' +
              		'<span class="sqs-block-button"><a href="{{registration_url}}" class="sqs-block-button-element--small sqs-block-button-element add-to-cart-button">Register</a></span>' +
                    '<select>' +
                        '{{#each startDates}}' +
                            '<option value="{{@index}}">{{this.startDateNice}} at {{this.startTimeNice}}</option>' +
                        '{{/each}}' +
                    '</select>' +
                  '</div>' +
                  '{{#each startDates}}' +
                    '{{#if this.sessions}}' +
                        '<div class="course-sessions" data-course-index="{{@index}}">' +
                            '<span class="label starting-dates-label">{{../numberOfSessions}} Sessions in this course</span>' +
                            '{{#each this.sessions}}' +
                              '<div class="course-session">' +
                                  '{{this.number}}. {{this.startDateNice}} at {{this.startTimeNice}}' +
                              '</div>' +
                            '{{/each}}' + 
                        '</div>' +
                    '{{/if}}' +
                  '{{/each}}' +
              	'{{/if}}' +
              	'{{#if photos}}' +
                	'<div class="course-images">' +
                	    '{{#each photos}}<img src="{{this}}">{{/each}}' +
                	'</div>' +
              	'{{/if}}'
			)(data);
		},
        templateHelpers: function(){
          var sessions = this.model.get('sessions') || [];
          return {
            numberOfSessions: sessions.length ? sessions.length : 0
          };
        },
      	ui: {
          select: 'select',
          addToCartButton: '.add-to-cart-button',
          courseSessions: '.course-sessions'
        },
      	events: {
			'change @ui.select': 'onChangeSelect'        
        },
      	onRender: function(){
          this.ui.select.change();
          this.$el.find('p:last-child').remove();
        },
      	onChangeSelect: function(){
          var startDateIndex = this.ui.select.val();
          var selectedCourse = this.model.get('startDates')[startDateIndex];
          this.ui.courseSessions.hide();
          this.ui.courseSessions.filter('[data-course-index="'+startDateIndex+'"]').show();
          this.ui.addToCartButton.attr('href', selectedCourse.registration_url);
        }
    });

    Views.CourseCollectionView = Backbone.Marionette.CollectionView.extend({
    	className: 'courses',
    	childView: Views.CourseItemDetailView,
     	filter: function(model){
          return this.collection.getUniqueCourses().models.indexOf(model) !== -1;
        }
    });

});
