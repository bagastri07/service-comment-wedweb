require("dotenv").config();

const express = require('express')

const app = express()

const db = require('./models')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    const err = new Error("");
    err.status = 404;
    next(err);
  });

app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.rest.notFound('End point not found');
    } else {
      res.rest.serverError(err.message || 'Internal server error');
    }
  });

const dbOptions = {
    alter: true,
    //force: true,
  };
  
  const port = process.env.PORT || 4001;
  
  db.sequelize.sync(dbOptions).then(() => {
    app.listen(port, () => {
      console.log(`listening on: http://localhost:${port}`);
    });
    // require("./bot");
  });
