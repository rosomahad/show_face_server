const axios = require('axios');
const config = require('config');
const https = require('https');
const path = require('path');
const fs = require('fs');

const cert = fs.readFileSync(path.join(__dirname, '../../translateyandexnet.crt'));
const agent = new https.Agent({
    ca: [cert],
    rejectUnauthorized: false,
    host: 'translate.yandex.net',
    port: '443',
    path: '/'
});
const translateUrl = `${config.get('yandex.url')}?key=${config.get('yandex.apiKey')}`;

module.exports = {
    async translate(str, from, to) {
        const url = `${translateUrl}&text=${encodeURIComponent(str)}&lang=${from.toLowerCase()}-${to.toLowerCase()}&format=plain`;

        const result = await axios({
            method: 'get',
            url,
            proxy: {
                host: config.get('proxy.host'),
                port: config.get('proxy.port'),
                auth: {
                    username: config.get('proxy.username'),
                    password: config.get('proxy.password')
                }
            },
            httpsAgent: agent,
        });

        if (result.status === 404 || !result.data || !result.data.text || !result.data.text.length) {
            throw new Error('Not found translated text');
        }

        return result.data.text[0];
    }
};
