const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const port = process.env.PORT || 4000;
const logEvents = require('./helpers/logEvents');
const connectDB = require('./config/connectDB');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
connectDB();
app.listen(port, () => console.log(`Server started on http://localhost:${port}`))