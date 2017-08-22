'use strict';

const epithet = require('epithet');
const loremIpsum = require('lorem-ipsum');

module.exports = {
    home: (request, reply) => {
        let context = {
            title: epithet.choose(' '),
            message: loremIpsum({
                count: 10,
                units: 'paragraphs',
                format: 'html'
            })
        };

        reply.view('home', context);
    },
    about: (request, reply) => {
        reply.view('about');
    },
    logout: (request, reply) => {
        reply.redirect('/');
    }
};
