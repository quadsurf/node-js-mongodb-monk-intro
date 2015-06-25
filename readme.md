# Configure and Read From Mongo with Monk

Install [Monk](https://github.com/Automattic/monk) with `npm install --save monk`.

To start the server, run `npm run start`.

## Objectives
* Create a Music Database
* Configure Monk Driver in the router
* Find a collection for the bands index route
* Accumulate documents into a string template

### Create Music Database

1. Spin up mongo with `mongod`
2. Create a `music` database with a `bands` collection
3. Insert two or three bands with a `name` and `onTour` field. Example band: `{name: 'Brand New', 'onTour': true}`

### Configure Monk Driver in the router

In the `router.js` file:

```
var db = require('monk')('localhost/music'); // Syncs up with mongo
var bands = db.get('bands'); // grabs a collection from the music database
```
### Find a collection for the index page

```
bands.find({}, function(err, docs) {
    console.log(docs)
})
```

### Accumulate documents into a string template

```
bands.find({}, function(err, docs) {
    var template = ''
    docs.forEach(function(band) {
      template += '<h2>' + band.name + '</h2>'
    })
    res.end(template)
})
```

## Stretch:

* Only show bands that are on tour
* Sort bands by name
* Limit the results to three
* Sort the bands on tour and limit the results to 3 (all of the above)
