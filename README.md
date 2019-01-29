# AWS Signup Form

## Description
This repository contains a form built with [Create React App](https://github.com/facebook/create-react-app), the form is gonna be hosted on AWS S3 Bucket and when submitted it triggers a AWS Lambda function through a AWS Api Gateway.

## Requirements
* AWS Account.
* [AWS Command Line Interface](https://aws.amazon.com/cli/).
* [NPM](https://www.npmjs.com/).
* Unix like OS (Tested on Mac OS X).

## TODO:
Generate a way to keep the uniques name for clashing. These names are defined in template.json, they are the 

## Install dependencies
You can enter both folders and use:
``` 
npm install 
```
or use the shell utility in this repo:
```
bash build.sh
```


## Testing the React form locally
You can test the react form on your local machine by using either:
``` 
npm start 
```
or:
``` 
yarn start 
```

## Testing Self Upload
You'll need to upload the React form to a S3 Bucket. You can do this by entering to /react-form
and using the build script
```
npm run build
```
and uploading everything in the new build/ folder to the S3 bucket.

To build and deploy at the same time you'll first need to set an enviromental variable named S3BUCKET, then you can execute:
```
npm run deploy
```
which will build the react form and then upload it to wherever the enviromental variable points.

The lambda function can be uploaded with 
```
npm run upload
```

## Testing CloudFormation
To test cloudformation youll need to set up your AWS cli with an IAM account with admin privileges.
then remember to change the names in uppercase letters in template.json
then just 
``` 
bash deploy.sh
```

