YUI.add('repo-list', function (Y) {
    Y.namespace('data').RepoList =  Y.Base.create('repoModelList', Y.ModelList, [Y.ModelSync.REST], {
        url: '/repos/{username}',
        model : Y.data.Repo,
        initializer: function () {

        }
    }, {
        ATTRS: {
            username: {
                value:'kevnz'
            }
        }
    });
}, '0.0.1', {requires:['repo-model', 'model-sync-rest']});
