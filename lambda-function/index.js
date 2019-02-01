const axios = require('axios');
const AIRTABLE_VARS = getAirtableVariablesFromUrl();
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_VARS.AIRTABLE_ADMIN_TOKEN
});
var base = Airtable.base(AIRTABLE_VARS.AIRTABLE_BASE);

const GITHUB = {
    access_token : process.env.GITHUB_ACCESS_TOKEN 
};

const MAILCHIMP = {
    dc: "us20", // this is the datacenter of the list
    list_id: "69cbc0fea0",
    api_key: process.env.MAILCHIMP_ADMIN_TOKEN
}

async function getTeamIdFromUrl(){
    const coincidences = ['/orgs/', '/teams/']
    const teamUrl = process.env.GITHUB_TEAM_URL
    let index = teamUrl.indexOf(coincidences[0], 4) + coincidences[0].length;
    const org = teamUrl.substring(index, teamUrl.indexOf('/', index));
    index = index + org.length + coincidences[1].length;
    const team = teamUrl.substring(index);
    try{
        const rest = await axios.get(`https://api.github.com/orgs/${org}/teams?access_token=${GITHUB.access_token}`);
        const resp = rest.data.find(v => v.slug === team);
        return resp.id;
    }
    catch(e){
        throw new Error(e);
    }
}

function getAirtableVariablesFromUrl(){
    const url = process.env.AIRTABLE_URL; // https://api.airtable.com/v0/appOAKLyHFLsa7jpK/People?api_key=keynZnVBcfVOPH6Xm
    const coincidence = '/v0/';
    let ans = {};
    let index = url.indexOf(coincidence) + coincidence.length;
    ans.AIRTABLE_BASE = url.substring(index, url.indexOf('/', index));
    index = url.indexOf('/', index);
    ans.AIRTABLE_BASE_TABLE = url.substring(index, url.indexOf('?', index));
    ans.AIRTABLE_ADMIN_TOKEN = url.substring(url.indexOf('api_key=', index));
    return ans;
}

async function addGithub(username){
    let teamId = await getTeamIdFromUrl();
    const url = `https://api.github.com/teams/${teamId}/memberships/${username}?access_token=${GITHUB.access_token}`;
    try{
        const resTeam = await axios.put(url);
        return resTeam;
    }
    catch(e){
        throw new Error(e);
    } 
}

async function addMailChimp(email, fullname){
    const index = fullname.indexOf(' ');
    const fname = fullname.substr(0, index);
    const lname = fullname.substr(index + 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${MAILCHIMP.api_key}`;
    const data = {
        email_address: email,
        status: "pending",
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        }
    }
    const url = `https://${MAILCHIMP.dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP.list_id}/members/`;
    try{
        const res = await axios.post(url, data);
        return res;
    }
    catch(e){
        throw new Error(e);
    } 
}

async function addAirTable(fullname, email, username){
    const data = {
        "Name": fullname,
        "Email": email,
        "Registered": true,
        "Github Username": `@${username}`
    }
    try{
        const res = await base(AIRTABLE_VARS.AIRTABLE_BASE_TABLE).create(data);
        return res;
    }
    catch(e){
        throw new Error(e);
    }
}


exports.handler = async (event) => {
    const {fullname, email, username} = event;
    let ans = [];
    try{
        ans.push(await addGithub(username));
        ans.push(await addMailChimp(email, fullname));
        ans.push(await addAirTable(fullname, email, username));
        console.log(ans);
        const response = {
            statusCode: 200,
            body: JSON.stringify(`Exito`),
        };
        return response;
    }
    catch(e){
        const response = {
            statusCode: 500,
            body: "There was an internal server error.",
        };
        return response;   
    }
}; 