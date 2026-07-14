class ApiResponse {
  constructor({
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  }) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.timestamp = new Date().toISOString();
  }
}

export default ApiResponse;