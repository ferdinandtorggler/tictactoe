App.Router = new (Backbone.Router.extend({

	routes: {
		"": "index",
		"newgame": "newgame"
	},

	index: function () {

		App.player = new App.Models.Player();
		App.gameFields = new App.Collections.FieldList();

		new App.Views.Player({model: App.player});
		new App.Views.Score({model: App.player});
		new App.Views.Game({collection: App.gameFields});

		App.player.set("current", "x");

		this.fillGame();

	},

	start: function () {
		Backbone.history.start();
	},

	fillGame: function () {
		for (var x = 0; x < 3; x++)
			for (var y = 0; y < 3; y++)
				App.gameFields.add(new App.Models.Field({x: x, y: y}));
	},

	newgame: function () {
		console.log("new game triggered");
		App.player.set("winner", false);
		App.gameFields.reset();
		this.fillGame();
		this.navigate("");
	}

}));
