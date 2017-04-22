import * as passport from 'passport';
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

export function initializeGoogleOauth() {
    const tokenUri = 'https://accounts.google.com/o/oauth2/token';
    const callback = 'http://localhost:3000/oauth2/google/callback';
    const authorizationUrl = 'https://accounts.google.com/o/oauth2/auth';
    const clientId = '735837263150-h0cfk34p0spqbp6gtfhqpf0er16qkahl.apps.googleusercontent.com';
    const clientSecret = '3vLLnl2gMlg5SMcfUmFTyjHm';

    passport.use('google-custom', new OAuth2Strategy({
        authorizationURL: authorizationUrl,
        tokenURL: tokenUri,
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: callback
    }, function (accessToken: any, refreshToken: any, profile: any, done: any) {
        console.log('got call back from google accesstoken = ' + accessToken);
        done(null, {
            accessToken,
            profile
        });
    }));

    passport.serializeUser(function (user, done) {
        // placeholder for custom user serialization
        // null is for errors
        console.log('in serialize user ', user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('in deserialize user ', user);
        // placeholder for custom user deserialization.
        // maybe you are going to get the user from mongo by id?
        // null is for errors
        done(null, user);
    });
}
