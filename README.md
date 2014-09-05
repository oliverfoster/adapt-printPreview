adapt-printPreview
================

Print preview extension

Config:
```
// To go in the course.json file
"_printPreview": {
    "title": "Print Preview - ",
    "loading": "Loading..."
}
```

Public Interface:
```
Adapt.printPreview
Adapt.printPreview.$el
Adapt.printPreview.model
```

Model:
```
{
	"window": undefined, //current print preview window
	"document": undefined, //current print preview document
	"title": "Print Preview - ", //from json
	"loading": "Loading..." //from json
}
```

Usage:
```
Adapt.trigger("printPreview:open", {
	"instructions": "This is the print preview",
	"title:" "Sub title",
	_rendered: "testing",
	preRender: function(settings) {

		//this is a reference to the Adapt.printPreview object
		//this.$el is a reference to the output container

	},
	render: function(settings) {
		
		//will not call if settings._rendered is !== undefined

		//this is a reference to the Adapt.printPreview object
		//this.$el is a reference to the output container
		

	},
	postRender: function(settings) {
		
		//this is a reference to the Adapt.printPreview object
		//this.$el is a reference to the output container

		this.$el.html("").append(settings._rendered);

	}
});
```