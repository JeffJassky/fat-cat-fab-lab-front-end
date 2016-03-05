App.module('Events.Views', function(Views){
    'use strict';


    Views.EventItemView = Backbone.Marionette.ItemView.extend({
		template: function(data){
			return Handlebars.compile(
			    '<span class="date">{{date}}</span>' +
			    '<span class="price">{{price}}</span>' +
			    '<span class="summary">{{summary}}</span>' +
			    '<span class="description">{{description}}</span>'
			)(data);
		}
    });

    Views.EventCollectionView = Backbone.Marionette.CollectionView.extend({
    	childView: Views.EventItemView
    });

});