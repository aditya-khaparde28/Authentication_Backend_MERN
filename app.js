// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const PORT = 8000;

// const authRoutes=require('./Routes/Auth');


// require('dotenv').config();
// require('./db')

// app.use(bodyParser.json());
// const allowedOrigins = ['http://localhost:3000','http://localhost:3001','https://authentication-seven-mu.vercel.app']; // Add more origins as needed


// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('Not allowed by CORS'));
//             }
//         },
//         credentials: true, // Allow credentials
//         optionsSuccessStatus: 200 
//     })
// );

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     }
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }
//     next();
// });
// app.use(cookieParser());

// app.use('/auth',authRoutes);

// app.get('/', (req, res) => {
//     res.json({ message: 'The API is working' });
// });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;

const authRoutes = require('./Routes/Auth');

require('dotenv').config();
require('./db');

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://authentication-seven-mu.vercel.app'
];

// CORS middleware configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use CORS middleware
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
