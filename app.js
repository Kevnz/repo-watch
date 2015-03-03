var GitHubApi = require("github");
var fs = require('fs'),
    path = require('path'),
    str = process.cwd(),
    reaper = require('./lib/reaper');
 

var http = require('http'),
    director = require('director');
var base = function (route) {
        console.log('base route');
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
    };
var repos = function(username){
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

  
    };
    var userRepos = function(username){
        console.log('Repos the user has ');

        var response = this.res,
            request = this.req;
 
        var reap = new reaper();
        try {
            reap.getUserRepositories(username, function(err, results) {
                response.write(JSON.stringify(results));
                response.end();
            });
        } catch (e) {
            response.write(JSON.stringify({error:e, message:'bugger'}));
            response.end();
        }

  
    };
var repoCompare = function(username, other_username){
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
 
  
    };

var staticContent = function (folder, file) {
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
var jsContent = function (folder, file) {
        console.log('static content');
        folder = '/js/' + (folder || '');
        console.log(folder);
        var _this = this;
        fs.readFile(path.join(__dirname, folder, file || ''), "binary", function(err, file) {
            if(err) {
                _this.res.writeHead(500, {"Content-Type": "text/plain"});
                _this.res.write(err + "\n");
                _this.res.end();
                return;
            } 
            _this.res.writeHead(200, {"Content-Type": "application/javascript"});
            _this.res.write(file, "binary");
            _this.res.end();
        });
    };
var routes = {
    '/' : {
        get: base
    },
    '/stars/:username' : {
        get: base
    },
    '/repos/:username': {
        get: repos
    },
    '/user/repos/:username': {
        get: userRepos
    },
    '/repos/compare/:firstuser/:seconduser' : {
        get: repoCompare
    },
    '/static/:folder/:file': {
        get: staticContent
    },
    '/js/:file.js': {
        get: jsContent
    },
    '/js/:folder/:file.js': {
        get: jsContent
    }
};
function helloWorld() {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' });
    this.res.end('hello world');
  }

var router = new director.http.Router(routes);
 
var server = http.createServer(function (req, res) {
    console.log('test');
    router.dispatch(req, res, function (err) {
        if (err) {
            res.writeHead(404);
            res.end();
        }
    });
 });
server.on('request', function() {console.log('is this thing on?');});
console.log('preparing to start');
server.listen(process.env.PORT || 4545);
