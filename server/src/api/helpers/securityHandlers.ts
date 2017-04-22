import * as passport from 'passport';

import { NextFunction, Request, Response } from 'express';

import { SwaggerToolsSecurityHandler } from "@types/swagger-node-runner";

const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

export interface IOauthDef {
    type: string; // Oauth type 
    authorizationUrl: string;
    flow: string; // implicit or explicit flow
    scopes: Object;

}
export default {
    api_key: function checkApiKeySecurity(req: Request, res: Response, next: NextFunction) {
        console.log('Im in here dude api-key');
        next();
    },
    oauth_google: function facebookOauth(req: Request, def: IOauthDef, scopes: any, cb: any) {
        // const baseUri = 'https://www.googleapis.com';
        passport.authenticate('google-custom', (err:Error, user:any, info:any) => {
            console.log('user = ', user);
            console.log('err = ', err);
            console.log('info = ', info);
            return cb({
                authcode: 'test'
            });
        })(req, null, cb);
    }
}