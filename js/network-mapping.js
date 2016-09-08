// initialize a base graph
/**
 * define default style
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
 */

var altStylesheet = cytoscape.stylesheet()
	.selector('node')
		.style({
			'width': 20,
			'height': 20,
			'label': 'data(id)',
			'font-size': 10,
			'background-fit': 'contain',
			'background-color': '#666',
			'border-width': 1,
			'border-opacity': 1,
			'border-color': '#666',
			'text-opacity': 0,
			'text-valign': 'top',
			'text-halign': 'right',
			'text-background-color': '#666',
			'text-background-opacity': 1,
			'text-background-shape': 'roundrectangle',
			'text-border-opacity': 1,
			'text-border-color': '#666',
			'text-border-width': 3,
			'color': '#fff',
			'overlay-color': '#666'
		})
	.selector('node[img]')
		.style({
			'background-image': 'data(img)'
		})
	.selector('node.hover')
		.style({
			'width': 40,
			'height': 40,
			'border-width': 2,
			'border-color': '#fff',
			'text-opacity': 1,
			'font-size': 20,
			'z-index': 1
		})
	.selector('node.highlight')
		.style({
			'border-color': '#fff',
			'border-width': 2
		})
	.selector('node.transparent')
		.style({
			'opacity': 0.2
		})
	.selector('edge')
		.style({
			'line-color': '#666',
			'width': 3,
			'opacity': 0.5,
			'curve-style': 'unbundled-bezier',
			'overlay-color': '#666',
			'z-index': 0
		})
	.selector('edge.highlight')
		.style({
			'line-color': '#fff',
			'opacity': 0.75
		})
	.selector('edge.transparent')
		.style({
			'opacity': 0.25
		})
;

var cy = cytoscape({
	container: document.getElementById('vis'),
	elements: {
		nodes: dataset.nodes,
		edges: dataset.links
	},
	style: altStylesheet,
	layout: {
		name: 'concentric',
		animate: true,
		animationDuration: 2000
	}
});

//open a clicked node's Twitter profile in a new window tab
var setEvents = cy
//Open a clicked handle's Twitter profile
	.on('click', 'node', function(){
		cy.animate({
			zoom: 1.0,
			center: {
				eles: this
			}
		}, {
			duration: 1000
		});
	})
	.on('doubleTap', 'node', function(){
		var url = 'https://mobile.twitter.com/';
		window.open(url + this.id(),'_blank');
	})
	.on('mouseover', 'node', function(e){
		this.addClass('hover');
		var sel = e.cyTarget;
		cy.elements().difference(sel.outgoers()).not(sel).addClass('transparent');
		sel.addClass('highlight').outgoers().addClass('highlight');
	})
	.on('mouseout', 'node', function(e){
		this.removeClass('hover');
		var sel = e.cyTarget;
		cy.elements().removeClass('transparent');
		sel.removeClass('highlight').outgoers().removeClass('highlight');
	})
;

// add a custom doubleTab event
var tappedBefore;
var tappedTimeout;
cy.on('tap', function(event) {
	var tappedNow = event.cyTarget;
	if (tappedTimeout && tappedBefore) {
		clearTimeout(tappedTimeout);
	}
	if(tappedBefore === tappedNow) {
		tappedNow.trigger('doubleTap');
		tappedBefore = null;
	} else {
		tappedTimeout = setTimeout(function(){ tappedBefore = null; }, 300);
		tappedBefore = tappedNow;
	}
});

// set layout change events
$('#concentric').on('mousedown', function(){
	cy.layout({
		name: 'concentric',
		animate: true,
		animationDuration: 2000
	});
});

$('#cose-bilkent').on('mousedown', function(){
	cy.layout({
		name: 'cose-bilkent',
		tile: false,
		animate: true,
		animationDuration: 2000
	});
});

$('#circle').on('mousedown', function(){
	cy.layout({
		name: 'circle',
		animate: true,
		animationDuration: 2000
	});
});

$('#grid').on('mousedown', function(){
	cy.layout({
		name: 'grid',
		animate: true,
		animationDuration: 2000
	});
});
