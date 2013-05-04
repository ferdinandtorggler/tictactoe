var App = {
	Models: {},
	Views: {},
	Collections: {},

	start: function () {

		App.player = new App.Models.Player();
		App.gameFields = new App.Collections.FieldList();

		new App.Views.Player({model: App.player});
		new App.Views.Score({model: App.player});
		new App.Views.Game({collection: App.gameFields});

		App.player.set("current", "x");

		this.fillGame();
		// Backbone.history.start();
	},

	fillGame: function () {
		for (var x = 0; x < 3; x++)
			for (var y = 0; y < 3; y++)
				App.gameFields.add(new App.Models.Field({x: x, y: y}));
	}
};

$(function () {
	App.start();
});