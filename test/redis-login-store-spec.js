// > $ yarn run build && mocha -t 10000 ./test/redis-login-store-spec.js
let supertest = require('supertest');
let expect = require('chai').expect;
let redisLoginStore = require('../dist/util/redis-login-store').default;

describe('redis-login-store',function(){
    it('set user&pass ', async function(){
        let input  = {
            userName:'test-user',
            passWord:'test-pass',
        }
        let err = await redisLoginStore.set(input.userName,input.passWord);
        expect(err).to.be.not.ok;
    })

    it('get user&pass ', async function(){
        let input  = {
            userName:'test-user'
        }
        
        let expectedOutput = 'test-pass';
        let passWord =  await redisLoginStore.get(input.userName);
        expect(passWord).to.be.equal(expectedOutput);
    })

    it('getall entries ', async function(){
        let entries =  await redisLoginStore.getAll()
        expect(entries.length).to.be.greaterThan(0);
    })
});