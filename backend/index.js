const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));
const config = require('./config/default_TEMPLATE.json');
const mongoose = require('mongoose');
mongoose.connect(config.DB_URL);

const courseRouter = require('./routes/course');
const lessonRouter = require('./routes/lesson');
const feedbackRouter = require('./routes/feedback');
const userRouter = require('./routes/users');
var cors = require("cors");

app.use(cors());
app.use('/courses', courseRouter);
app.use('/lessons', lessonRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});