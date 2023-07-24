import { convertToMoney } from './convert-to-money';

describe('convertToMoney', (): void => {
  test('default positive', (): void => {
    // Arrange
    const value = 123;
    const convertedValue = `$${value.toFixed(2)}`;

    // Act
    const actual = convertToMoney(value);

    // Assert
    expect(actual).toEqual(convertedValue);
  });

  test('negative number', (): void => {
    // Arrange
    const value = -1234;
    const convertedValue = '-$1,234.00';

    // Act
    const actual = convertToMoney(value);

    // Assert
    expect(actual).toEqual(convertedValue);
  });

  test('round up decimal', (): void => {
    // Arrange
    const value = 1.899;
    const convertedValue = '$1.90';

    // Act
    const actual = convertToMoney(value);

    // Assert
    expect(actual).toEqual(convertedValue);
  });

});
