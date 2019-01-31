# AWS Signup Form

## Description
This repository contains a form built with [Create React App](https://github.com/facebook/create-react-app), the form is gonna be hosted on AWS S3 Bucket and when submitted it triggers a AWS Lambda function through a AWS Api Gateway.

## Requirements
* AWS Account.
* [AWS Command Line Interface](https://aws.amazon.com/cli/).
* [NPM](https://www.npmjs.com/).
* Unix like OS (Tested on Mac OS X).

## Testing using the AWS CloudFormation web app
Before proceeding to use the Cloudformation App you'll need a couple of variables
1. A name for the resulting aplication.
2. The GitHub Admin Access Key
3. The GitHub Group (in which you want the new members to be inserted) Url

4. The Airtable Admin Token.
5. The Airtable Base Id.
6. The Airtable Base Table Name.

6. The MailChimp API key.
7. The Mailchimp DataCenter.
8. The Mailchimp List ID.

Follow these guides to access each service variables:
1. [GitHub](docs/github.md)
2. [MailChimp](docs/mailchimp.md) 
3. [airtable](docs/airtable.md)