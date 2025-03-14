export class ApiError extends Error {
    constructor(message, status, data = {}) {
      super(message)
      this.name = "ApiError"
      this.status = status
      this.data = data
    }
  
    isNotFound() {
      return this.status === 404
    }
  
    isUnauthorized() {
      return this.status === 401
    }
  
    isForbidden() {
      return this.status === 403
    }
  }