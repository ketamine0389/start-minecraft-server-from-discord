const { serverIP, stopTime } = require('./config.json');
const axios = require('axios');
let i = 0;
let interval = 60000;

var ID = setInterval(() => {
    axios.get(`https://api.mcsrvstat.us/1/${serverIP}`.then((res) => {
        if (res.data.offline) clearInterval(ID);

        if(res.data && res.data.players) {
            const p = res.data.players.online || 0;

            if (p == 0) i++;
            else i = 0;
        }
    }).catch((err) => {
        console.error('Could not fetch data: ', err);
    }));

    if (i >= stopTime) {
        // left off
    }
}, interval);
