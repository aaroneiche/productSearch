/* Some tests to run on the server */

const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');


var server = require('../app');


describe("AllProducts", function() {

    it("Requests all products", function(done) {
       
        false.should.be.true;   //basic failing test until we add criteria.
        done();
    });

    it("Searches for mattress", function(done) {
       
        false.should.be.true;   //basic failing test until we add criteria.
        done();
    });

    it("Searches for Backpack", function(done) {
       
        false.should.be.true;   //basic failing test until we add criteria.
        done();
    });

})