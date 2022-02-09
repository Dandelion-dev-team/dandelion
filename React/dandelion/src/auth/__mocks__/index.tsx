const React = require("react")
module.exports = {
  useAuth: jest.fn(() => [false]),
  authFetch: jest.fn(() => [false]),
  login: jest.fn(() => true),
  logout: jest.fn(() => false),
}