// > $ yarn run build && mocha -t 10000 ./test/get-access-token-spec.js
let supertest = require('supertest');
let expect = require('chai').expect;
let getAccessToken = require('../dist/util/get-access-token');

describe('get-access-token',function(){
    it('generate accesstoken ',function(){
        let input  = {
            userName:'test-user',
            passWord:'test-pass',
        }
        let accessToken = getAccessToken.generateAccessToken(input.userName,input.passWord);
        expect(accessToken).to.be.ok;
    })
});