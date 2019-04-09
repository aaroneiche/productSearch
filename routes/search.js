var express = require('express');
var router = express.Router();
const axios = require('axios');

/* Search Endpoint */
router.get('/search/:searchTerm', async (req,res,next) => {
  
  /*   
  This is the full product ID set we've been asked to look at. 

  14225185,14225186,14225188,14225187,39082884,30146244,
  12662817,34890820,19716431,42391766,35813552,40611708,
  40611825,36248492,44109840,23117408,35613901,42248076,
  

  //A request for 1/3 of the products.
  http://api.walmartlabs.com/v1/items/?apiKey={apiKey}&ids=14225185,14225186,14225188,14225187,39082884,30146244
  
  */
  
  await axios.get()

  data = {}
  
  res.status(200); //Broadly assume we're finding something here.
  res.json(data);

});

module.exports = router;
