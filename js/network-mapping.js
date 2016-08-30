//initialize a base graph

var defStylesheet = cytoscape.stylesheet()
	.selector('node')
		.style({
			'width': 20,
			'height': 20,
			'label': 'data(id)',
			'font-size': 10,
			'background-fit': 'contain',
			'background-image': 'https://abs.twimg.com/a/1470223016/img/t1/favicon.svg'
		})
	.selector('node[img]')
		.style({
			'background-image': 'data(img)'
		})
	.selector('edge')
		.style({
			'width': '1px',
			'curve-style': 'unbundled-bezier'
		})
;

var altStylesheet = cytoscape.stylesheet()
	.selector('node')
		.style({
			'width': 20,
			'height': 20,
			'label': 'data(id)',
			'font-size': 10,
			'background-fit': 'contain',
			'background-color': '#666',
			'border-width': 2,
			'border-opacity': 1,
			'border-color': '#666',
			'text-opacity': 0,
			'text-valign': 'center',
			'text-halign': 'right',
			'text-background-color': '#666',
			'text-background-opacity': 1,
			'text-background-shape': 'roundrectangle',
			'text-border-opacity': 1,
			'text-border-color': '#666',
			'text-border-width': 3,
			'color': '#fff'
		})
	.selector('node[img]')
		.style({
			'background-image': 'data(img)'
		})
	.selector('node.hover')
		.style({
			'text-opacity': 1
		})
	.selector('edge')
		.style({
			'line-color': '#666',
			'width': 10,
			'opacity': 0.25,
			'curve-style': 'haystack',
			'haystack-radius': 0
		})
;

var cy = cytoscape({
	container: document.getElementById('vis'),
	elements: {
		nodes: dataset.nodes,
		edges: dataset.links
	},
	style: defStylesheet,
	layout: { name: 'concentric' }
});

//open a clicked node's Twitter profile in a new window tab
var setEvents = cy
//Open a clicked handle's Twitter profile
	.on('click', 'node', function() {
		var url = 'https://twitter.com/';
		window.open(url + this.id(),'_blank');
	})
	.on('mouseover', 'node', function(){
		this.addClass('hover');
	})
	.on('mouseout', 'node', function(){
		this.removeClass('hover');
	})
;
