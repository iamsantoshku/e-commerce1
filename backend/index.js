const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.json())
app.use(cookieParser())



app.use("/api",router)
app.get("/", (req, res)=>{
    res.send("api working")
})

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})




// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const routes = require('./routes'); // Adjust the path if needed
// const webhooks = require('./controller/order/webhooks'); // Adjust the path if needed
// require('dotenv').config();
// const connectDB = require('./config/db'); // Ensure DB connection is correctly set up

// const app = express();

// // Enable CORS with credentials
// app.use(cors({
//     origin: process.env.FRONTEND_URL, // Frontend URL from environment variables
//     credentials: true // Allow credentials (cookies, etc.)
// }));

// // Global Middlewares
// app.use(express.json({ limit: '50mb' })); // To parse JSON payloads
// app.use(express.urlencoded({ limit: '50mb', extended: true })); // To parse URL-encoded payloads
// app.use(cookieParser()); // To handle cookies

// // Stripe Webhook - Needs raw body for signature verification
// app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), webhooks);

// // Body parsing middleware for general use
// app.use(bodyParser.json()); // To parse application/json payloads
// app.use(bodyParser.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded payloads

// // Routes for API endpoints
// app.use('/api', routes);

// // Start the server after successful database connection
// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Connected to DB");
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((err) => {
//     console.error('Error connecting to the database:', err);
// });

// module.exports = app;
