
const OAuthStrategy = require('passport-oauth').OAuthStrategy;

/**
 * Evernote strategy
 * 
 * Options:
 *  - consumerKey
 *  - consumerSecret
 *  - callbackURL
 *  <optional>
 *  - passReqToCallback (default false) - directs passport to send the request object 
 *                                        to the verfication callback
 *  - useSandbox (default false)        - directs the strategy to use evernote's sandbox instead of production
 * 
 * Examples:
 * 
 
 */
class Strategy extends OAuthStrategy{
    constructor(options, verify) {
        options = options || {};
        options.userAuthorizationURL = options.useSandBox ? 'https://sandbox.evernote.com/OAuth.action' : 'https://www.evernote.com/OAuth.action';
        options.requestTokenURL = options.useSandBox ? 'https://sandbox.evernote.com/oauth' : 'https://www.evernote.com/oauth';
        options.accessTokenURL = options.useSandBox ? 'https://sandbox.evernote.com/oauth' : 'https://www.evernote.com/oauth';
        super(options, verify);
        this.name = 'evernote';
        this._passReqToCallback = options.passReqToCallback || false;
        //pass this to the obj for tests
        this.requestTokenURL = options.requestTokenURL;
        this.accessTokenURL = options.accessTokenURL;
        this.userAuthorizationURL = options.userAuthorizationURL;
    }

    /**
     * returns user profile for passport
     * @param {*} accessToken 
     * @param {*} done 
     */
    async userProfile(accessToken, tokenSecret, params, done) {
        var profile = { provider: 'evernote' };
        profile.userId = params.edam_userId;
        profile.shard = params.edam_shard;
        profile.expires = params.edam_expires;
        
        return done(null, profile);
    }
}

module.exports = Strategy;