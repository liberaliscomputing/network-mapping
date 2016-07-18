//initialize a graph
var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'concentric'
  },
  elements: network,
  style: [
    {
      selector: 'node',
      style: {
				'width': '50px',
				'height': '50px',
				'label': 'data(id)',
				'background-image': 'data(profileImageUrlHttps)',
				'background-fit':'contain'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'unbundled-bezier'
      }
    }
  ]
});

//open a clicked node's Twitter profile in a new window tab
cy.on('click', 'node', function(){
	var url = 'https://twitter.com/';
	window.open(url + this.id(),'_blank');
});
