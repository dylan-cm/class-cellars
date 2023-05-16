const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });

exports.products = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const query = `
      {
        shop {
          name
        }
      }
    `;

    const apiResponse = await fetch(
      "https://classifiedcellars.myshopify.com/admin/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.X_SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    const apiResponseBody = await apiResponse.json();

    if (apiResponseBody.errors) {
      console.error("Failed to fetch products:", apiResponseBody.errors);
      response.status(500).send("Failed to fetch products");
      return;
    }

    response.send(apiResponseBody.body);
  });
});
