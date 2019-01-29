const axios = require('axios');
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_ADMIN_TOKEN
});
var base = Airtable.base('appOAKLyHFLsa7jpK');

const GITHUB = {
    group: "BalboaDevelopers",
    admin_token: process.env.GITHUB_ADMIN_TOKEN,
    team_id: "3088701",
    repo: {
        owner: "BalboaDevelopers",
        name: "encuEsTHas"
    }
}

const MAILCHIMP = {
    dc: "us20", // this is the datacenter of the list
    list_id: "69cbc0fea0",
    api_key: process.env.MAILCHIMP_ADMIN_TOKEN
}

async function addGithub(username){
    const url = {
        team: `https://api.github.com/teams/${GITHUB.team_id}/memberships/${username}?access_token=${GITHUB.admin_token}`,
        repo: `https://api.github.com/teams/${GITHUB.team_id}/repos/${GITHUB.repo.owner}/${GITHUB.repo.name}?access_token=${GITHUB.admin_token}`
    };
    try{
        const resTeam = await axios.put(url.team);
        await axios.put(url.repo);
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
        const res = await base('People').create(data);
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
            body: JSON.stringify(e),
        };
        return response;   
    }
}; 