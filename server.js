'use strict';

const Hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const routes = require('./routes');
const config = require('rc')('app');

// Determine working environment
const env = process.env.NODE_ENV || 'development';

// Establish server
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    }
});

// Set port
server.connection({
    port: config[env].port
});

// Register middleware
server.register([{
    register: vision
}, {
    register: inert
}], err => {

    if (err) {
        throw err;
    } else {
        // set view config in plugin register callback
        server.views({
            engines: {
                html: handlebars
            },
            path: 'views',
            layoutPath: 'views/layout',
            layout: 'default',
            partialsPath: 'views/partials',
            helpersPath: 'views/helpers'
        });
    }
});

// Load routes
server.route(routes);

// Start server
server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});

// Necessary for integration testing
module.exports = server;
