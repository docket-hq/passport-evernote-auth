[![CircleCI](https://circleci.com/gh/jnbarlow/passport-evernote-auth.svg?style=shield)](https://circleci.com/gh/jnbarlow/passport-evernote-auth)

# passport-evernote-auth
Passport strategy for Evernote that includes request object passthrough.

## Installation
```bash
npm install passport-evernote-auth
```

## Usage
Aside from the standard required fields, this module allows to optionally have passport include the express request object into the verification function (through the first variable), as well as a flag to indicate if you need to use the evernote sandbox

**Parameters:**
- **consumerKey** - Evernote consumer key 
- **consumerSecret** - Evernote consumer secret
- **callbackURL** - oauth callback url

**Optional Parameters:**
- **passReqToCallback** (default false) - directs passport to send the request object to the verfication callback
- **useSandbox** (default false)        - directs the strategy to use evernote's sandbox instead of production 

## Examples

**With request**
```javascript
const strategy = new EvernoteStrategy(
    {
        consumerKey: '<consumerKey>',
        consumerSecret: '<consumerSecret>',
        callbackURL: '<callbackURL>',
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        
        done(null, <user.id>);
    }
);
```

**With Sandbox**
```javascript
const strategy = new EvernoteStrategy(
    {
        consumerKey: '<consumerKey>',
        consumerSecret: '<consumerSecret>',
        callbackURL: '<callbackURL>',
        passReqToCallback: true,
        useSandbox: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        
        done(null, <user.id>);
    }
);
```

**Without request**
```javascript
const strategy = new EvernoteStrategy(
    {
        consumerKey: '<consumerKey>',
        consumerSecret: '<consumerSecret>',
        callbackURL: '<callbackURL>',
        passReqToCallback: false //or omit this line
    },
    async (accessToken, refreshToken, profile, done) => {
        
        done(null, <user.id>);
    }
);
```

## Profile Response:
```javascript
{
    provider: 'evernote',           //provider
    userId: '612225',               //userId
    shard: 's1',                    //shard location of private notes
    expires: '1599323805658'        //unix timestamp of when the auth expires
}
```
