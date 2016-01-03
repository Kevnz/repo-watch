var express = require('express');
var router = express.Router();
var config = require('xtconf')();
/* GET users listing. */
router.get('/:user', function(req, res, next) {
    var cached = req.cache.get('user-' + req.params.user);
    if (cached) {
        res.send(cached);
    } else {
        var Github = require('node-github-api');
        var github = new Github({version: "3.0.0"});
        github.githubApi.authenticate({
            type: "basic",
            username: config.get('GithubUser'),
            password: config.get('GithubPassword')
        });
        console.log(github);
        github.getStars(req.params.user)
        .then(function(stars) {
            req.cache.set('user-' + req.params.user, stars);
          console.dir(stars.length);
          res.header('Content-Type', 'application/json');
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
