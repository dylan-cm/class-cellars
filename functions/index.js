const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });

exports.products = functions.https.onRequest(async (req, response) => {
  cors(req, response, async () => {
    const query = `
      query {
        products(first: 3) {
          nodes {
            variants(first: 1) {
              nodes {
                price {
                  amount
                  currencyCode
                }
                id
                product {
                  description(truncateAt: 10)
                  featuredImage {
                    url
                  }
                  availableForSale
                }
                quantityAvailable
              }
            }
            title
          }
        }
      }
    `;

    const apiResponse = await fetch(
      "https://classifiedcellars.myshopify.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.X_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
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

    response.send(apiResponseBody.data.products.nodes);
  });
});

exports.addCustomer = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { email } = request.body;

    const query = `
      mutation {
        customerCreate(input: {
          email: "${email}",
          acceptsMarketing: true
        }) {
          customer {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const apiResponse = await fetch(
        "https://classifiedcellars.myshopify.com/admin/api/2023-01/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.X_SHOPIFY_ADMIN_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query,
          }),
        }
      );

      const apiResponseBody = await apiResponse.json();

      if (apiResponseBody.errors) {
        console.error("Failed to create customer:", apiResponseBody.errors);
        response.status(500).send("Failed to create customer");
        return;
      }

      response.send(apiResponseBody.data.customerCreate.customer);
    } catch (error) {
      console.error("Failed to create customer:", error);
      response.status(500).send("Failed to create customer");
    }
  });
});
