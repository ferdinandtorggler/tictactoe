App.Models.Field = Backbone.Model.extend({

	defaults: {
		status: false,	// can be "", "x", "o"
		x: 0,			// horizontal position in interval [0,2]
		y: 0			// vertical position in interval [0,2]
	},

	// Sets the status of the current field to x or o
	setStatus: function () {
		if (this.get("status") == false && App.player.get("winner") == false) {
			this.set({status: App.player.get("current")});
			App.player.togglePlayer();
		}
	}

});


App.Models.Player = Backbone.Model.extend({

	defaults: {
		current: "x",
		winner: false
	},

	togglePlayer: function () {
		console.log(this.get("current"));
		if (this.get("current") == "x")
			this.set("current", "o");
		else
			this.set("current", "x");
	}

});