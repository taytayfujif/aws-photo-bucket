# AWS Photobucket
[Advanced] AWS-sdk, s3, API Gateway, Lambda, Serverless, and ES6 Methods

## Objective

You will be making a GET request to API Gateway which invokes a Lambda function to request image data from a specified S3 bucket. After you have recieved data from the S3 bucket, render the images to the frontend. 

## Flow of Data
![AWS Diagram](https://i.imgur.com/wxx5zw2.png)

## Prerequisites
  - Basic understanding of JSON data.
  - Basic understanding of AWS Lambda
  - Basic understanding of Amazon S3
  - Basic understanding of Amazon API Gateway
  - Basic understanding of Serverless 

## Setup
 - Fork & clone repo.
 - Create file structure:
     - public
         - index.html
         - styles.css
         - app.js
 - Create Serverless boilerplate/template 

## Tasks
You will be creating a Lambda function that makes a request to a public S3 bucket that is full of random images. From there, you will be creating a client-side scripts to render the images when your Lambda function is executed.

## Steps
1. Build AWS Lambda function that makes a request to the public API bucket `photo-bucket-tmp-prjct`.
Add in the following to your handler.js:
```
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const params = { Bucket: 'photo-bucket-tmp-prjct'};
```
 - Use [s3.listObjects](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property) method in your lambda function to list contents of public S3 bucket.
2. Configure .yml for your Lambda function with a GET route & add the code below to allow CORS:
```
  cors:
    origin: '*'
    headers:
      - Content-Type
      - X-Amz-Date
      - Authorization
      - X-Api-Key
      - X-Amz-Security-Token
      - X-Amz-User-Agent
    allowCredentials: false
 ```
 3. In your Lambda Function, create proper Access-Control-Allow headers in your response.
 4. Test your AWS Lambda function locally(You should get a response back from the public S3 bucket like the code below).
 ```
{
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    "body": "{\"message\":{\"IsTruncated\":false,\"Marker\":\"\",\"Contents\":[{\"Key\":\"random-pictures-1.jpg\",\"LastModified\":\"2017-10-21T23:44:10.000Z\",\"ETag\":\"\\\"2e428e8ae830e4015f0df533b8f006e1\\\"\",\"Size\":71296,\"StorageClass\":\"STANDARD\",\"Owner\":{\"DisplayName\":\"junior+whsdevops\",\"ID\":\"123c07480908fa9b8fc35f1e8bd4325f14e1f29488e2c605c433966d4c4be52b\"}},
 ```
  - Note: You will be using `\"Key\":\"random-pictures-1.jpg\"` to dynamically display all the images from public S3 bucket in your app.js
 5. Deploy your function(Take note of the endpoint that is generated).
  - Note: If you make a change to your function or .yml file you will need to re-deploy serverless
 6. Build a client-side GET request to your specific Lambda URL.
 7. Create a button. When user clicks the button, it should initiate an ajax request to your specific Lambda URL, which then triggers your specific lambda to make a request to the public S3 bucket, then will dynamically display all the images from the public S3 bucket on the client-side.
  - Note: Use public S3 bucket image path to help you display all images `https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/Key`.
 8. Use the commands referenced below to make enable static website hosting on ***YOUR*** S3 bucket. Then run appropriate command to sync your client-side files to your bucket(ie. html, css , js files). Your public url will be in the format of ```http://bucket-name.s3-website-region.amazonaws.com/```. Test url in browser


### Resources
[AWS.S3 — AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getBucketWebsite-property)

[AWS.S3 - AWS SDK - listObjects](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property)
