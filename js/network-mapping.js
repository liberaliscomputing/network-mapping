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
        label: 'data(id)'
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
