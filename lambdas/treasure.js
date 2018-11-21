'use strict';
const AWS = require('aws-sdk')
const s3 = new AWS.S3();

module.exports.treasure = (event, context,callback) => {
  var params = {
    Bucket: "treasure-chest-capstone", 
    MaxKeys: 4
   };
   s3.listObjectsV2(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);   
     const response= {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: data, 
       }),   
   };
   callback(null, response)
   })

}