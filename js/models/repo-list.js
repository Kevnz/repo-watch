YUI.add('repo-list', function (Y) {
    Y.namespace('data').RepoList =  Y.Base.create('repoModelList', Y.ModelList, [Y.ModelSync.REST], {
        url: '/repos/{username}',
        model : Y.data.Repo,
        initializer: function () {

        },
        getLanuages : function () {
            var repos = this.toArray();
            Y.log(repos);
            var allLangs =  Y.map(repos, function(repo) { 
                Y.log(repo);
                return repo.get('language');
            }),
            reducedLangs = Y.reduce(allLangs, [] ,function(langs, lang) { 
                if(lang && langs.indexOf(lang) === -1) {
                    langs.push({ name: lang }); 
                }
                return langs;
            });
            return reducedLangs;
        }
    }, {
        ATTRS: {
            username: {
                value:''
            }
        }
    });
}, '0.0.1', {requires:['repo-model', 'gallery-funcprog', 'model-sync-rest']});
