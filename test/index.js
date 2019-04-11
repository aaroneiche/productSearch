/* Some tests to run on the server */

// const mocha = require('mocha');
require('mocha');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

var server = require('../app');

chai.use(chaiHttp);


describe("Search", function() {

    it("Searches for mattress", function(done) {
        
        //Returns products matching mattress
        chai.request(server)
        .get("/search/mattress")
        .send()
        .end(function(err,res){
            
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.items.length.should.not.equal(0);

            done();
        })
    });

    it("Searches for backpack", function(done) {

        //Returns products matching backpack
        chai.request(server)
        .get("/search/backpack")
        .send()
        .end(function(err,res){
            
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.items.length.should.equal(0);

            done();
        })
    });

})