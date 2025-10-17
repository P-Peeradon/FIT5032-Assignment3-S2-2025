import cors from 'cors';
import express from 'express';
import 'dotenv/config.js';
import apiRoutes from './server/api.js';

const app = express();

const fire_apiKey = process.env.VITE_FIREBASE_API_KEY;
const map_apiKey = process.env.VITE_MAPBOX_ACCESS_TOKEN;
const mail_apiKey = process.env.VITE_SENDGRID_API_KEY;

const allowedOrigins = [
    // Your Cloudflare Pages/Workers Subdomain
    'https://chillax-corner.pages.dev',
    // Localhost for development (optional)
    'http://localhost:3000',
];

const corsOptions = {
    // 2. Use a function to check the incoming request's Origin header
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // OR if the origin is in our allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // 3. Essential if your client needs to send cookies, session IDs, or Auth headers
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json()); //Allow parsing request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes); //Use this first before routing to other routes.
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

export default server;
