var cy = cytoscape({
  container: document.getElementById('cy'),
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

cy.layout({
  name: 'cose'
});
