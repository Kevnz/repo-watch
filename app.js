var GitHubApi = require("github");
var fs = require('fs'),
	path = require('path'),
	querystring = require('querystring'),
	url = require('url'),
	util = require('util'),
	events = require('events');
	var str = process.cwd();
	console.log(str);
var	reaper = require(path.join(str, '/lib/reaper'));

var github = new GitHubApi({
    version: "3.0.0"
});
 /** section: github
     *  repos#getWatchedFromUser(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - user (String): Required. 
     *  - page (Number): Optional. Page number of the results to fetch. Validation rule: ` ^[0-9]+$ `.
     *  - per_page (Number): Optional. A custom page size up to 100. Default is 30. Validation rule: ` ^[0-9]+$ `.
     **/
    //this.getWatchedFromUser = function(msg, block, callback) {
    /*
github.repos.getWatchedFromUser({
    user: "kevnz",
    page:0,
    per_page: 500
}, function(err, res) {
	var util = require('util');
	var formed = [];
	//console.log(util.inspect( res, true, null));
	console.log(res.length);

	for (var i = 0; i < res.length; i++) {
		console.log(res[i].name);
		formed.push({name: res[i].name, description: res[i].description , language: res[i].language });
	};
   // console.log(JSON.stringify(res));
    fs.writeFile('reposbeingwatched.json', JSON.stringify(formed), function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
});
*/

var http = require('http'),
	director = require('director');
	hello = function (route) {
		var _this = this;
		console.log(arguments);
		//this.res.writeHead(200, { 'Content-Type': 'text/plain' });
		fs.readFile(path.join(process.cwd(),'/views/index.html'), "binary", function(err, file) {
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
	register = function(route){
		this.res.sendFile('/views/register.html');
	},
	newRegistration = function(route){
		//this.res.params
	},
	repos = function(username){
		console.log('Repo ');
		var response = this.res,
			request = this.req;
 
 		var reap = new reaper(request, response,  username);
 		reap.begin();
 		/*
		github.repos.getWatchedFromUser({
		    user: username,
		    page:6,
		    per_page: 100
		}, function(err, res) {

			var formed = [];
			console.log(util.inspect( res, true, null));
			var metaLinks = res.meta.link;
			var parsed = metaLinks.split(',');
			var next = parsed[0].split(';');
			var last = parsed[1].split(';');
			var cleanedNextLink = next[0].replace('<','').replace('>', '');
			var pLink = url.parse(cleanedNextLink, true);
			console.log(pLink.query.page);  

			for (var i = 0; i < res.length; i++) {
				//console.log(res[i].name);
				formed.push({name: res[i].name, description: res[i].description , language: res[i].language, owner: res[i].owner.login });
			};
			//now is the time to bring in event emitter and do the recursive thing.
			//TODO READ

			    response.writeHead(200, {"Content-Type": "text/plain"});
    			response.write(JSON.stringify(formed) + "\n");
    			response.end();
			/*
		   // console.log(JSON.stringify(res));
		    fs.writeFile('reposbeingwatched.json', JSON.stringify(formed), function (err) {
				if (err) throw err;
				console.log('It\'s saved!');
			});

		});*/
	};

var router = new director.http.Router({
	'/' : {get: hello },
	'/test' : {get: hello},
	'/register': {
		get: register,
		post: newRegistration
	},
	'/repos/:username': {
		get: repos 
	}
});

  //
  // setup a server and when there is a request, dispatch the
  // route that was requestd in the request object.
  //
  var server = http.createServer(function (req, res) {
    router.dispatch(req, res, function (err) {
      if (err) {
        res.writeHead(404);
        res.end();
      }
    });
  });

  //
  // You can also do ad-hoc routing, similar to `journey` or `express`.
  // This can be done with a string or a regexp.
  //
  //router.get('/bonjour', helloWorld);
  //router.get(/hola/, helloWorld);

  //
  // set the server to listen on port `8080`.
  //
  server.listen(8080);