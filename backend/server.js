const express = require('express');
const router = require('./routes/index')

const server = express() 
server.use(express.json())//convierte la info en un objeto de js



server.use(router)

module.exports = server

