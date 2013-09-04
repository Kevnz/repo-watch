YUI.add('loading-view', function (Y, NAME) {

var LoadingView = function () {
    LoadingView.superclass.constructor.apply(this, arguments);
};

Y.extend(LoadingView, Y.View, {
    initializer: function () {
        Y.log('loading view');
    },
    render: function () {
        Y.log('loading view render');
        var container = this.get('container'); 
        container.setHTML('<div class="loading"> &nbsp; </div>');

        if (!container.inDoc()) {
            Y.one('body').append(container);
        }
        this.fire('render');
        Y.log('loading view render end');
        return this;
    }
});
Y.LoadingView = LoadingView;

}, '@VERSION@');
