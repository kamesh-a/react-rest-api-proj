// > $ yarn run build && mocha -t 10000 ./test/login-spec.js
let supertest = require('supertest');
let expect = require('chai').expect;
let base = 'http://localhost:4000';
let server = supertest.agent(base);

describe('Login API',function(){
    it('post to verify login available, /login newly registered user',function(done){
        let body = {
            userName:'testUser-random',
            passWord:'testUser-random'
        }
        server
            .post(`/login/`)
            .send(body)
            .expect(200)
            .end(function(err){
                expect(err).to.be.ok;
                done();
            });
    })

    it('get all /login',function(done){
        server
            .get(`/login/`)
            .expect(200)
            .end(function(err,resp){
                expect(err).to.be.not.ok;
                // console.log(resp.body);
                expect(resp.body.data).to.be.ok;
                expect(resp.body.status).to.be.equal('success');
                done();
            });
    })
});