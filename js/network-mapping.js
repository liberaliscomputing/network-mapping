var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'cose'
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
