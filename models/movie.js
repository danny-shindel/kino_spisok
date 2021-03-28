const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    info: {},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    watched: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);