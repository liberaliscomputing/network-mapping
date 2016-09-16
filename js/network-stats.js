//calculate each node's PageRank and betweennees centrality values
var pr = cy.elements().pageRank(0.85, 0.0001),
	bc = cy.elements().betweennessCentrality();

//add PageRank and betweennees centrality to node
cy.nodes().forEach(function(node) {
	node.data().pgrk = pr.rank(node);
	node.data().bwct = bc.betweenness(node);
	//console.log(node.id(), node.data().weight, pr.rank(node), bc.betweenness(node));
});

//get an array of reversed weights
var revWeights = cy.nodes().sort(function(a, b) {
	return b.data("weight") - a.data("weight");
});

//get an array of reversed PageRank values
var revPgrks = cy.nodes().sort(function(a, b) {
	return b.data("pgrk") - a.data("pgrk");
});

//get an array of reversed betweennees centrality values
var revBwcts = cy.nodes().sort(function(a, b) {
	return b.data("bwct") - a.data("bwct");
});

//create an object storing top rankers
var stats = {};
stats.weights = [];
stats.pgrks = [];
stats.bwcts = [];

for (var i = 0; i < 3; i++) {
	var weight = {},
		pgrk = {},
		bwct = {};

	weight.id = revWeights[i].id();
	weight.img = imgUrlCheck(revWeights[i].data("img"));
	weight.weight = revWeights[i].data("weight");
	stats.weights.push(weight);

	pgrk.id = revPgrks[i].id();
	pgrk.img = imgUrlCheck(revPgrks[i].data("img"));
	pgrk.pgrk = revPgrks[i].data("pgrk");
	stats.pgrks.push(pgrk);

	bwct.id = revBwcts[i].id();
	bwct.img = imgUrlCheck(revBwcts[i].data("img"));
	bwct.bwct = revBwcts[i].data("bwct");
	stats.bwcts.push(bwct);
}

//build mustache template
var template =
	"<div class='row'>" +
	"{{#weights}}" +
	"<div class='card-container' ontouchstart='this.classList.toggle('hover');'>" +
	"<div class='card'>" +
	"<div class='front'>" +
	"</div>" +
	"<div class='back'>" +
	"<div class='header'>" +
	"<h3>Name</h3>" +
	"</div>" +
	"<div class='image'>" +
	"<img src='{{img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='content'>" +
	"<h4>@{{id}}</h4>" +
	"<p>Description will be added</p>" +
	"</div>" +
	"<div class='view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/weights}}" +
	"</div>" +

	"<div class='row'>" +
	"{{#pgrks}}" +
	"<div class='card-container' ontouchstart='this.classList.toggle('hover');'>" +
	"<div class='card'>" +
	"<div class='front'>" +
	"</div>" +
	"<div class='back'>" +
	"<div class='header'>" +
	"<h3>Name</h3>" +
	"</div>" +
	"<div class='image'>" +
	"<img src='{{img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='content'>" +
	"<h4>@{{id}}</h4>" +
	"<p>Description will be added</p>" +
	"</div>" +
	"<div class='view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/pgrks}}" +
	"</div>" +

	"<div class='row'>" +
	"{{#bwcts}}" +
	"<div class='card-container' ontouchstart='this.classList.toggle('hover');'>" +
	"<div class='card'>" +
	"<div class='front'>" +
	"</div>" +
	"<div class='back'>" +
	"<div class='header'>" +
	"<h3>Name</h3>" +
	"</div>" +
	"<div class='image'>" +
	"<img src='{{img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='content'>" +
	"<h4>@{{id}}</h4>" +
	"<p>Description will be added</p>" +
	"</div>" +
	"<div class='view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/bwcts}}" +
	"</div>";

//translate template to html
var html = Mustache.to_html(template, stats);
$("#leaders").html(html);

//check 404 error of profile image
function imgUrlCheck(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status == 404) return 'https://abs.twimg.com/a/1470223016/img/t1/favicon.svg';
	else return url;
}
