describe("Register flow", () => {
  it("Should visit register page", () => {
    cy.visit("http://localhost:5173/");

    const registerButton = cy.get('[data-cy="registerButton"]');
    registerButton.click();

    cy.url().should("include", "register");

    const firstNameInput = cy.get('[data-cy="firstNameInput"');
    firstNameInput.type("Fernando");

    const lastNameInput = cy.get('[data-cy="lastNameInput"');
    lastNameInput.type("Servín");

    const birthdayInput = cy.get('[data-cy="birthdayInput"');
    birthdayInput.type("1998-10-23");

    const emailInput = cy.get('[data-cy="emailInput"');
    emailInput.type("test@test.com");

    const passwordInput = cy.get('[data-cy="passwordInput"');
    passwordInput.type("123123");

    const genderInput = cy.get('[data-cy="genderInput"');
    genderInput.type("Male");

    const registerSubmitButton = cy.get('[data-cy="registerSubmitButton"');
    registerSubmitButton.click();

    cy.contains("Usuario registrado satisfactoriamente");

    //     firstNameInput
    // lastNameInput
    // birthdayInput
    // emailInput
    // passwordInput
    // genderInput
    // registerSubmitButton
  });
});
