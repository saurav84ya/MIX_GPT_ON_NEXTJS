const { default: mongoose } = require("mongoose");

const UserPromptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.UserPrompt || mongoose.model('UserPrompt', UserPromptSchema);
