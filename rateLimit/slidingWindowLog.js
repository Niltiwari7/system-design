class SlidingWindowLog {
    constructor(limit, windowSize) {
      this.limit = limit; // Maximum number of requests allowed in the window
      this.windowSize = windowSize; // Size of the window in milliseconds
      this.requestLogs = new Map(); // Map to store request timestamps for each user
    }
  
    allowRequest(userId) {
      const currentTime = Date.now();
  
      // Check if the current window has expired
      if (currentTime - this.requestLogs.get(userId) >= this.windowSize) {
        this.requestLogs.delete(userId); // Remove expired user from the map
      }
  
      if (this.requestLogs.size < this.limit) {
        this.requestLogs.set(userId, currentTime); // Add user to the map with current timestamp
        return true; // Request allowed
      }
  
      return false; // Request denied due to rate limit exceeded
    }
  }

// Example usage:
const rateLimiter = new SlidingWindowLog(5, 60000); // Limit of 5 requests per 60 seconds

console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // false (exceeds limit)