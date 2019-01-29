aws cloudformation deploy --stack-name signupform --template-file template.json --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name signupform > output.txt
export REACT_APP_AWS_API_GATEWAY_KEY=`python3 -c "
import json
import os
from pprint import pprint

with open('output.txt') as f:
    data = json.load(f)

for output in data['Stacks'][0]['Outputs']:
    if output['OutputKey'] == 'InvokeUrl':
        print(output['OutputValue'])
"`
cd react-form
REACT_APP_AWS_API_GATEWAY_KEY=$REACT_APP_AWS_API_GATEWAY_KEY | npm run deploy
aws s3 sync build/ s3://s3bucketforbalboadevelopers