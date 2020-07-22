const fetch = require('node-fetch')
const exec  = require('../../util/exec')
const path = require('../../util/path')
const shell = require('shelljs');
function container(url) {
    this.url = url ? url : { socket : '/var/run/docker.sock' }
}

container.prototype.list = function () {
    return {
        all   : exec(this.url, path.containers.list.all ).then(data=>data),
        start : exec(this.url, path.containers.list.start ).then(data=>data),
    }
}

container.prototype.inspect = function (id){
    var version = shell.exec(`docker logs ${id}`, {silent:true});
    return version.stdout
}

module.exports = container;