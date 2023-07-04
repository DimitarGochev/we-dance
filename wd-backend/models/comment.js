const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

commentSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Comment', commentSchema);