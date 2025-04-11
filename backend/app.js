const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/DBconnection');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const codeRoutes = require('./routes/code.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// routes
app.use('/users', userRoutes);
app.use('/code', codeRoutes);


app.use('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
