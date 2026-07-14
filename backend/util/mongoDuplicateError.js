// utils/mongoDuplicateError.js

export const duplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  return {
    success: false,
    statusCode: 409,
    message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    errors: {
      field,
      value,
    },
  };
};