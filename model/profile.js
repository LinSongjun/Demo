const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    expenditure: {
        type: String,
        required: true
    },
    cash: {
        type: String
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Profile', profileSchema)