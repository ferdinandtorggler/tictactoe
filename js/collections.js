App.Collections.FieldList = Backbone.Collection.extend({

	model: App.Models.Field,

	selectWinner: function () {

		if (this.checkIfPlayerWins("x"))
			App.winner.set({winner: "x"});
		else if (this.checkIfPlayerWins("o"))
			App.winner.set({winner: "o"});
		else if (this.checkIfEnded())
			App.winner.set({winner: "nobody"});
	},

	checkIfEnded: function () {
		return $.inArray(false, this.pluck("status")) < 0;
	},

	checkIfPlayerWinsInStraightDirection: function (fieldsClickedByPlayer) {
		for (var i = 0; i < 3; i++) {
			if( fieldsClickedByPlayer.filter(function (model) {return (model.get("x") == i)}).length == 3 ||
					fieldsClickedByPlayer.filter(function (model) {return (model.get("y") == i)}).length == 3 ) {
				return true;
			}
		};
		return false;
	},

	checkIfPlayerWinsInMainDiagonalDirection: function (player) {
		return 	(this.where({x:0, y:0})[0].get("status") == player) &&
				(this.where({x:1, y:1})[0].get("status") == player) &&
				(this.where({x:2, y:2})[0].get("status") == player);
	},

	checkIfPlayerWinsInNextDiagonalDirection: function (player) {
		return 	(this.where({x:0, y:2})[0].get("status") == player) &&
				(this.where({x:1, y:1})[0].get("status") == player) &&
				(this.where({x:2, y:0})[0].get("status") == player);
	},

	getFieldsByPlayer: function (player) {
		return this.filter(function (model) {
			return (model.get("status") == player);
		});
	},

	checkIfPlayerWins: function (player) {
		return 	this.checkIfPlayerWinsInStraightDirection(this.getFieldsByPlayer(player)) ||
				this.checkIfPlayerWinsInMainDiagonalDirection(player) ||
				this.checkIfPlayerWinsInNextDiagonalDirection(player);
	}



});
