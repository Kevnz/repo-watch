'use strict';
var path = require('path'),
	querystring = require('querystring'),
	url = require('url'),
	util = require('util'),
	events = require('events'),
	GitHubApi = require("github"),
	github = new GitHubApi({
		version: "3.0.0"
	});

var Reaper = function(request, response, user){
	console.log('let us new up this bad boy');
 	events.EventEmitter.call(this);
	var _request = request,
		_response = response,
		_user = user,
		_currentPage = 1,
		_results = [],
		_completed = false;



	var begin = function(){
		console.log('begin begin');
		github.repos.getWatchedFromUser({
		    user: _user,
		    page: _currentPage,
		    per_page: 100
		}, process);
	}; 
	this.begin = begin;

	var _this = this;
	var getPageFromLink = function(metaLinks){
		if(!metaLinks) return 0;
		var parsed = metaLinks.split(',');
		var next = parsed[0].split(';');
		//var last = parsed[1].split(';');
		var cleanedNextLink = next[0].replace('<','').replace('>', '');
		var pLink = url.parse(cleanedNextLink, true);

		return pLink.query.page
	}
	var process = function(err, res){
		console.log('begin process');


		var parsedPage = getPageFromLink(res.meta.link);
		if(_currentPage > parsedPage){
			_completed = true;
		} else{
			_currentPage = parsedPage; 
		}
		
		for (var i = 0; i < res.length; i++) {
			//console.log(res[i].name);html_url
			_results.push({ 
				name: res[i].name, 
				description: res[i].description , 
				language: res[i].language,
				url: res[i].html_url, 
				owner: res[i].owner.login
			});
		};

		_this.emit('parsedPage');
	};
 	var decide = function(){
 		console.log('decision');
 		if(_completed) {
 			finish();
 		}else{
 			begin();
 		}
	};
 	var finish = function(){
 		console.log('it is done');
 		console.log(_response);
 		//_response.writeHead(200, {"Content-Type": "text/plain"});
    	_response.write(JSON.stringify( _results) + "\n");
    	_response.end();
 	};

 	this.on('parsedPage', decide );

};

 util.inherits(Reaper, events.EventEmitter);
 module.exports = Reaper;
