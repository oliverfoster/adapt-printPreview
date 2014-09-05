/*
* adapt-printPreview
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var printPreview = new (Backbone.View.extend({
		model : new Backbone.Model({
			window: undefined,
			document: undefined,
			title: "Print Preview - ",
			loading: "Loading..."
		}),
		setFocus: function() {
			this.model.get("window").focus();
		}
	}))();

	Adapt.on("printPreview:open", function(settings) {
			var nwindow =  window.open("assets/printPreview.html", printPreview.model.get("loading"));
			printPreview.model.set("window", nwindow);

			var loaded = false;

			//READY EVENT FOR NEW WINDOW
			$(nwindow).bind("load", function() {
				if (!loaded) preRender();
				loaded = true;
			});

			var impatience = setTimeout(function() {
				if (!loaded) preRender();
				loaded = true;
			}, 500); // document should have loaded after a second

			function preRender() {
				clearTimeout(impatience);
				var ndoc = nwindow.document;
				printPreview.model.set("document", ndoc);
				printPreview.$el = $("#printContainer", ndoc);

				if (settings !== undefined && typeof settings.preRender === "function") settings.preRender.call(printPreview, settings)
				Adapt.trigger("printPreview:preRender", settings);

				$("html", ndoc).addClass( $("html", window.document).attr("class") );

				if (settings !== undefined && settings._rendered === undefined) {
					if (typeof settings.render === "function") settings.render.call(printPreview, settings)
					Adapt.trigger("printPreview:render", settings);
				} 

				$("title", ndoc).html( printPreview.model.get("title") + settings.title );

				if (settings !== undefined && typeof settings.postRender === "function") settings.postRender.call(printPreview, settings)
				Adapt.trigger("printPreview:postRender", settings);
				if (settings !== undefined) $("#printPreviewInstructions", ndoc).html(settings.instructions);
			}
			
		})
	
	Adapt.once("app:dataReady", function() {
		var config = Adapt.course.get("_printPreview");
		if (config !== undefined) {
			printPreview.model.set("title", config.title);
			printPreview.model.set("loading", config.loading);
		}
	})

	Adapt.printPreview = printPreview;

})