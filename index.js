const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');
app.use(cors());

const port = config.port || process.env.PORT;

mongoose.connect(
    config.dataURI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
});

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const userRoute = require('./routes_/userRoute');

app.use('/user', userRoute);


app.listen(port, ()=>{
    console.log("app is listeing on 3200");
})
