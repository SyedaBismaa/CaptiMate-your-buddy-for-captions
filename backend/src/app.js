const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/post.routes')


const app = express()

// // Enable CORS for all routes
// app.use(cors({
//   origin: 'http://localhost:5173', // Vite default port
//   credentials: true
// }));


app.use(cors())
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/posts',postRoutes )

module.exports = app;