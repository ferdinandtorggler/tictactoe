App.Views.Field = Backbone.View.extend({

	tagName: "div",
	className: "fieldview",

	events: {
		"click": "setFieldStatus"
	},

	template: _.template($('#tmp-fieldview').html()),

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	setFieldStatus: function () {
		this.model.setStatus();
	}

});

App.Views.Game = Backbone.View.extend({

	el: '.gameview',

	initialize: function () {
		this.listenTo(this.collection, "add", this.render)
	},

	events: {
		"click": "move"
	},

	render: function () {
		this.$el.empty();
		this.collection.each(this.addOne, this);
	},

	// Creates a view for the given model and appends it to the gameview
	addOne: function (mod) {
		var fieldView = new App.Views.Field({model: mod});
		fieldView.render();
		this.$el.append(fieldView.el);
	},

	move: function () {
		this.collection.selectWinner();
	}

});

App.Views.Winner = Backbone.View.extend({

	el: ".winnerview",

	template: _.template($("#tmp-winnerview").html()),

	initialize: function () {
		this.listenTo(App.winner, "change", this.gameEnded);
	},

	gameEnded: function () {
		this.render();
		$(".playagain").removeClass("hidden").addClass("shown");
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

});
