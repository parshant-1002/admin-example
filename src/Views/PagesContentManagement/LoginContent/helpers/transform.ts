// Define types for the LoginContent form data
export interface LoginContentFormData {
  fileId: string;
  imageURL: string;
  title: string;
  buttonLabel: string;
  image: {
    fileURL: string;
    fileId: string;
    _id: string;
  }[];
}

// Define the transform function to convert form data to API request format
export const transAPIRequestDataToFormLoginContent = (
  data: LoginContentFormData
) => {
  return {
    title: data?.title,
    buttonLabel: data?.buttonLabel,
    image: [{ fileURL: data?.imageURL, fileId: data?.fileId }],
  };
};

// Define the transform function to convert API response data back to form format
export const transformAPIRequestDataLoginContent = (
  data: LoginContentFormData // Assuming API response data might not be of type LoginContentFormData
) => {
  return {
    title: data?.title,
    buttonLabel: data?.buttonLabel,
    fileId: data?.image?.[0]?.fileId || data?.image?.[0]?._id,
    imageURL: data?.image?.[0]?.fileURL,
  };
};
