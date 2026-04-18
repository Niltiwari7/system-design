class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity; // Maximum tokens in the bucket
    this.refillRate = refillRate;
    this.tokens = capacity; // Current tokens in the bucket
    this.lastRefillTimestamp = Date.now(); // Last time the bucket was refilled
  }

  refill() {
    const timeDuration = (Date.now() - this.lastRefillTimestamp) / 1000; // Time since last refill in seconds
    const tokensToAdd = timeDuration * this.refillRate; // Calculate how many tokens to add
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd); // Add tokens but do not exceed capacity
    this.lastRefillTimestamp = Date.now(); // Update last refill timestamp
  }

  consume(tokens = 1) {
    this.refill() // Refill tokens before consuming
    if (this.tokens >= tokens) {
      this.tokens -= tokens; // Consume tokens
      return true; // Request allowed
    }
    return false; // Request denied due to insufficient tokens
  }
}

// Example usage:
const bucket = new TokenBucket(5, 1); // Capacity of 5 tokens and refill rate of 1 token per second

console.log(bucket.consume()); // true (consumes 1 token)
console.log(bucket.consume(2)); // true (consumes 2 tokens)
console.log(bucket.consume(3)); // false (only 2 tokens left, cannot consume 3)