var GitHubApi = require("github");
var fs = require('fs'),
    path = require('path'),
    str = process.cwd(),
    reaper = require('./lib/reaper');
 

var http = require('http'),
    director = require('director');
    base = function (route) {
        var _this = this;
        fs.readFile(path.join(__dirname, '/views/index.html'), "binary", function(err, file) {
            if(err) {
                _this.res.writeHead(500, {"Content-Type": "text/plain"});
                _this.res.write(err + "\n");
                _this.res.end();
                return;
            }
            
            _this.res.writeHead(200);
            _this.res.write(file, "binary");
            _this.res.end();
        });
    },
 
<<<<<<< HEAD
	repos = function(username){
		console.log('Repo ' + username);
		var response = this.res,
			request = this.req;
 
 		var reap = new reaper();
 		reap.getWatchedRepositories(username, function(err, results){
            console.log(results)
    		response.write(JSON.stringify(results));
    		response.end();
 		});
=======
    repos = function(username){
        console.log('Repo ');

        var response = this.res,
            request = this.req;
 
        var reap = new reaper();
        try {
            reap.getWatchedRepositories(username, function(err, results) {
                response.write(JSON.stringify(results));
                response.end();
            });
        } catch (e) {
            response.write(JSON.stringify({error:e, message:'bugger'}));
            response.end();
        }

  
    },
    repoCompare = function(username, other_username){
        console.log('Repo ');
        var response = this.res,
            request = this.req;
 
        var reap = new reaper();
        reap.getWatchedRepositories(username, function(err, results) {
                reap.getWatchedRepositories(other_username, function(err, second_results){
                
                var full_results = [];
                full_results.push({user: username, repos: results});
                full_results.push({user: other_username, repos: second_results});
                response.write(JSON.stringify(full_results));
                response.end();
            });
        });
>>>>>>> 47fda85aff7bfba81da25b93e7b472a478d594ed
  
    },
    staticContent = function (folder, file) {
        console.log('static content');
        var _this = this;
        fs.readFile(path.join(__dirname, folder, file+'.'+folder), "binary", function(err, file) {
            if(err) {
                _this.res.writeHead(500, {"Content-Type": "text/plain"});
                _this.res.write(err + "\n");
                _this.res.end();
                return;
            }
            
            _this.res.writeHead(200);
            _this.res.write(file, "binary");
            _this.res.end();
        });
    };

var router = new director.http.Router({
    '/' : {get: base },
    '/repos/:username': {
        get: repos
    },
    '/repos/compare/:firstuser/:seconduser' : {
        get: repoCompare
    },
    '/static/:folder/:file': {
        get: staticContent
    }
});
 
var server = http.createServer(function (req, res) {
    router.dispatch(req, res, function (err) {
        if (err) {
            res.writeHead(404);
            res.end();
        }
    });
 });

 
  server.listen(process.env.PORT || 17231);
