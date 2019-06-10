const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url')
const Octokit = require('@octokit/rest')
const parse = require('parse-link-header');
const github = new Octokit({
  auth: process.env.GITHUB_API
});
const getNextPageFromLink = function (metaLinks) {
  if (!metaLinks) return 0;

  var parsed = parse(metaLinks);
  if (!parsed.next) return ;
  return parseInt(parsed.next.page, 10)
};
const getLastPageFromLink = function (metaLinks) {
  if (!metaLinks) return 0;

  var parsed = parse(metaLinks);
  if (!parsed.last) return 0;
  return parseInt(parsed.last.page || 100, 10);
};
const getStars = async (username, page = 1) => github.activity.listReposStarredByUser({ username, page, per_page: 100 })

const checkPageLink = () => {

}


router.get('/:user', async function (req, res, next) {
  const stars = []
  const reaper = async (username, page = 1) => {
    console.info('reaper')
    const {data, status, headers } = await getStars(username, page)

    const lastPage = getLastPageFromLink(headers.link)
    await req.cache.add(username, page, data)
    stars.push(...data)

    const pager = getNextPageFromLink(headers.link)

    if (pager <= lastPage) {
      try {
        return reaper(username, pager)
      } catch (err) {
        console.error(err)
        return
      }
    }
    return
  }
  console.log('cache get all')
  var cached = await req.cache.getAll(req.params.user);

  if (cached) {
    res.send(cached);
  } else {
    await reaper(req.params.user)
    // req.cache.set('user-' + req.params.user, stars);
    res.header('Content-Type', 'application/json');
    res.send(stars);

  }
});

module.exports = router;
