const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
} = require("../src/math");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  // "Expect the value in the "total" variable to be the number 13"
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

// Challenge tests
test("Should convert 32 F to 0 C", () => {
  const celsiusTemperature = fahrenheitToCelsius(32);
  expect(celsiusTemperature).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const fahrenheitTemperature = celsiusToFahrenheit(0);
  expect(fahrenheitTemperature).toBe(32);
});
