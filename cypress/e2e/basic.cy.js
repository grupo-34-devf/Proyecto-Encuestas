describe("Home page", () => {
  it("Should visit / and see the home page", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Login");
    cy.contains("Register");
  });
});
