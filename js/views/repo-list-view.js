YUI.add('repo-list-view', function (Y) {
 
    //this has a dependency on nvd3 but it is current global
    Y.RepoListView = Y.Base.create('repoListView', Y.View, [], {
        events: {
            '.lang-button': {
                click: 'filterLanguages'
            },
            'th a' : {
                click: 'listSort'
            }
        },
        initializer: function(options){
            if(options) {

            }
            var list = this.get('modelList');
            list.after(['add', 'remove', 'reset'], this.render, this);
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

        listSort: function (e){
            e.preventDefault();
            Y.log(e);
            var sort = e.currentTarget.getData('attr'); 
            Y.log(sort);
            this.get('modelList').comparator = function (model) {
                return model.get(sort);
            };
            this.get('modelList').sort({descending: this._sort.descending});
        },
        filterLanguages: function (e){
            Y.log('filter clicked');
            e.preventDefault();
            var lang = e.currentTarget.getData('lang');
            this.isFiltered = true;
            this.currentFilter = lang;
            this.render();
        },
        currentFilter: null,
        isFiltered: false,
        initializer: function () {
            var list = this.get('modelList');
            list.after(['add', 'remove', 'reset'], this.render, this);
        },
        render: function () {
            var modelList = this.get('modelList');
            var languages = modelList.getLanuages();
            var repos = modelList.toJSON(); 
            Y.log(this.isFiltered);
            if (this.isFiltered) {
                var langFilter = this.currentFilter;
                repos = modelList.filter(function (item){
                    return item.get('language') === langFilter;
                });

            }
            var container = this.get('container'),
                templateNode = Y.one(this.template),
                source = templateNode.getHTML(),
                compiledTemplate = Y.Handlebars.compile(source),
                data = { items: modelList.toJSON(), langs: languages },
                html = compiledTemplate(data);
            container.setHTML(html);
            Y.log(languages);
            if (!container.inDoc()) {
                Y.one('body').append(container);
            }
            this.fire('render');
            return this;
        },
        _sort : {attr: '', descending: false }  

    });
}, '0.0.1', { requires:['view']});