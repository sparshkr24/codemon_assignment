const request = require("supertest");
const {app, server} = require("../server");

afterAll(async() => {
  await server.close();
});


describe("GET /products", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(12);
  });
});


describe("GET /invalid_api", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/invalid_api");
    expect(response.status).toBe(404);
  });
});

describe("GET /products/:productId", () => {
  it("should return a product by ID", async () => {
    // add a product to the database
    product_id = "645eba34aab5e1ea05f46b30"

    const response = await request(app).get(`/products/${product_id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("One Plus");
  });

  it("should return a 404 error if product ID is not found", async () => {
    const response = await request(app).get("/products/645eba34aab5e1ea05f46b21");
    expect(response.body.error.status).toBe(404);
    expect(response.body.error.message).toBe("Product with ID 645eba34aab5e1ea05f46b21 not found");
  });
});


describe("PATCH /products/:productId", () => {
  it("should update the price of a product by ID", async () => {
    // add a product to the database
    product_id = "645eba34aab5e1ea05f46b30"

    const response = await request(app)
      .patch(`/products/${product_id}`)
      .send({ "price": 15 });
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(15);
  });

  it("should return a 404 error if product ID is not found", async () => {
    const response = await request(app)
      .patch("/products/645eba34aab5e1ea05f46b21")
      .send({ price: 15 });
    expect(response.body.error.status).toBe(404);
    expect(response.body.error.message).toBe("Product with ID 645eba34aab5e1ea05f46b21 not found");
  });

  it("should return a 403 error if payload is invalid", async () => {
    // add a product to the database
    product_id = "645eba34aab5e1ea05f46b30"

    const response = await request(app)
      .patch(`/products/${product_id}`)
      .send({ price: "invalid price" });
    expect(response.status).toBe(403);
    expect(response.body.error.status).toBe(403);
    expect(response.body.error.message).toBe("Invalid payload");
  });
});
