const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

module.exports = function (req, res, next) {
    req.cache = {};
    req.cache.set = function(key, value) {
        redis.set(key, value);
    };
    req.cache.get = async function(key) {
        return redis.get(key)
    }
    next();
};
