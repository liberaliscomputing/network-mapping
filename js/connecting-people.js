// get random handles
function getRandomNodes(nodes, max, min) {
	var randNodes = [];
	while (randNodes.length < 3) {
		var randNode = nodes[Math.floor(Math.random() * (max - min + 1)) + min];
		if(randNodes.indexOf(randNode) === -1) {
			randNode.data.img =
				imgUrlCheck(randNode.data.img.replace('normal', '400x400'));
			randNodes.push(randNode);
		}
	}
	return randNodes;
}

// calculate and store betweennees centrality
var bc = cy.elements().betweennessCentrality();
cy.nodes().forEach(function (node) {
	node.data().bwct = bc.betweenness(node);
});

// sort nodes in decreasing order of betweenness centrality
var revBwcts = cy.nodes().sort(function (a, b) {
	return b.data('bwct') - a.data('bwct');
});

// create an object storing people
var people = {};
var max = dataset.nodes.length - 1;
var min = max - Math.floor(max / 10);
people.random = getRandomNodes(dataset.nodes, max, 0);
people.recent = getRandomNodes(dataset.nodes, max, min);
people.bridge = [];

for (var i = 0; i < 3; i++) {
	var bwct = {};
	bwct.name = revBwcts[i].data('name');
	bwct.id = revBwcts[i].id();
	bwct.description = revBwcts[i].data('description');
	bwct.img = imgUrlCheck(revBwcts[i].data('img').replace('normal', '400x400'));
	bwct.bwct = revBwcts[i].data('bwct');
	people.bridge.push(bwct);
}

// build mustache template
var template =
	"<div class='row'>" +
	"{{#random}}" +
	"<div class='col-md-4 col-xs-12'>" +
	"<div class='card'>" +
	"<div class='card-lead'>" +
	"<h3>CHANCE ENCOUNTER</h3>" +
	"</div>" +
	"<h4>{{data.name}}</h4>" +
	"<h5 class='text-muted'>@{{data.id}}</h5>" +
	"<div class='card-img'>" +
	"<img src='{{data.img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='card-desc'>" +
	"<p>{{data.description}}</p>" +
	"</div>" +
	"<div class='card-view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{data.id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/random}}" +
	"</div>" +

	"<div class='row'>" +
	"{{#recent}}" +
	"<div class='col-md-4 col-xs-12'>" +
	"<div class='card'>" +
	"<div class='card-lead'>" +
	"<h3>RECENT REGISTRATION</h3>" +
	"</div>" +
	"<h4>{{data.name}}</h4>" +
	"<h5 class='text-muted'>@{{data.id}}</h5>" +
	"<div class='card-img'>" +
	"<img src='{{data.img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='card-desc'>" +
	"<p>{{data.description}}</p>" +
	"</div>" +
	"<div class='card-view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{data.id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/recent}}" +
	"</div>" +

	"<div class='row'>" +
	"{{#bridge}}" +
	"<div class='col-md-4 col-xs-12'>" +
	"<div class='card'>" +
	"<div class='card-lead'>" +
	"<h3>COMMUNITY BRIDGE</h3>" +
	"</div>" +
	"<h4>{{name}}</h4>" +
	"<h5 class='text-muted'>@{{id}}</h5>" +
	"<div class='card-img'>" +
	"<img src='{{img}}' class='img-responsive'>" +
	"</div>" +
	"<div class='card-desc'>" +
	"<p>{{description}}</p>" +
	"</div>" +
	"<div class='card-view'>" +
	"<a class='btn btn-info btn-sm' href='https://mobile.twitter.com/{{id}}' target='_blank'>View Profile</a>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"{{/bridge}}" +
	"</div>";

// translate template to html
var html = Mustache.to_html(template, people);
$('#people').html(html);

// make the height of card-desc equal
$(function () {
	$(".card-img").matchHeight();
	$(".card-desc").matchHeight();
});

// check 404 error of profile image
function imgUrlCheck(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status == 404) return './img/default.png';
	else return url;
}
