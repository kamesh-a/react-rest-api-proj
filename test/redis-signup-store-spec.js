// > $ yarn run build && mocha -t 10000 ./test/redis-signup-store-spec.js
let supertest = require('supertest');
let expect = require('chai').expect;
let redisSignStore = require('../dist/util/redis-signup-store').default;

describe('redis-login-store',function(){
    it('set signUp info ', async function(){
        let input  = {
            userName:'test-user-1',
            passWord:'test-user-pass',
            firstName:'test-firstName',
            lastName:'test-lastName',
            country:'test-country',
            email:'test-email',
            gender:'test-gender'
        }
        let err = await redisSignStore.set(input);
        expect(err).to.be.not.ok;
    })

    it('get by user ', async function(){
        let input  = {
            userName:'test-user-1'
        }

        let expectedOutput = {
            userName:'test-user-1',
            passWord:'test-user-pass',
            firstName:'test-firstName',
            lastName:'test-lastName',
            country:'test-country',
            email:'test-email',
            gender:'test-gender'
        }
        
        // let expectedOutput = 'test-pass';
        let userInfo =  await redisSignStore.get(input.userName);
        // console.log(userInfo);
        expect(userInfo).to.be.deep.equals(expectedOutput);
    })

    it('getall entries ', async function(){
        let entries =  await redisSignStore.getAll()
        expect(entries.length).to.be.greaterThan(0);
    })
});