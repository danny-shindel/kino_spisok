const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    info: {},
    title: String,
    year: String,
    rate: String,
    director: String,
    release: Date,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);