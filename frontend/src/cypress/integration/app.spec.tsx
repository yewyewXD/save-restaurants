export {};
it("should work", () => {
  cy.visit("http://localhost:3000");
  cy.get("h1").should("have.text", "welcome to this website");
});
