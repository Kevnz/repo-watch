YUI.add('repo-list-view', function (Y) {
 
    //this has a dependency on nvd3 but it is current global
    Y.RepoListView = Y.Base.create('repoListView', Y.CollectionView, [], {
        events: {
            '.lang-button': {
                click : 'languageClick'
            },
            'th' : {
                click: 'listSort'
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

        listSort: function (){
            var sort = e.currentTarget.get('data-attr'); 
            this.get('modelList').comparator = function (model) {
                return model.get(sort);
            };
            this.get('modelList').sort({descending: this._sort.descending});
        },
        onRender: function () {
            var self = this;
        },
        _sort : {attr: '', descending: false }  

    });
}, '0.0.1', { requires:['collection-view']});