'use strict';

module.exports = [{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply.view('home', {});
    }
}, {
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
}];
