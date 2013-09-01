YUI.add('repo', function (Y) {
    Y.namespace('data').Repo =  Y.Base.create('repoModel', Y.Model, [Y.ModelSync.REST], {
        //url: '/repos/{name}',
        //idAttribute : 'name',
        initializer: function () {

        }
    }, {
        ATTRS: { 
            name : {
                value: ''
            },
            description : {
                value: ''
            },
            language : {
                value: ''
            },
            owner : {
                value: ''
            }
        }
    });
}, '0.0.1', {requires:['model', 'model-sync-rest']});
