const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

module.exports = function (req, res, next) {
    req.cache = {};
    req.cache.set = function(key, value) {
        redis.set(key, JSON.stringify(value));
    };
    req.cache.get = async function(key) {
        const result = await redis.get(key)
        if (result) {
            return JSON.parse(result)
        }
        return null
    }
    next();
};
