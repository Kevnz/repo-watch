var GitHubApi = require("github");
var fs = require('fs'),
	path = require('path'),
	str = process.cwd(),
	reaper = require('./lib/reaper');
 

var http = require('http'),
	director = require('director');
	base = function (route) {
		var _this = this;
		console.log(arguments);
		//this.res.writeHead(200, { 'Content-Type': 'text/plain' });
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
  
	};

var router = new director.http.Router({
	'/' : {get: base }, 
	'/repos/:username': {
		get: repos 
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

 
  server.listen(17231);