const { spawn } = require('child_process');
const { batchPath, serverIP } = require('./config.json');
const axios = require('axios');

module.exports = {
	name: 'start',
	async execute(interaction) {
        let players = 0;

        axios.get(`https://api.mcsrvstat.us/1/${serverIP}`.then((res) => {
            if(res.data && res.data.players) {
                players = res.data.players.online || 0;
            }
        }).catch((err) => {
            console.error('Could not fetch data: ', err);
        }));

        if (players > 0) {
            await interaction.reply('Server is already running.');
            return;
        }

        pr = spawn(batchPath);
        
        pr.on('error', (err) => {
            console.error('Failed to run the specified batch file.', err);
        });

        require('./checkServer.js');

        await interaction.reply('Server is starting!');
	}
}
