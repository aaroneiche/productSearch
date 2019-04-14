var express = require('express');
var router = express.Router();
const axios = require('axios');
const {filterKeyword, delay} = require('../lib');

/* Search Endpoint */
router.get('/:searchTerm', async (req,res,next) => {
  
  /*   
  This is the full product ID set we've been asked to look at. 

  14225185,14225186,14225188,14225187,39082884,30146244,
  12662817,34890820,19716431,42391766,35813552,40611708,
  40611825,36248492,44109840,23117408,35613901,42248076,
  
  //A request for 1/3 of the products.
  http://api.walmartlabs.com/v1/items/?apiKey={apiKey}&ids=14225185,14225186,14225188,14225187...
 
  */

  const products = [
    "14225185",
    "14225186",
    "14225188",
    "14225187",
    "39082884",
    "30146244",
    "12662817",
    "34890820",
    "19716431",
    "42391766",
    "35813552",
    "40611708",
    "40611825",
    "36248492",
    "44109840",
    "23117408",
    "35613901",
    "42248076"
  ];
  const maxItemLength = 6;  // Determined emperically.
  var productResults = [];  // An array to feed products into.

  //Because of rate limiting, we're going to get the product set in chunks. 
  while(products.length > 0) {
    
    let subset = products.splice(0,maxItemLength);

    //Generate a url for this batch of product IDs
    var url = `http://api.walmartlabs.com/v1/items?apiKey=${process.env.APIKEY}&ids=${subset.join(",")}`;

    try {
      let callProducts = await axios.get(url).then(function(response){
        if(response.data.errors) {
          //return an empty dataset, as we may still aggregate products.
          return [];
        }

        return response.data.items;

      }).catch(function(err){
        /* 
        If the call fails, we'll throw an error to passback.  
        this is different than a call that returns nothing, or an error.        
        */
        throw(err);
      });
      //Put the incoming product set into an array to return.
      productResults = productResults.concat(callProducts);

    } catch(err) {
      res.status(500);
      res.send("Difficulty communicating with remote server." + err);
    }
    await delay(process.env.RATEMIN); //Provides us with management for rate limiting.
  }

  let filteredItems = filterKeyword(productResults,req.params.searchTerm,"longDescription");
  let response = {
    items: filteredItems
  }

  res.status(200);
  res.json(response);
});

module.exports = router;
