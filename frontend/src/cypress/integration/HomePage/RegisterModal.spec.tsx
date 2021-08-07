export {};

describe("testing register modal and form", () => {
  it("clicking button show register modal", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register").click();
    cy.get('[data-test-id="register-modal"]').should("not.be.null");
  });

  it("all 3 form fields should render", () => {
    cy.get("#displayName").should("not.be.null");
    cy.get("#email").should("not.be.null");
    cy.get("#password").should("not.be.null");
  });

  it("username field work correctly", () => {
    cy.get("#displayName").focus().type("tester6").blur();
    cy.get("#displayName").should("contain.value", "tester6");
  });

  it("email field work correctly", () => {
    cy.get("#email").focus().type("tester6@mail").blur();
    cy.get("#email").should("contain.value", "tester6@mail");
  });

  it("password field work correctly", () => {
    cy.get("#password").focus().type("tester6").blur();
    cy.get("#password").should("contain.value", "tester6");
  });

  // it('email validation should work',()=>{
  //   cy.get('')
  // })
});
