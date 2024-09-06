// Define types for the PlaceOrderPopupContent form data
export interface PlaceOrderPopupContentFormData {
  title: string;
  subtitle: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneNumberLabel: string;
  addressHeader: string;
  countryLabel: string;
  countryPlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  pincodeLabel: string;
  pincodePlaceholder: string;
  addressLine1Label: string;
  addressLine1Placeholder: string;
  addressLine2Label: string;
  addressLine2Placeholder: string;
  placeOrderButtonLabel: string;
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormPlaceOrderPopupContent = (
  data: PlaceOrderPopupContentFormData
) => {
  return {
    ...data,
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataPlaceOrderPopupContent = (
  data: PlaceOrderPopupContentFormData // Assuming API response data might not be of type PlaceOrderPopupContentFormData
) => {
  return {
    ...data,
  };
};
