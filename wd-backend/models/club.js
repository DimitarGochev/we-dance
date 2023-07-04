const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

clubSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Club', clubSchema);