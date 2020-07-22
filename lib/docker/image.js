const fetch = require('node-fetch')
const exec  = require('../../util/exec')
const path = require('../../util/path')
const shell = require('shelljs');
function image(url) {
    this.url = url ? url : { socket : '/var/run/docker.sock' }
}

image.prototype.list = function () {
    return {
        all   : exec(this.url, path.images.list.all ).then(data=>data),
    }
}

image.prototype.inspect = function (id){
    return exec(this.url, path.images.inspect(id) ).then(data=>data)
}

image.prototype.delete = function (id){
    var version = shell.exec(`docker rmi ${id}`, {silent:true});
    return version.stderr != '' ? { code : version.code , err: version.stderr } : { code : version.charCodeAt() , msg: version.stdout } 
}


module.exports = image;