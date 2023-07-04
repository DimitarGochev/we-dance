const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const clubRouter = require('./routes/club');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wedance', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo')).catch(() => console.log('Couldn\'t connect to database'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });

app.use('/users', userRouter);
app.use('/clubs', clubRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// Log in user
app.post('/login', async (req, res) => {
    const user = await User.findOne({ 'email': req.body.email, 'password': req.body.password }).select("-password -__v");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Register user
app.post('/register', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(3000, () => console.log('WD-Server is listening on port 3000.'));