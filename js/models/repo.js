YUI.add('repo-model', function (Y) {
    Y.namespace('data').Repo =  Y.Base.create('repoModel', Y.Model, [Y.ModelSync.REST], {
        //url: '/repos/{username}',
        idAttribute : 'name',
        initializer: function () {

        }
    }, {
        ATTRS: {
            url: {
                value: ''
            },
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
