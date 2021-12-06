const express = require("express");
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const MongoDbStore = require('connect-mongo');

const local = require("./local.js");    // local file is needed for passport.js
const config = require('./config/config');
const connectDB = require('./config/db.js');
const CombinedRouter = require('./routes/CombinedRouter.js');
const app = express();

const PORT = config.PORT;
const MONGO_URI = config.db.mongoURI;

// Connecting to database
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false}));

app.use(cors({origin:'http://localhost:3000', credentials: true}));

app.use(
    session({
        secret: "very secret key",
        resave: false,
        saveUninitialized: true,
        store: MongoDbStore.create({
            mongoUrl: MONGO_URI
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 2
        }
    })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Server Side Works!"));
app.use('/file', CombinedRouter.FileRouter);
app.use("/user", CombinedRouter.UserRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
