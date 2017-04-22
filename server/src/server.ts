import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import swagger = require('swagger-express-mw');

import * as passport from 'passport';
import * as session from 'express-session';

import { initializeGoogleOauth } from './security/google.oauth2';
import securityHandlers from './api/helpers/securityHandlers';

const port = process.env.PORT || 3000;
const server = express();
const env = process.env.ENV || 'dev';
const swaggerConfig = {
    appRoot: __dirname,
    swaggerSecurityHandlers: securityHandlers
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '.', 'swagger-ui')));
server.use(passport.initialize());
server.use(passport.session());
initializeGoogleOauth();

swagger.create(swaggerConfig, (err, swaggerExpress) => {
    if (err) throw err;
    swaggerExpress.register(server);
    server.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '.', 'swagger-ui/index.html'));
    });
    server.get('/auth/google', passport.authenticate('google-custom', {scope: 'profile https://www.googleapis.com/auth/calendar'}));
    server.get('/oauth2/google/callback', passport.authenticate('google-custom', {
        successRedirect: '/',
        failureRedirect: '/failed'
    }));
    server.listen(port, '0.0.0.0', (err: Error) => {
        if (err) throw err;
        console.info('==> listening on port %s, open up http://0.0.0.0:%s in your browser', port, port);
    });
});

export default server;