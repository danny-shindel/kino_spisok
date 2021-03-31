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

const ratingSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestampes: true,
})

const movieSchema = new Schema({
    info: Schema.Types.Mixed,
    comments: [commentSchema],
    ratings: [ratingSchema],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    seenUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);