const mongoose = require('mongoose');


const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2h' // Token will be removed after 2 hour
    }
});

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);

