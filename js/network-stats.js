//initialize a base graph
var cy = cytoscape({
	container: document.getElementById("stats"),
	elements: {
		nodes: dataset.nodes,
		edges: dataset.links
	}
});

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
var template = "<h4># of Connections</h4>" +
	"<div class='row' align='center'>{{#weights}}" +
	"<div class='col-md-4'>" +
	"<a href='https://twitter.com/{{id}}' target='_blank'>" +
	"<img src='{{img}}' data-toggle='tooltip' data-placement='right' title='{{weight}}'></a>" +
	"<p>{{id}}</p></div>" +
	"{{/weights}}</div>" +

	"<h4>PageRank</h4>" +
	"<div class='row' align='center'>{{#pgrks}}" +
	"<div class='col-md-4'>" +
	"<a href='https://twitter.com/{{id}}' target='_blank'>" +
	"<img src='{{img}}' data-toggle='tooltip' data-placement='right' title='{{pgrk}}'></a>" +
	"<p>{{id}}</p></div>" +
	"{{/pgrks}}</div>" +

	"<h4>Betweenness Centrality</h4>" +
	"<div class='row' align='center'>{{#bwcts}}" +
	"<div class='col-md-4'>" +
	"<a href='https://twitter.com/{{id}}' target='_blank'>" +
	"<img src='{{img}}' data-toggle='tooltip' data-placement='right' title='{{bwct}}' ></a>" +
	"<p>{{id}}</p></div>" +
	"{{/bwcts}}</div>";

//translate template to html
var html = Mustache.to_html(template, stats);
$("#stats").html(html);

//check 404 error of profile image
function imgUrlCheck(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status == 404) return 'https://abs.twimg.com/a/1470223016/img/t1/favicon.svg';
	else return url;
}
