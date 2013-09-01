YUI.add('repos-app', function (Y) {

    Y.ReposApp = Y.Base.create('reposApp', Y.App, [], {
        views: {
            repolist: {
                type: Y.RepoListView,
                preserve: false
            }
        },
        initializer : function () {
            this.route('/:username', this.showEntry);
        },
        showRepos: function (req, res, next) {
            Y.log('in the show showEntry');
            Y.log(this.currentUser);
            this.showView('repo', { template: '#repolist-template' });
        },
    }, { 
    });
}, '0.0.0', { requires:['app', 'repo-view']});