var routes = require('routes')(),
    fs = require('fs'),
    db = require('monk')('localhost/music'), // can't contain char
    bands = db.get('bands'), // a reference to the database collection
    qs = require('qs')

routes.addRoute('/bands', (req, res, url) => {
  console.log(req.url)
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    if (req.method === 'GET') {
      console.log(req.method)
      var template = ''
      bands.find({}, function (err, docs) {
        console.log('MONGOOOOOOOOSE')
        docs.forEach(function(doc) {
          console.log('Weeeee')
          template += '<h2><a href="/bands/' + doc._id + ' "> ' + doc.name + '</a></h2>'
        })
        res.end(template)
      })
    }
  }
  if (req.method === 'POST') {
    var data = ''

    req.on('data', function(chunk) {
      console.log('Whoa! Async')
      data += chunk
    })

    req.on('end', function() {
      var band = qs.parse(data)
      console.log('Thanks for the data!')
      bands.insert(band, function(err, doc) {
        if (err) res.end('oops')
        console.log('MONGOOOOOOOOSE')
        console.log('Here we go!')
        res.writeHead(302, {'Location': '/bands'})
        res.end()
      })
    })
  }
})

routes.addRoute('/bands/new', (req, res, url) => {
  console.log(req.url)
  res.setHeader('Content-Type', 'text/html')
  fs.readFile('templates/bands/new.html', function(err, file) {
    if (err) res.end('boop')
    res.end(file.toString())
  })
})

routes.addRoute('/bands/:id', (req, res, url) => {
  console.log(req.url)
  if (req.method === 'GET') {
    console.log(req.method)
    bands.findOne({ _id: url.params.id }, function(err, doc) {
      console.log('MONGOOOOOOOOSE')
      if (err) console.log('fucked up')
      res.end(doc.name.toString())
    })
  }
})

module.exports = routes
