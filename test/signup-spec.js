// > $ yarn run build && mocha -t 10000 ./test/signup-spec.js
let supertest = require('supertest');
let expect = require('chai').expect;
let base = 'http://localhost:4000';
let server = supertest.agent(base);

let joi = require('joi');
let signUpJoi = require('../dist/joi-validation/joi-sign-up');

describe('signup API',function(){
    it('JOI updateDownload validation schema',function(){
        const schema = signUpJoi.signUpJoiSchema();
        const input = {
            body: {
                userName: 'userName',
                passWord: 'userPassWord',
                firstName: 'firstName',
                lastName: 'lastName',
                country: 'India',
                email: 'test@dev.com',
                gender: 'male'
            }
        }
        const result = joi.validate(input,schema);
        expect(result.error).to.be.null;
    });

    it('JOI updateDownload validation provided invalid `gender`, should fail ',function(){
        const schema = signUpJoi.signUpJoiSchema();
        const input = {
            body: {
                userName: 'userName',
                passWord: 'userPassWord',
                firstName: 'firstName',
                lastName: 'lastName',
                country: 'India',
                email: 'test@dev.com',
                gender: 'malee'
            }
        }
        const result = joi.validate(input,schema);
        expect(result.error).to.be.ok;
        // console.log(result.error);
        // Doing a destructuring
        const { details : [
            {
                message
            }
        ]} = result.error
        expect(message).to.contains('gender" must be one of');
    });

    it('JOI updateDownload validation provided invalid `email`, should fail ',function(){
        const schema = signUpJoi.signUpJoiSchema();
        const input = {
            body: {
                userName: 'userName',
                passWord: 'userPassWord',
                firstName: 'firstName',
                lastName: 'lastName',
                country: 'India',
                email: '',
                gender: 'male'
            }
        }
        const result = joi.validate(input,schema);
        expect(result.error).to.be.ok;
    });


    it('post to signup info, /signup, to register user',function(done){
        let body = {
            userName:'testUser-new',
            passWord:'testUser-new',
            firstName:'firstName',
            lastName:'lastName',
            country:'India',
            email:'test@test.com',
            gender:'male'
        }
        server
            .post(`/signup/`)
            .send(body)
            .expect(200)
            .end(function(err){
                expect(err).to.be.not.ok;
                done();
            });
    })

    it('get all /signup',function(done){
        server
            .get(`/signup/all`)
            .expect(200)
            .end(function(err,resp){
                expect(err).to.be.not.ok;
                // console.log(resp.body);
                expect(resp.body.data).to.be.ok;
                expect(resp.body.status).to.be.equal('success');
                done();
            });
    });


    it('login controller should verify success for signed up user',function(done){
        let body = {
            userName:'testUser-new',
            passWord:'testUser-new'
        }
        server
            .post(`/login/`)
            .send(body)
            .expect(200)
            .end(function(err,resp){
                expect(err).to.be.not.ok;
                expect(resp.body.accessToken).to.be.ok;
                // console.log(resp.body.accessToken);
                done();
            });
    })

});