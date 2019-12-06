// PACKAGES
require("dotenv").config();
const { getAllObjects, getSingleObject } = require("./utils/apis");
const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// OTHER VARS
const PORT = process.env.PORT;
const KEY = process.env.KEY;
const root_url = `${process.env.root_url}?${KEY}`;
const testing_url = process.env.TESTING_URL;

const config = {
  headers: { "Content-Type": "application/json" }
};

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////
// ROUTES //
////////////

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("<h1>Hylete Custom Objects App</h1>");
});

// GET all custom obj records
app.get("/custom-objects", (req, res) => {
  getAllObjects(testing_url, config).then(response => {
    res.send(response);
  });
});

// GET - gets a single custom obj record
app.get("/custom-objects/:id", (req, res) => {
  const { id } = req.params;
  getSingleObject(testing_url, id, config).then(response => {
    res.send(response);
  });
});

// PATCH - updates a single custom obj record
app.patch("/custom-objects/:id", (req, res) => {
  const { update_fields } = req.body;
  res.send(update_fields);
});

// POST - creates a net new custom obj record
app.post("/custom-objects", (req, res) => {});

// DELETE - deletes a single custom obj record
app.put("/custom-objects", (req, res) => {});

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
