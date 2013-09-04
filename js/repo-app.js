YUI.add('repos-app', function (Y) {

    Y.ReposApp = Y.Base.create('reposApp', Y.App, [], {
        views: {
            repolist: {
                type: Y.RepoListView,
                preserve: false
            },
            loading: {
                type:Y.LoadingView,
                preserve: false
            }
        },
        initializer : function () {

            //this.route('/:username', this.showEntry);
        },
        handleHome: function (req, res, next) {

        },
        showRepos: function (req, res, next) {
            var self = this;
            Y.log('in the show showEntry');
            self.showView('loading');
            var list = new Y.data.RepoList({username: 'Kevnz'});
            list.load(function () {
 
                self.showView('repolist', {  modelList: list, template: '#repolist-template' });
            });
            
        },
    }, {
        ATTRS: {
            routes: {
                value: [
                    {path: '/', callbacks: 'handleHome'},
                    {path: '/stars/:username', callbacks: 'showRepos' }
                ]
            }
        }
    });
}, '0.0.0', { requires:['app', 'repo-list-view','loading-view']});