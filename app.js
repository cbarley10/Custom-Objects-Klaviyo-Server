// PACKAGES
require("dotenv").config();
const crypto = require("crypto");
const {
  getAllObjects,
  getSingleObject,
  updateSingleObject,
  deleteSingleObject,
  checkEmail,
  createContact,
  createNewObject
} = require("./utils/apis");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// OTHER VARS
const PORT = process.env.PORT;
const root_url = process.env.ROOT_URL;

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
app.get("/custom-objects", async (req, res) => {
  const response = await getAllObjects(root_url, config);
  const { results } = response;
  const newResults = results.map(item => {
    let newProductIds = item.product_ids_and_quantities.split(",");
    return {
      $id: item.$id,
      cart_expiration: item.cart_expiration,
      cart_id: item.cart_id,
      cart_url: item.cart_url,
      cart_value: item.cart_value,
      $email: item.$email,
      klaviyo_created: item.klaviyo_created,
      klaviyo_customer_id: item.klaviyo_customer_id,
      klaviyo_internal_id: item.klaviyo_internal_id,
      klaviyo_updated: item.klaviyo_updated,
      product_ids_and_quantities: newProductIds
    };
  });
  res.send(newResults);
});

// GET - gets a single custom obj record
app.get("/custom-objects/:id", async (req, res) => {
  const { id } = req.params;

  const response = await getSingleObject(root_url, id, config);
  const newProductIds = response.product_ids_and_quantities.split(",");
  const newResults = {
    $id: response.$id,
    cart_expiration: response.cart_expiration,
    cart_id: response.cart_id,
    cart_url: response.cart_url,
    cart_value: response.cart_value,
    $email: response.$email,
    klaviyo_created: response.klaviyo_created,
    klaviyo_customer_id: response.klaviyo_customer_id,
    klaviyo_internal_id: response.klaviyo_internal_id,
    klaviyo_updated: response.klaviyo_updated,
    product_ids_and_quantities: newProductIds
  };
  res.send(newResults);
});

// PATCH - updates a single custom obj record
app.patch("/custom-objects/:id", async (req, res) => {
  const { id } = req.params;

  const payload = JSON.stringify(req.body);
  const response = await updateSingleObject(root_url, id, payload, config);
  res.send(response);
});

// POST - creates a net new custom obj record
app.post("/custom-objects", (req, res) => {
  const {
    $email,
    $id,
    cart_url,
    cart_expiration,
    product_ids_and_quantities,
    cart_value
  } = req.body;

  const cartID = crypto.randomBytes(3).toString("hex");
  const newObject = JSON.stringify({
    records: [
      {
        $id,
        $email,
        cart_url,
        cart_expiration,
        cart_value,
        product_ids_and_quantities,
        cart_id: cartID
      }
    ]
  });

  checkEmail("https://a.klaviyo.com/api/v2/people/search", $email, config).then(
    async result => {
      const { status } = result;
      if (status === 200) {
        const _response = await createNewObject(root_url, newObject, config);
        res.send(_response);
      } else {
        const token = process.env.PUBLIC_TOKEN;
        const response = await createContact(
          "https://a.klaviyo.com/api/identify",
          token,
          $email
        );
        const { data, status } = response;
        if (status === 200 && data === 1) {
          createNewObject(root_url, newObject, config).then(response_ => {
            res.send(response_);
          });
        }
      }
    }
  );
});

// DELETE - deletes a single custom obj record
app.delete("/custom-objects/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteSingleObject(root_url, id, config);
  res.send(response);
});

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
