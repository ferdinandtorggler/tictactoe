App.Models.Field = Backbone.Model.extend({

	defaults: {
		status: false,	// can be "", "x", "o"
		x: 0,			// horizontal position in interval [0,2]
		y: 0			// vertical position in interval [0,2]
	},

	// Sets the status of the current field to x or o
	setStatus: function () {
		if (this.get("status") == false && App.winner.get("winner") == false) {
			this.set({status: App.Router.currentPlayer});
			App.Router.togglePlayer();
		}
	}

});


App.Models.Winner = Backbone.Model.extend({

	defaults: {
		winner: false
	}

});