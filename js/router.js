App.Router = new (Backbone.Router.extend({

	routes: {
		"": "index"
	},

	index: function () {

		App.winner = new App.Models.Winner();
		var gameFields = new App.Collections.FieldList();

		new App.Views.Winner({model: App.winner});
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
	},

	currentPlayer: "x",

	togglePlayer: function () {
		if (this.currentPlayer == "x")
			this.currentPlayer = "o";
		else
			this.currentPlayer = "x";
	}

}));
