import {
  type CountryCode,
  formatIncompletePhoneNumber,
} from 'libphonenumber-js';

export const formatPhoneNumber = (
  phoneNumber: number,
  countryCode: CountryCode = 'US',
) => {
  return formatIncompletePhoneNumber(phoneNumber.toString(), countryCode);
};
