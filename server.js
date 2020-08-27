const connectDB = require('./config/db');
const express = require('express');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});
