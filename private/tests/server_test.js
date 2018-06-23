// Get dependencies
const request = require('request');
const test = require('tape');
// Setup port
const port = process.env.PORT || 1234;
// Start test
test('Server Health Test', (test) => {
  test.plan(3);
  // Make a request to our app
  request(`http://localhost:${port}/health`, (error, response, body) => {
    // No error
    test.false(error);
    // Successful response
    test.equal(response.statusCode, 200);
    // Assert content checks
    test.equal(body, "Status: 200");
  });
});