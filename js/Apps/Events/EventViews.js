App.module('Events.Views', function(Views){
    'use strict';


    Views.EventItemView = Backbone.Marionette.ItemView.extend({
    	className: function(){
    		var className = 'event';
    		if(this.model.get('metadata').className){
				className += ' ' + this.model.get('metadata').className;
    		}
    		return className;
    	},
		template: function(data){
			return Handlebars.compile(
                '<div class="datetime">' +
					'<span class="date">{{dateLabel}}</span>' +
			    	'<span class="time">{{startTime}} - {{endTime}}</span>' +
                    '{{#if maxPrice}}' +
                      '<span class="price fee">' +
                      	'${{maxPrice}}' +
                      '</span>' +
                    '{{else}}' +
                      '{{#if metadata.price}}' +
                        '<span class="price free">' +
                        	'{{metadata.price}}' +
                        '</span>' +
                      '{{/if}}' +
                    '{{/if}}' +
				'</div>' +

              
			    '<span class="summary">' +
                    '{{#if metadata.page}}' +
              			'<a href="{{metadata.page}}">{{summary}}</a>' +
              		'{{else}}' +
              			'<a href="{{meetupLink}}">{{summary}}</a>' +
              		'{{/if}}' +
                '</span>' +
			    '<span class="description">' +
                    '{{descriptionFormatted}}' +
                '</span>'
			)(data);
		}
    });

    Views.EventCollectionView = Backbone.Marionette.CollectionView.extend({
    	className: 'events',
    	childView: Views.EventItemView
    });

});