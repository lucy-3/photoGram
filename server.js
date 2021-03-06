const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//const bodyParser = require('body-parser');
const app = express();


//Passport config
app.use(passport.initialize());
require('./config/passport')(passport);

//Body-parser config
app.use(express.urlencoded({limit: '50mb', extended: false}));
//app.use(bodyParser({limit: '50mb'}));
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.json({limit: '50mb'}));

//Db config
const db = keys.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err));

//First route
app.get('/', (req, res) => res.send('Hello'));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 9000;
app.listen(port, () => console.log(`Server is running on ${port}`));
