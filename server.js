const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
    function callback() {
        fetch('https://beta.openexonaut.xyz:8443/ExonautServlet/online')
            .then((res) => {
                res.json()
                    .then((object) => {
                        try {
                            readyClient.user.setActivity(`Solo players: ${object.solo}. Team players: ${object.team}.`);
                        } catch (e) {
                            readyClient.user.setActivity("OpenExonaut isn't sending the right data!");
                            console.error(e);
                        }
                    })
                    .catch((e) => {
                        readyClient.user.setActivity("OpenExonaut isn't making sense!");
                        console.error(e);
                    });
            })
            .catch((e) => {
                readyClient.user.setActivity('OpenExonaut is offline!');
                console.error(e);
            });
    }

    console.log(`Logged in as ${readyClient.user.tag}`);
    setInterval(callback, 1000);
});

client.login(token);
