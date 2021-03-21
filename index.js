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

// Read the roles file
fs.readFile(roleFile, 'utf-8', (err, jsonString) => {
        const roles = JSON.parse(jsonString);
        buildEmbeds(roles);
});

// Simple logged on msg
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is sent on the server,
client.on('message', msg => {
    // If the message is ping, reply pong.
    if (msg.content === 'ping') {
        msg.author.send(platformEmbed);
        msg.author.send(genreEmbed);
        msg.author.send(gameEmbed);
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

// Build the embeds with the arrays of roles.
function buildEmbeds(roles){
    // temp variable to add all of an array together
    var theFields = "";
    for(i = 0; i < roles.platform.length; i++){
        theFields += "**" + (i + 1) + "** " + roles.platform[i] + "\n";
    }
    platformEmbed.addField("Choose your platform(s)", theFields, false);
    theFields = "";
    for(i = 0; i < roles.genre.length; i++){
        theFields += "**" + (i + 1) + "** " + roles.genre[i] + "\n";
    }
    genreEmbed.addField("Choose your genre(s)", theFields, false);
    theFields = "";
    for(i = 0; i < roles.game.length; i++){
        theFields += "**" + (i + 1) + "** " + roles.game[i] + "\n";
    }
    gameEmbed.addField("Choose your game(s)", theFields, false);
}

// Control function that will handle the different parts of registering roles.
function registerRoles(member){
  // Get roles by name
  // Platforms
  let PC = message.guild.roles.cache.find(role => role.name === "PC");
  let PS = message.guild.roles.cache.find(role => role.name === "Playstation");
  let XBOX = message.guild.roles.cache.find(role => role.name === "XBOX");
  let Switch = message.guild.roles.cache.find(role => role.name === "Nintendo Switch");
  // Genres
  let FPS = message.guild.roles.cache.find(role => role.name === "FPS");
  let MMO = message.guild.roles.cache.find(role => role.name === "MMO");
  let MOBA = message.guild.roles.cache.find(role => role.name === "MOBA");
  let RPG = message.guild.roles.cache.find(role => role.name === "RPG");
  let Strat = message.guild.roles.cache.find(role => role.name === "Strategy");
  let Racing = message.guild.roles.cache.find(role => role.name === "Racing");
  // Games
  let Dest2 = message.guild.roles.cache.find(role => role.name === "Destiny 2");
  let R6 = message.guild.roles.cache.find(role => role.name === "Rainbow Six");
  let Apex = message.guild.roles.cache.find(role => role.name === "Apex Legends");
  let CS = message.guild.roles.cache.find(role => role.name === "CS:GO");
  let DbD = message.guild.roles.cache.find(role => role.name === "Dead by Daylight");
  let CoD = message.guild.roles.cache.find(role => role.name === "Call of Duty");
  let RL = message.guild.roles.cache.find(role => role.name === "Rocket League");
  let MC = message.guild.roles.cache.find(role => role.name === "Minecraft");
  let HotS = message.guild.roles.cache.find(role => role.name === "Heroes of the Storm");
  let LoL = message.guild.roles.cache.find(role => role.name === "League of Legends");
  let GTAV = message.guild.roles.cache.find(role => role.name === "GTA V");
  let Among = message.guild.roles.cache.find(role => role.name === "Among Us");

}

// Let the user choose which platforms to add to his profile
function choosePlatform(member){

}

// Let the user choose which genres to add to his profile
function chooseGenres(member){

}

// Let the user choose which games to add to his profile
function chooseGames(member){

}
