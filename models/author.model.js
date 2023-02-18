const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const AuthorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        
    },
    country: {
        type: String,
        required: false,
       
    },
    books: {
        type: Array,
        default : []
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
});

// Export the model
module.exports = moogoose.model('Authors', AuthorSchema); //collection name is Books. This is the name of the collection in the database