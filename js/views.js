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

App.Views.Player = Backbone.View.extend({

	el: ".statshalf",

	events: {
		"click .playagain": "newgame"
	},

	template: _.template($("#tmp-playerview").html()),

	initialize: function () {
		this.listenTo(App.player, "change", this.gameEnded);
	},

	gameEnded: function () {
		this.render();
	},

	render: function () {
		this.$el.find(".playerview").html(this.template(this.model.attributes));
		return this;
	},

	newgame: function (e) {
		e.preventDefault();
		App.player.set("winner", false);
		App.gameFields.reset();
		App.Router.fillGame();
	}

});

App.Views.Score = Backbone.View.extend({

	el: ".scoreview",

	template: _.template($('#tmp-scoreview').html()),

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

});
