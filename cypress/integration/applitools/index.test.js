describe("AppTest", () => {

  it(`ultraFastTest`, function () {
    cy.visit('http://localhost:3000/#/event/www/tickets');

    // Call Open on eyes to initialize a test session
    cy.eyesOpen({
      appName: 'Tickers',
      testName: 'tickets app test',
    });

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
    cy.eyesCheckWindow('ticket list');

    // Check the app page
    // cy.eyesCheckWindow({
    //   tag: "App Window",
    //   target: 'window',
    //   fully: true,
    // });

    // Call Close on eyes to let the server know it should display the results
    cy.eyesClose();
  });

});
