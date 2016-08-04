//initialize a base graph
var cy = cytoscape({
	container: document.getElementById('vis')
});

//add nodes to graph
dataset.nodes.forEach(function(node) {
	cy.add(node);
});

//add links to graph
dataset.links.forEach(function(link) {
	cy.add(link);
});

//set layout
cy.layout({ name: 'concentric' });

//set node style
cy.style()
	.selector('node')
	.style({
		'width': 20,
		'height': 20,
		'label': 'data(id)',
		'font-size': 10,
		'background-fit': 'contain'
	})
	.update();

//set node image
cy.nodes().forEach(function(node) {
	node.style('background-image', imgUrlCheck(node.data('img')));
});

//set edge style
cy.style()
	.selector('edge')
	.style({
		'width': '1px',
		'curve-style': 'unbundled-bezier'
	})
	.update();

//open a clicked node's Twitter profile in a new window tab
var setEvents = cy
//Open a clicked handle's Twitter profile
	.on('click', 'node', function() {
		var url = 'https://twitter.com/';
		window.open(url + this.id(),'_blank');
	});

//check 404 error of profile image
function imgUrlCheck(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status == 404) return 'https://abs.twimg.com/a/1470223016/img/t1/favicon.svg';
	else return url;
}
