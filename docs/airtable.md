# Finding the Airtable Variables

## Generating the Airtable API Key
1. Login to airtable:
2. Enter https://airtable.com/account
3. Click on generate API Key (You don't have to copy the Key).

## Creating the Airtable Table
1. Create a table (you can use a base or start from scratch) with these parameters:<br>
![First Image][0]
The parameters are:
* Table name: People
* Fields:
    * Name (Type = Text)
    * Registered (Type = Check)
    * Email (Type = Email)
    * Github Username (Type = Text)

## Getting the Airtable Url
1. Go to https://airtable.com/api
3. Enter to extras/API Keys.
4. Select the table you want:<br>
![Second Image][1]
6. Click on show API Key.
7. In the AUTHENTICATION section get the API URL without the cURL instruction.
<br>![Third Image][2]
In this for example the url would be: https:// ...

[0]: images/airtable0.png "Image 1"
[1]: images/airtable1.png "Image 2"
[2]: images/airtable2.png "Image 3"
