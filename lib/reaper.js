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
	if (process.env.GithubUser && process.env.GithubPassword) {
		github.authenticate({
	            type: "basic",
	            username: process.env.GithubUser,
	            password: process.env.GithubPassword
	        });
	}
var Reaper = function(watching) {
	events.EventEmitter.call(this);
	var _user,
		_currentPage = 1,
		_results = [],
		_completed = false,
		_callback;



	var getWatchedRepositories = function(username, callback){
		if (username){
			_user = username;
		}
		if(callback){
			_callback = callback;
		}
		github.repos.getWatchedFromUser({
			user: _user,
			page: _currentPage,
			per_page: 100
		}, process);
	};
	var getUserRepositories = function(username, callback){
		if(username){
			_user = username;
		}
		if(callback){
			_callback = callback;
		}
		github.repos.getFromUser({
			user: _user,
			page: _currentPage,
			per_page: 100
		}, process);
	};
	this.getWatchedRepositories = getWatchedRepositories;
	this.getUserRepositories = getUserRepositories;

	var _this = this;
	var getPageFromLink = function(metaLinks){
		if(!metaLinks) return 0;
		var parsed = metaLinks.split(',');
		var next = parsed[0].split(';');
		//var last = parsed[1].split(';');
		var cleanedNextLink = next[0].replace('<','').replace('>', '');
		var pLink = url.parse(cleanedNextLink, true);
		return pLink.query.page;
	};
	var process = function(err, res){
		console.log(err);
		var parsedPage = getPageFromLink(res.meta.link);
		if(_currentPage > parsedPage){
			_completed = true;
		} else{
			_currentPage = parsedPage;
		}
		
		for (var i = 0; i < res.length; i++) {
			_results.push({
				name: res[i].name,
				description: res[i].description,
				language: res[i].language,
				url: res[i].html_url,
				owner: res[i].owner.login,
				owner_url: res[i].owner.url
			});
		}
		_this.emit('parsedPage');
	};

	var decide = function() {
		if (_completed) {
			finish();
		} else {
			if (watching) {
				getWatchedRepositories();
			} else {
				getUserRepositories();
			}
		}
	};
	var finish = function(){
		//TODO: Will need to manage error conditions
		_callback(false, _results);
	};

	this.on('parsedPage', decide );

};

 util.inherits(Reaper, events.EventEmitter);
 module.exports = Reaper;
