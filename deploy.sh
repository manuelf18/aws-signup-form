aws cloudformation deploy --stack-name signupform --template-file template.json --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name s4 > output.txt
cd react-form
npm build
aws s3 sync build/ s3://s3bucketforbalboadevelopers