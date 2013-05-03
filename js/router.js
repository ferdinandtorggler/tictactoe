App.Router = new (Backbone.Router.extend({

	routes: {
		"": "index"
	},

	index: function () {

		App.player = new App.Models.Player();
		var gameFields = new App.Collections.FieldList();

		new App.Views.Player({model: App.player});
		new App.Views.Game({collection: gameFields});

		this.fillGame(gameFields);

	},

	start: function () {
		Backbone.history.start();
	},

	fillGame: function (gameFields) {
		for (var x = 0; x < 3; x++)
			for (var y = 0; y < 3; y++)
				gameFields.add(new App.Models.Field({x: x, y: y}));
	}

}));
