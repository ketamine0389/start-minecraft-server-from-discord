const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
module.exports = client;
client.commands = new Collection();

const fs = require('node:fs');

module.exports = async (client) => {
    const cmdFi = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith('.js'));
    for (const fi of cmdFi) {
        const cmd = require(`${process.cwd()}/commands/${fi}`);
        client.commands.set(cmd.data.name, cmd);
    }

    const evFi = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
    for (const fi of evFi) {
        const event = require(`${process.cwd()}/events/${fi}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

require('./checkServer.js');

client.login(token);
