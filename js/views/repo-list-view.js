YUI.add('repo-list-view', function (Y) {
 
    //this has a dependency on nvd3 but it is current global
    Y.RepoListView = Y.Base.create('repoListView', Y.CollectionView, [], {
        events: {
            '.lang-button': {
                click : 'languageClick'
            }
        },
        initializer: function(options){
            if(options) {

            }

            this.publish('repoSelected', {
                broadcast: true,
                bubbles: true,
                emitFacade: true
            });
            this.publish('languageSelected', {
                broadcast: true,
                bubbles: true,
                emitFacade: true
            });
 
        },
        languageClick: function (e) {
            e.preventDefault();
        },
        onRender: function () {
            var self = this;
        }

    });
}, '0.0.1', { requires:['collection-view']});