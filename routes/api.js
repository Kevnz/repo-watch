const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url')
const Octokit = require('@octokit/rest')
const parse = require('parse-link-header');
const { delay, doWhile, mapper } = require('@kev_nz/async-tools')
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

  const reaper = async (username, page = 1) => {

    const {  headers } = await getStars(username, page)

    const lastPage = getLastPageFromLink(headers.link)


    const pages = new Array(lastPage).fill(0).map((v, i) => i + 1)
    console.log('pages', pages)
    const stars = await mapper(pages, async (p) => {
      console.log('get page', p)
      const { data } = await getStars(username, p)
      console.log('got page')
      return data
    })

    return [].concat(...stars)
  }

  var cached = await req.cache.getAll(req.params.user);
   // console.log('other', cached)
  if (cached) {
    res.send(cached);
  } else {
    const stars = await reaper(req.params.user)
    req.cache.set('user-' + req.params.user, stars);
    res.header('Content-Type', 'application/json');
    res.send(stars);

  }
});

module.exports = router;
