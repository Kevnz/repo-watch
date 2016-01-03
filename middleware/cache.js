const cacheObj = {

};

module.exports = function (req, res, next) {
    req.cache = {};
    req.cache.set = function(key, value) {
        cacheObj[key] = value;
    };
    req.cache.get = function(key) {
        return cacheObj[key] === undefined ? null : cacheObj[key];
    }
    next();
};
