const http = require('http');
const fetch = require('node-fetch')

module.exports = ( call , path) => {
    if( typeof call == 'string'){
        return getWithUrl(call ,path)
    }else{
        return getSocket( { path: path, socketPath: `${call.socket}` } ).then(data=>data);
    }
}

function getSocket (url){
    return new Promise((resolve, reject) => {
        const req = http.get(url);
        req.once('error', reject);
        req.once('response', async res => {
            const bufs = [];
            for await (const buf of res) bufs.push(buf);
            resolve(JSON.parse(Buffer.concat(bufs)));
        });
    });
}
function getWithUrl(url , path){
    return fetch( url + path ).then(u => u.json())
}

function deleteUrl(){
    
}