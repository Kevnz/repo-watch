var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET users listing. */
router.get('/:user', function(req, res, next) {
    var cached = req.cache.get('user-' + req.params.user);
    if (cached) {
        res.send(cached);
    } else {
        var Github = require('node-github-api');
        var github = new Github({version: "3.0.0"});

        console.log(github);
        github.getStars(req.params.user)
        .then(function(stars) {
            req.cache.set('user-' + req.params.user, stars);
          console.dir(stars.length);
          res.header('Content-Type', 'application/json');
          console.log('stars', stars)
          fs.writeFileSync('stars.json', JSON.stringify(stars, null, 2))
          res.send(stars);
        })
        .catch((err) => {
            console.log('boom');
            console.log(err);
            res.send(require('../dummy-data.json'));
        });
    }
});

module.exports = router;
