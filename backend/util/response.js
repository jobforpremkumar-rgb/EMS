export const sendSuccess = ({
  res,
  statusCode = 200,
  message = "Success",
  data = null,
  meta = null,
}) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    meta,
  });
};

export const sendError = ({
  res,
  statusCode = 500,
  message = "Something went wrong",
  errors = null,
}) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};