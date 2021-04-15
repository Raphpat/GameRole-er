const Discord = require('discord.js');
const client = new Discord.Client();
const tokenFile = "./authToken.json";
const roleFile = "./roles.json";
const fs = require('fs');
var roles;

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

const agreeEmbed = new Discord.MessageEmbed()
    .setTitle("Register the platforms, genres and games you play")
    .setDescription(`This server offers the option to list the platforms, genres of games and games you play as roles so that you can find 
    people who play the same games you do.
    \nIf you would like to proceed, please react to this message.`);

// Read the roles file
fs.readFile(roleFile, 'utf-8', (err, jsonString) => {
    roles = JSON.parse(jsonString);
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
        //msg.author.send(platformEmbed);
        //msg.author.send(genreEmbed);
        //msg.author.send(gameEmbed);
        msg.react('👍');
    }
});

// Event listener for a new member joining.
client.on('guildMemberAdd', member => {
    // Send a message to the new member to register his roles.
    member.send(`Hello! And welcome to ${member.guild.name}.\nI am a bot, and will guide you through your first steps in this server.`)
    member.createDM().then(dmChannel => {
        dmChannel.send(agreeEmbed).then(function (message) {
            message.react('👍');
            const filter = (reaction, user) => reaction.emoji.name === '👍' && user.id != message.author.id;
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(function (collected) {
                    console.log(`Collected ${collected.size} reactions`);
                    registerRoles(member, dmChannel);
                })
                .catch(collected => {
                    console.log(`After a minute, no reaction from ${member.name}`);
                    message.reply('You didn\'t react, so you will not be rolled by this bot.');
                });
        });
    }).catch(console.error);
});

// Login using a local json file containing the token (Never put your bot's token on the internet!)
fs.readFile(tokenFile, 'utf-8', (err, jsonString) => {
    const data = JSON.parse(jsonString);
    client.login(data.token);
});

// Build the embeds with the arrays of roles.
function buildEmbeds(roles) {
    // temp variable to add all of an array together
    var theFields = "";
    for (i = 0; i < roles.platform.length; i++) {
        theFields += "**" + (i + 1) + "** " + roles.platform[i] + "\n";
    }
    platformEmbed.addField("Choose your platform(s)", theFields, false);
    theFields = "";
    for (i = 0; i < roles.genre.length; i++) {
        theFields += "**" + (i + 1) + "** " + roles.genre[i] + "\n";
    }
    genreEmbed.addField("Choose your genre(s)", theFields, false);
    theFields = "";
    for (i = 0; i < roles.game.length; i++) {
        theFields += "**" + (i + 1) + "** " + roles.game[i] + "\n";
    }
    gameEmbed.addField("Choose your game(s)", theFields, false);
}

// Control function that will handle the different parts of registering roles.
function registerRoles(member, dmChannel) {
    console.log("Registering role for " + member.user.username);
    choosePlatform(member, dmChannel);
}

// Let the user choose which platforms to add to his profile
function choosePlatform(member, dmChannel) {
    var validate = new RegExp('([0-9]{1,2})?');
    // Send the embed
    member.send(platformEmbed);
    // So long as the author of the message is not a bot
    const filter = m => !m.author.bot;
    dmChannel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(function (collected) {
            console.log(`Collected an answer for ${member.user.username} in the platform roling category.`)
            // collected is a map, so transform it to an array, then to string gets the contents
            var msgArray = collected.array().toString().split(" ");
            // If the user has entered more numbers than there should be, to avoid array out of bounds
            var looping = Math.min(msgArray.length, roles.platform.length);
            var roleToGive = member.guild.roles.cache.find(role => role.name === roles.title[0]);
            member.roles.add(roleToGive).catch(console.error);
            for (i = 0; i < looping; i++) {
                if (validate.test(msgArray[i])) {
                    roleToGive = member.guild.roles.cache.find(role => role.name === roles.platform[i]);
                    member.roles.add(roleToGive).catch(console.error);
                }
            }
            chooseGenres(member, dmChannel);
        })
        .catch(collected => {
            console.log(collected);
            console.log(`No answer from ${member.username} in the platform roling category.`);
            dmChannel.send('You didn\'t reply, so you will not be rolled for this category.');
            chooseGenres(member, dmChannel);
        });
}

// Let the user choose which genres to add to his profile
function chooseGenres(member, dmChannel) {
    var validate = new RegExp('([0-9]{1,2})?');

    // Send the embed
    member.send(genreEmbed);
    // So long as the author of the message is not a bot
    const filter = m => !m.author.bot;
    dmChannel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(function (collected) {
            console.log(`Collected an answer for ${member.user.username} in the genre roling category.`)
            // collected is a map, so transform it to an array, then to string gets the contents
            var msgArray = collected.array().toString().split(" ");
            // If the user has entered more numbers than there should be, to avoid array out of bounds
            var looping = Math.min(msgArray.length, roles.genre.length);
            var roleToGive = member.guild.roles.cache.find(role => role.name === roles.title[1]);
            member.roles.add(roleToGive).catch(console.error);
            for (i = 0; i < looping; i++) {
                if (validate.test(msgArray[i])) {
                    roleToGive = member.guild.roles.cache.find(role => role.name === roles.genre[i]);
                    member.roles.add(roleToGive).catch(console.error);
                }
            }
            chooseGames(member, dmChannel);
        })
        .catch(collected => {
            console.log(collected);
            console.log(`No answer from ${member.user.username} in the genre roling category.`)
            dmChannel.send('You didn\'t reply, so you will not be rolled for this category.');
            chooseGames(member, dmChannel);
        });
}

// Let the user choose which games to add to his profile
function chooseGames(member, dmChannel) {
    var validate = new RegExp('([0-9]{1,2})?');

    // Send the embed
    member.send(gameEmbed);
    // So long as the author of the message is not a bot
    const filter = m => !m.author.bot;
    dmChannel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(function (collected) {
            console.log(`Collected an answer for ${member.user.username} in the game roling category.`)
            // collected is a map, so transform it to an array, then to string gets the contents
            var msgArray = collected.array().toString().split(" ");
            // If the user has entered more numbers than there should be, to avoid array out of bounds
            var looping = Math.min(msgArray.length, roles.game.length);
            var roleToGive = member.guild.roles.cache.find(role => role.name === roles.title[2]);
            member.roles.add(roleToGive).catch(console.error);
            for (i = 0; i < looping; i++) {
                if (validate.test(msgArray[i])) {
                    roleToGive = member.guild.roles.cache.find(role => role.name === roles.game[i]);
                    member.roles.add(roleToGive).catch(console.error);
                }
            }
        })
        .catch(collected => {
            console.log(collected);
            console.log(`No answer from ${member.user.username} in the game roling category.`)
            dmChannel.send('You didn\'t reply, so you will not be rolled for this category.');
        });
    
    console.log(`Finished rolling ` + member.user.username);
}
