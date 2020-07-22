const express = require('express')

var docker = require('./lib/docker')
// var container = new docker("http://127.0.0.1:2345/")

var container   = new docker.container()
var image       = new docker.image()

const app = express();

app.get('/container/',async (req,res)=> res.json( await container.list().all.then( response => response ) ))
app.get('/container/start',async (req,res)=> res.json( await container.list().start.then( response => response ) ))
app.get('/container/:id',async (req,res)=> res.json( await container.inspect(req.params.id) ))

app.get('/images/',async (req,res)=> res.json( await image.list().all.then( response => response ) ))
app.get('/images/:id',async (req,res)=> res.json( await image.inspect(req.params.id).then( response => response ) ))
app.get('/images/delete/:id',async (req,res)=> res.json( await image.delete(req.params.id) ))

app.get('*',(req,res)=> res.json({error: "api not fould"}))
app.listen(3000)
