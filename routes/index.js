'use strict';

const handlers = require('../handlers');

module.exports = [{
    method: 'GET',
    path: '/assets/{param*}',
    config: {
        auth: false
    },
    handler: {
        directory: {
            path: 'public',
            redirectToSlash: true,
            index: true
        }
    }
}, {
    method: 'GET',
    path: '/',
    handler: handlers.home
}, {
    method: 'GET',
    path: '/about',
    handler: handlers.about
}, {
    method: 'GET',
    path: '/logout',
    handler: handlers.logout
}];
