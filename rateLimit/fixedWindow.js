class FixedWindowConter {
  constructor(limit, windowSize) {
    this.limit = limit; // Maximum number of requests allowed in the window
    this.windowSize = windowSize; // Size of the window in milliseconds
    this.currentWindowStart = Date.now(); // Start time of the current window
    this.requestCounts = new Map(); // Map to store request counts for each user
  }

  allowRequest(userId) {
    const currentTime = Date.now();

    // Check if the current window has expired
    if (currentTime - this.currentWindowStart >= this.windowSize) {
      this.currentWindowStart = currentTime; // Start a new window
      this.requestCounts.clear(); // Reset request counts for the new window
    }

    const count = this.requestCounts.get(userId) || 0;

    if (count < this.limit) {
      this.requestCounts.set(userId, count + 1); // Increment request count for the user
      return true; // Request allowed
    }

    return false; // Request denied due to rate limit exceeded
  }

}

// Example usage:
const rateLimiter = new FixedWindowConter(5, 60000); // Limit of 5 requests per 60 seconds

console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // true
console.log(rateLimiter.allowRequest("UserA")); // false (exceeds limit)  