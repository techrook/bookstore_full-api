const mongoose = require('mongoose');
const CONFIG = require('../config/config')
const logger = require('../logging/logger')

mongoose.set("strictQuery", false);

function connectToDb () {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on('connected', ()=> {
        logger.info('mongoDB successfully connected ')
    })

    mongoose.connection.on('error', (error)=> {
        logger.error( error)
    })
}

module.exports = connectToDb