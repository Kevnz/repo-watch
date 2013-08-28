YUI.add('repos-app', function (Y) {

    Y.ReposApp = Y.Base.create('reposApp', Y.App, [], {
        views: {
            repolist: {
                type: Y.RepoListView,
                preserve: false
            }
        },
        initializer : function () { 
            Y.message('the init of the login sub app');

            this.route('/entry', this.showEntry);
        },
        showRepos: function (req, res, next) {
            Y.log('in the show showEntry');
            Y.log(this.currentUser);
            this.showView('entry', { template: '#repolist-template', currentUser: this.currentUser });
        },
    }, { 
    });
}, '0.0.0', { requires:['app', 'entry-view']});