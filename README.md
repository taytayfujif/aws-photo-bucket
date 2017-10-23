# AWS Photobucket
[Intermediate] AWS, S3, Api-Gatway, Lambda, Serverless - Intro into AWS cloud services and Serverless

## Objective

Use your knowledge of AWS Lambda, Amazon S3, Serverless, Amazon API Gateway, and jQuery to make a client side request to a public S3 bucket and dynamically display the contents of the bucket. IE they will be images.

## Flow of Data
![](https://i.imgur.com/U5im4z0.jpg)


## Prerequisites
  - Basic knowledge of HTTP requests using jQuery.
  - Basic understanding of API's.
  - Basic understanding of JSON.
  - Basic understanding of AWS Lambda
  - Basic understanding of Amazon S3
  - Basic understanding of Amazon API-Gateway
  - Basic understanding of Serverless & CLI
  - Basic understanding of AWS CLI

## Setup
 - Fork & clone repo.
 - Npm install ```aws-sdk``` & require in packages.
 - - Create file structure:
     - client-side
         - index.html
         - styles.css
         - app.js
     - handler.js (will generate when you create Serverless template/boilerplate)
     - serverless.yml (will generate when you create Serverless template/boilerplate)
     - package.json
 - Import jQuery library.
 - Do a sanity check in browser.
 - Check if you have AWS CLI and Serverless installed.
 - Configure your AWS CLI with your given credentials.
 - Create Serverless template/boilerplate `aws-nodejs`.

## Tasks
You will be creating a Lambda function that makes a request to a public S3 bucket that is full of random images. From there, you will be creating a client side scripts to render the images when your Lambda function is executed.

## Steps
1. Build AWS Lambda function that makes a request to the public API bucket `photo-bucket-tmp-prjct`.
Add in the following to your Lambda function:
```
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const params = { Bucket: 'photo-bucket-tmp-prjct'};
```
 - Use s3.listObjects in your lambda function [s3.listObjects](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property)
2. Configure .yml for your function with ```region:us-west-2``` & add the code below to allow CORS:
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
 3. Test your AWS Lambda function locally(You should get a response back from the public API bucket like the code below).
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
 4. Deploy your function(Take note of the endpoint that is generated).
  - Note: If you make a change to your function or .yml file you will need to re-deploy
 5. Build a client-side GET request to your specific Lambda URL.
 6. Create a button. When user clicks the button, it should initiate an ajax request to your specific Lambda URL, which then triggers your specific lambda to make a request to the public S3 bucket, then will dynamically display all the images from the public S3 bucket.
  - Note: Use public S3 bucket image path to help you display all images `https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/`.
 7. Use the commands referenced below to make enable static website hosting. Then run appropriate command to sync your client-side files to your bucket(ie. html, css , js files). Your public url will be in the format of ```http://bucket-name.s3-website-region.amazonaws.com/```. Test url in browser

### Testing
  - Run live-server to test files in your client-side directory
  - Use Postman to check your routes

### Useful Commands
 -  ***Test function locally***

  ```sls invoke local -f "function name"```
 -  ***Deploy function only***

  ```sls deploy -f "function name```

 - ***Deploy everything***

  ```sls deploy```

 - ***Function logs***

  ```sls logs -f "function name"```

 - ***AWS CLI help***

  ```aws help```

 - ***Serverless CLI help***

  ```sls help```

 - ***Make Bucket A Static Website***

  ```aws s3 website s3://website-bucket-name/ --index-document index.html --error-document error.html```

 - ***Sync client-side files to Static Website Bucket***

  ```aws s3 sync projectfolder s3://website-bucket-name --acl public-read```

 - ***List all s3 Buckets***

  ```aws s3api list-buckets```


### Resources

- [s3.listObjects](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property)

- [Serverless](https://serverless.com/framework/docs/providers/aws/)

- [AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/)


