var express = require('express');
var router = express.Router();
const axios = require('axios');
const lib = require('../lib');

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

    var url = `http://api.walmartlabs.com/v1/items?apiKey=${process.env.APIKEY}&ids=${subset.join(",")}`;
    // console.log(url);
    
    let callProducts = await axios.get(url).then(function(response){
      
      //We're going to ignore adding these products to our set: Invalid Ids.
      if(response.data.errors) {
        console.log("Error - ");
        return [];
      }

      return response.data.items;
    });
    //Put the incoming product set into an array to return.
    productResults = productResults.concat(callProducts);
  }

  res.status(200); //Broadly assume we're finding something here.
  res.json(lib.filterKeyword(productResults,req.params.searchTerm,"longDescription"));
});

module.exports = router;
