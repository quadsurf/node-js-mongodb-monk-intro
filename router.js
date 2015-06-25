var routes = require('routes')(),
    fs = require('fs')
    // Configure Monk Driver in the router

routes.addRoute('/bands', (req, res, url) => {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    // Find a collection for the index page
    // Accumulate documents into a string template
  }
})

module.exports = routes
