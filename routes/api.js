var express = require('express');
var router = express.Router();
const fs = require('fs');
const url = require('url')
const Octokit = require('@octokit/rest')

var github = new Octokit();
const getPageFromLink = function (metaLinks) {
  if (!metaLinks) return 0;
  var parsed = metaLinks.split(',');
  var next = parsed[0].split(';');
  //var last = parsed[1].split(';');
  var cleanedNextLink = next[0].replace('<', '').replace('>', '');
  var pLink = url.parse(cleanedNextLink, true);
  return pLink.query.page;
};

const getStars = async (username, page = 1) => github.activity.listReposStarredByUser({ username, page, per_page: 100 })

const reaper = async (username) => {
  const stars = []
  const {data, status, headers } = await getStars(username)
  stars.push(...data)
  const page = getPageFromLink(headers.link)
  if (page > 0) {
    const p2 = await getStars(username, page)
  }
}

const doWhile = async (action, condition) => {
	const actionResult = await action();

	if (condition(actionResult)) {
		return doWhile(action, condition)
	}
}

const doWhile = async (action, condition) => {
	const actionResult = await action();

	if (condition(actionResult)) {
		return doWhile(action, condition)
	}
}


router.get('/:user', async function (req, res, next) {
  var cached = req.cache.get('userz-' + req.params.user);
  if (cached) {
    res.send(cached);
  } else {

    console.log('req.params.user', req.params)

    const stars = []

    await doWhile()
    getStars(req.params.user)

      .then(function ({ data, status, headers, ...others }) {

        console.info('status', status)
        console.info('headers', headers)
        console.info('others', others)
        stars.push(...data)
        const page = getPageFromLink(headers.link)
        console.info('page', page)
        if (page > 0) {
          const
        }
        req.cache.set('user-' + req.params.user, data);
        console.dir(data.length);
        res.header('Content-Type', 'application/json');

        fs.writeFileSync('stars.json', JSON.stringify(data, null, 2))
        res.send(data);
      })
      .catch((err) => {
        console.log('boom');
        console.log(err);
        res.send(require('../dummy-data.json'));
      });
  }
});

module.exports = router;
