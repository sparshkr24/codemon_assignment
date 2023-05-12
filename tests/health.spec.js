describe("GET /products", () => {
  it("health should be okay", () => {
    const actualResult = healthCheckSync();
    expect(actualResult).to.equal("OK");
  });
});
