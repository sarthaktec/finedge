const cache = {};

const set = (key, value, ttl = 60) => {
    cache[key] = {
        value,
        expires: Date.now() + ttl * 1000,
    };
};

const get = (key) => {
    const item = cache[key];

    if (!item) return null;

    if (Date.now() > item.expires) {
        delete cache[key];
        return null;
    }

    return item.value;
};

const del = (key) => {
    delete cache[key];
};

module.exports = {
    set,
    get,
    del,
};