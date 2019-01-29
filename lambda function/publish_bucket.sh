rm lambda.zip
zip -r lambda.zip *
aws s3 sync . s3://lambda-severless --exclude "*" --include "*.zip"