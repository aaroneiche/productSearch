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
        
        // need a little more time due to the rate limiting.
        // The minimum rate time multiplied by the max number of products
        
        this.timeout(process.env.RATEMIN * 18);     
        
        //Returns products matching mattress
        chai.request(server)
        .get("/search/mattress")
        .send()
        .end(function(err,res){
            
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.items.length.should.equal(4);

            const result1 = res.body.items[0];
            const result2 = res.body.items[1];
            const result3 = res.body.items[2];
            const result4 = res.body.items[3];

            result1.itemId.should.equal(14225185);
            result1.upc.should.equal("841550034950")

            result2.itemId.should.equal(14225186);
            result2.upc.should.equal("841550034967")

            result3.itemId.should.equal(14225187);
            result3.upc.should.equal("841550034974");

            result4.itemId.should.equal(14225188);
            result4.upc.should.equal("841550034981");

            done();
        })
    });

    it("Searches for backpack", function(done) {
        this.timeout(process.env.RATEMIN * 18); 

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