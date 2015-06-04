var fs = require('fs');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var marked = require('marked');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync(__dirname + '/layout.hbs', 'utf8'));

handlebars.registerHelper('marked', function(string) {
	if(!string) return '';
	var safeString = marked(string);
	return new handlebars.SafeString(safeString);
});
handlebars.registerHelper('niceDate',function(date) {
	if(!date) return '';
	//var niceDate = date.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
	var niceDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(date);
	console.log(niceDate);
	return niceDate;
});


function loadTemplate(name) {
	return fs.readFileSync(__dirname + '/views/' + name, 'utf8');
};

module.exports = {
	postsList: handlebars.compile(
		loadTemplate('postsList.hbs')
	),
	postPage: handlebars.compile(
		loadTemplate('postPage.hbs')
	)
};