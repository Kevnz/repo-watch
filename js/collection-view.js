YUI.add('collection-view', function (Y, NAME) {

var CollectionView = function () {
    CollectionView.superclass.constructor.apply(this, arguments);
};

Y.extend(CollectionView, Y.View, {
    events : {
        '.lang-button': {
            click: 'filter'
        }
    },
    filter: function (e){
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
            }).toJSON();

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
    }
});
Y.CollectionView = CollectionView;

}, '@VERSION@');
