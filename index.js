const express = require('express');
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(cors());

const db = require("./connection/connection");
db.sequelize.sync({force : false});

app.use("/", require('./routes/task'));
app.use("/auth", require('./routes/User'));


app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
