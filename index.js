const Discord = require('discord.js');
const client = new Discord.Client();
const tokenFile = "./authToken.json";
const roleFile = "./roles.json";
const fs = require('fs')

// Creating the basic embed
const platformEmbed = new Discord.MessageEmbed()
    .setTitle("What platforms do you game on?")
    .setDescription("Enter the numbers of all the relevant platforms, seperated by a space.");

const genreEmbed = new Discord.MessageEmbed()
    .setTitle("What genre games do you mostly play?")
    .setDescription("Enter the numbers of all the relevant genres, seperated by a space.");

const gameEmbed = new Discord.MessageEmbed()
    .setTitle("What games do you mostly play?")
    .setDescription("Enter the numbers of all the relevant games, seperated by a space.");

// Simple logged on msg
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    buildEmbeds();
});

// When a message is sent on the server,
client.on('message', msg => {
    // If the message is ping, reply pong.
    if (msg.content === 'ping') {
        msg.author.send('pong');
    }
});

// Event listener for a new member joining.
client.on('guildMemberAdd', member => {
    // Send a message to the new memebr to register his roles.
    member.send(`Hello! And welcome to ${member.guild.name}.\nI am a bot, and will guide you through your first steps in this server.`)
    registerRoles(member);
});

// Login using a local json file containing the token (Never put your bot's token on the internet!)
fs.readFile(tokenFile, 'utf-8', (err, jsonString) => {
    const data = JSON.parse(jsonString);    
    client.login(data.token);
});

// Read the roles file
fs.readFile(roleFile, 'utf-8', (err, jsonString) => {
    const roles = JSON.parse(jsonString);    
});

// Build the embeds with the arrays of roles.
function buildEmbeds(){
    // temp variable to add all of an array together
    var theFields = "";
    for(i = 0; i < roles.platform.length; i++){
        theFields += "**" + i + 1 + "** " + roles.platform[i] + "\n";
    }
    platformEmbed.addField("Choose your platform(s)", theFields, false);
    theFields = "";
    for(i = 0; i < roles.genre.length; i++){
        theFields += "**" + i + 1 + "** " + roles.genre[i] + "\n";
    }
    genreEmbed.addField("Choose your genre(s)", theFields, false);
    theFields = "";
    for(i = 0; i < roles.game.length; i++){
        theFields += "**" + i + 1 + "** " + roles.game[i] + "\n";
    }
    gameEmbed.addField("Choose your game(s)", theFields, false);
}

// Control function that will handle the different parts of registering roles.
function registerRoles(member){

}

// Let the user which platforms to add to his profile
function choosePlatform(member){

}

// Let the user which genres to add to his profile
function chooseGenres(member){

}

// Let the user which games to add to his profile
function chooseGames(member){

}

