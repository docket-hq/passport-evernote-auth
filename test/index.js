const mocha = require('mocha');
const should = require('should');
const EvernoteStrategy = require('../index').Strategy;

describe( 'passport-dropbox-auth', function() {
    describe('module', function() {  
        it('should export class', function() {
            EvernoteStrategy.Strategy.should.be.an.instanceOf(Object);
        })
    })
  });

describe('EvernoteStrategy', function() {
    describe('strategy param tests', function () {
        it('should return false for passReqToCallback', function () {
            const strategy = new EvernoteStrategy({
                consumerKey: 'ABC123',
                consumerSecret: 'secret'
            }, function () { });

            strategy._passReqToCallback.should.equal(false);
        });

        it('should return true for passReqToCallback', function () {
            const strategy = new EvernoteStrategy({
                consumerKey: 'ABC123',
                consumerSecret: 'secret',
                passReqToCallback: true
            }, function () { });

            strategy._passReqToCallback.should.equal(true);
        });

        it('should return prod oauth urls', function () {
            const strategy = new EvernoteStrategy({
                consumerKey: 'ABC123',
                consumerSecret: 'secret'
            }, function () { });

            strategy.userAuthorizationURL.should.equal('https://www.evernote.com/OAuth.action');
            strategy.requestTokenURL.should.equal('https://www.evernote.com/oauth');
            strategy.accessTokenURL.should.equal('https://www.evernote.com/oauth');
        });

        it('should return sandbox oauth urls', function () {
            const strategy = new EvernoteStrategy({
                consumerKey: 'ABC123',
                consumerSecret: 'secret',
                useSandBox: true
            }, function () { });

            strategy.userAuthorizationURL.should.equal('https://sandbox.evernote.com/OAuth.action');
            strategy.requestTokenURL.should.equal('https://sandbox.evernote.com/oauth');
            strategy.accessTokenURL.should.equal('https://sandbox.evernote.com/oauth');
        });
    });
})