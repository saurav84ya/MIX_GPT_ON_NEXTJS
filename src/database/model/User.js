const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    promptHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPrompt'
    }]
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
