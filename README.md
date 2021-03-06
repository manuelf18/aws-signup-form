# AWS Signup Form

## Description
This repository contains a form built with [Create React App](https://github.com/facebook/create-react-app), the form is gonna be hosted on AWS S3 Bucket and when submitted it triggers a AWS Lambda function through a AWS Api Gateway.

## Requirements
* AWS Account.
* [AWS Command Line Interface](https://aws.amazon.com/cli/).
* [NPM](https://www.npmjs.com/).
* Unix like OS (Tested on Mac OS X).

## Testing using the AWS CloudFormation web app
Before proceeding to use the Cloudformation App you'll need a couple of variables.
We provide a small list where you can map the variabes you are getting with the number of variables below.

--- [Guide for GitHub variables](docs/github.md) ---<br>
Following the above guide we will obtain:<br>
1. The GitHub Admin Access Key.
2. The GitHub Group (in which you want the new members to be inserted) Url.

--- [Guide for Airtable](docs/airtable.md) ---

Following the above guide we will obtain:<br>
3. The Airtable API Url.

--- [Guide for MailChimp variables](docs/mailchimp.md) ---<br>
Following the above guide we will obtain:<br>
4. The MailChimp API key.
5. The Mailchimp List ID. <br>

