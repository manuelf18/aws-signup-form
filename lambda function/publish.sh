rm lambda.zip
zip -r lambda.zip *
aws lambda update-function-code --function-name email-joining-lambda --zip-file fileb://lambda.zip