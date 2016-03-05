$(function(){
	App.events = new App.Entities.Event.EventCollection();
	App.listenTo(App.events, 'sync', App.start);
	App.events.fetch();
});