const Discord = require('discord.js');
const client = new Discord.Client();
const tokenFile = "./authToken.json";
const fs = require('fs')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //whatever other code you may fanacy
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
    if(msg.member == msg.guild.owner && msg.content == '!shutdown'){
        shutdown(msg.guild.owner.displayName);
    }
});

fs.readFile(tokenFile, 'utf-8', (err, jsonString) => {
    const data = JSON.parse(jsonString);    
    client.login(data.token);
});


