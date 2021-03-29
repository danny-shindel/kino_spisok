const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const movieSchema = new Schema({
    info: {},
    comments: [commentSchema],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    seenUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);