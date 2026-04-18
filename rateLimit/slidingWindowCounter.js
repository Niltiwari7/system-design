class SlidingWindowCounter {
  constructor(limit, windowSizeInSeconds) {
    this.limit = limit; // Maximum number of requests allowed in the window
    this.windowSize = windowSizeInSeconds * 1000; // Convert window size to milliseconds
    this.currentWindowStart = Date.now(); // Start time of the current window
    this.previousWindowCount = 0; // Count of requests in the previous window
    this.currentWindowCount = 0; // Count of requests in the current window
  }

  allowRequest() {
    const currentTime = Date.now();
    
    // Check if the current window has expired    if (currentTime - this.currentWindowStart >= this.windowSize) {
    if (currentTime - this.currentWindowStart >= this.windowSize) {
      // Move the current window count to previous and reset current count
      this.previousWindowCount = this.currentWindowCount;
      currentWindowCount = 0;
      this.currentWindowStart = currentTime; // Start a new window
    }

    // Calculate the weight of the previous window based on how much time has passed in the current window
    const elapsedTime = currentTime - this.currentWindowStart;
    const weight = elapsedTime / this.windowSize;

    // Calculate the total count considering both current and previous windows
    const totalCount = this.currentWindowCount + weight * this.previousWindowCount;

    if (totalCount < this.limit) {
      this.currentWindowCount++; // Increment the count for the current window
      return true; // Request allowed
    }

    return false; // Request denied due to rate limit exceeded
  }
}

// Example usage:
const rateLimiter = new SlidingWindowCounter(5, 60); // Limit of 5 requests per 60 seconds

console.log(rateLimiter.allowRequest()); // true
console.log(rateLimiter.allowRequest()); // true
console.log(rateLimiter.allowRequest()); // true
console.log(rateLimiter.allowRequest()); // true
console.log(rateLimiter.allowRequest()); // true
console.log(rateLimiter.allowRequest()); // false (exceeds limit)
