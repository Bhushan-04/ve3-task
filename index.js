const express = require('express');
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require('./routes/Task');
const userRoutes =  require('./routes/User');


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

app.use("/", taskRoutes);
app.use("/auth", userRoutes);


app.listen(3306, () => {
  console.log("server is running on port " + 3306);
});
