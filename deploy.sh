source .env.dev
cd lambda-function/
npm run deploy
cd ..
aws cloudformation deploy --stack-name signupform2 --template-file template.json --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name signupform2 > output.txt
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