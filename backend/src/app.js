const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/post.routes')


const app = express()


app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes)

module.exports = app;