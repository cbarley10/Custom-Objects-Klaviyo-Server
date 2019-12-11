const axios = require("axios");
product_ids = ["123", "345", "456", "567", "678", "789"];
config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const data = [
  {
    email: "connor.barley+1@klaviyo.com",
    cart_value: 80,
    product_ids_and_quantities: "123:2,345:1"
  },
  {
    email: "connor.barley+2@klaviyo.com",
    cart_value: 110,
    product_ids_and_quantities: "123:1"
  },
  {
    email: "connor.barley+3@klaviyo.com",
    cart_value: 90,
    product_ids_and_quantities: "456:3"
  },
  {
    email: "connor.barley+4@klaviyo.com",
    cart_value: 100,
    product_ids_and_quantities: "456:1,567:1"
  },
  {
    email: "connor.barley+5@klaviyo.com",
    cart_value: 150,
    product_ids_and_quantities: "678:3,789:1"
  },
  {
    email: "connor.barley+6@klaviyo.com",
    cart_value: 50,
    product_ids_and_quantities: "567:1"
  },
  {
    email: "connor.barley+7@klaviyo.com",
    cart_value: 90,
    product_ids_and_quantities: "456:3"
  },
  {
    email: "connor.barley+8@klaviyo.com",
    cart_value: 90,
    product_ids_and_quantities: "456:3"
  },
  {
    email: "connor.barley+9@klaviyo.com",
    cart_value: 180,
    product_ids_and_quantities: "123:2,456:2"
  },
  {
    email: "connor.barley+10@klaviyo.com",
    cart_value: 75,
    product_ids_and_quantities: "456:2"
  },
  {
    email: "connor.barley+11@klaviyo.com",
    cart_value: 55,
    product_ids_and_quantities: "345:1"
  },
  {
    email: "connor.barley+12@klaviyo.com",
    cart_value: 110,
    product_ids_and_quantities: "678:1,345:1,123:1"
  },
  {
    email: "connor.barley+13@klaviyo.com",
    cart_value: 140,
    product_ids_and_quantities: "123:2,789:1,345:1"
  },
  {
    email: "connor.barley+14@klaviyo.com",
    cart_value: 210,
    product_ids_and_quantities: "456:3,123:6"
  },
  {
    email: "connor.barley+15@klaviyo.com",
    cart_value: 190,
    product_ids_and_quantities: "456:3,123:1"
  },
  {
    email: "connor.barley+16@klaviyo.com",
    cart_value: 220,
    product_ids_and_quantities: "123:3,456:4"
  },
  {
    email: "connor.barley+17@klaviyo.com",
    cart_value: 60,
    product_ids_and_quantities: "567:1"
  },
  {
    email: "connor.barley+18@klaviyo.com",
    cart_value: 160,
    product_ids_and_quantities: "567:2,678:2"
  },
  {
    email: "connor.barley+19@klaviyo.com",
    cart_value: 180,
    product_ids_and_quantities: "123:2,789:3"
  },
  {
    email: "connor.barley+20@klaviyo.com",
    cart_value: 100,
    product_ids_and_quantities: "456:4"
  }
];

const mapItems = async arr => {
  const mapped = await arr.map(async (item, index) => ({
    cart_id: index + 1,
    $email: item.email,
    $id: item.email,
    cart_url: "https://www.hylete.com/checkout/cart/",
    cart_expiration: "2020-3-30",
    product_ids_and_quantities: item.product_ids_and_quantities,
    cart_value: item.cart_value
  }));
  const response = await Promise.all(mapped);
  return {
    records: response
  };
};

mapItems(data).then(res => {
  const data = JSON.stringify(res);
  console.log(data);
  // axios
  //   .post(
  //     "https://a.klaviyo.com/api/v1/custom-objects/Cart/?api_key=pk_60b8aff225d7e8564f30705de0047262a2",
  //     config,
  //     data
  //   )
  //   .then(response => {
  //     console.log(response);
  //   });
});
