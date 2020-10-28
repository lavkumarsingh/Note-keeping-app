const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
    } 
})

module.exports = mongoose.model('Note', noteSchema)