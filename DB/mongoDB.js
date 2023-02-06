const mongoose = require('mongoose');
const CONFIG = require('../config/config')

mongoose.set("strictQuery", false);

function connectToDb () {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on('connected', ()=> {
        console.log('mongoDB successfully connected ')
    })

    mongoose.connection.on('error', (error)=> {
        console.log('An error occured database not connected', error)
    })
}

module.exports = connectToDb