# AWS Photobucket
[Advanced] AWS-sdk, s3, API Gateway, Lambda, Serverless, and ES6 Methods

## What is Amazon s3?
- Stands for simple storage service
- One of the first services in AWS
- S3 is a safe place to store any type of files (text files, images, mp3)
- You can think of s3 as Dropbox or GoogleDrive
- Is Object based(Key & Value pair)
- FIles are stored in buckets(similar to folder)
- Bucket Names must be unique

## What is aws-sdk?
- Software Development Kit
- A collection of tools for developers creating web applications provided by aws
- Provides APIs, class libraries, and code samples
- We will be using aws-sdk to communicate with s3

## S3 and aws-sdk demo
---
1. After creating your serverless boilerplate/template run
```
npm init --yes
```
  - This will create a package.json file for you
  - package.json will allow us to install aws-sdk npm pakaage to use
2. To install aws-sdk run
```
npm install aws-sdk
```
  - You should now see a `node_modules` directory in your current directory

3. Require aws-sdk and create an s3 client in our handler.js file
```js
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
```
## Create an s3 bucket and pass in data **locally**

[Create Bucket - AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property)
```js
s3.createBucket({ Bucket: "YOUR_BUCKET_NAME"}, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data); // successful response
 });
```
1. Hard code YOUR_BUCKET_NAME for now(We will add dynamically through Postman)
2. Remove `async` keyword from lambda function
3. Add `callback` parameter in lambda function
4. Store return vaule in a variable named `response`
5. Pass `response` into callback function `callback(null, response)`
6. Run lambda function locally
7. Pass in bucket name data dynamically
8. Create a `dummyData.json` file. Add the following:
```json
{
    "bucketName": "testingjay123"
}
```
13. run with --path to pass in `dummyData.json`
```
serverless invoke local --path ./data.json
```
## Post to a deployed lambda
1. Before deploying lambda function, lets add a few code snippets to our `serverless.yml` file
2. Add `iamRoleStatements:` to the end of `provider:`:
```yml
  provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-west-2
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"
```
- This allows our deployed lambda function to access the s3 service
3. Add `integration: lambda` under `cors: true`
```yml
functions:
  create:
    handler: handler.create
    events:
      - http: 
          path: create
          method: post
          cors: true
          integration: lambda
          request:
            passThrough: WHEN_NO_TEMPLATES
            template:
              application/x-www-form-urlencoded: '{ "body" : "$input.body" }'

```
- This allows us to recieve data passed in through Postman
4. Deploy serverless
5. Copy and paste the returned POST endpoint url and paste into Postman  Post method
6. In Postman, select `Body` -> `raw` -> select `JSON(application/json)` from the dropdown that says `Text`
7. In the below input field, type in JSON data format exactly like the `dummyData.json` file


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



