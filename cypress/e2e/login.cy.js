import cy from "cypress";

describe("Login flow", () => {
  it("Should see login button and redirect to /login", () => {
    cy.visit("http://localhost:5173/");

    const loginButton = cy.get('[data-cy="loginButton"]');
    loginButton.click();

    cy.url().should("include", "login");
  });
});
