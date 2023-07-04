const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        min: 5,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin", "trainer"],
        required: true,
        default: 'user'
    },
    status: {
        type: String,
        enum: ["active", "suspended", "deactivated"],
        default: 'active'
    },
    dateOfCreation: {
        type: Date,
        default: new Date
    }
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('User', userSchema);