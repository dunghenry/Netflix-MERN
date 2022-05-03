const auth = require('./auth');
const lists = require('./lists');
const movies = require('./movies');
const users = require('./users');

const routes = [
    auth,
    lists,
    movies,
    users
]

module.exports = routes;