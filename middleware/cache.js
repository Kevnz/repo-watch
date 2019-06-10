const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const parse = (str) => {
  const values = str.split(':')
  return JSON.parse(values[1])
}
module.exports = function (req, res, next) {
  req.cache = {};
  req.cache.add = function (user, page, stars) {
    return redis.hset(
      `stars:${user}`,
      page,
      JSON.stringify(stars)
    )
  }
  req.cache.set = function (key, value) {
    redis.set(key, JSON.stringify(value));
  };
  req.cache.getAll = async function (key) {
    const entries = await redis.hgetall(`stars:${key}`)

    if (entries.length > 0) {
      return parse(entries)
    }

    return null
  }
  req.cache.get = async function (key) {

    const result = await redis.get(key)
    if (result) {
      return JSON.parse(result)
    }
    return null
  }
  next();
};
