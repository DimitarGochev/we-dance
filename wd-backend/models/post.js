const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

postSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Post', postSchema);