const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("./config/mongoose.config");
require('dotenv').config();
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json(), express.urlencoded({ extended: true }));

const reviewRoutes = require("./routes/review.route");
const userRoutes = require("./routes/user.route");

userRoutes(app);
reviewRoutes(app);

app.listen(8000, () => console.log("Listening on port: 8000"));