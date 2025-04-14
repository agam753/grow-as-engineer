class ApiResponse {
  constructor(statusCode, data, message = "Success", totalCount = 1) {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
    this.totalCount = totalCount
  }
}

export { ApiResponse }