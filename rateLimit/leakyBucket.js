class LeakyBucket {
    constructor(capacity, leakRate) {
      this.capacity = capacity; // Maximum capacity of the bucket
      this.leakRate = leakRate; // Rate at which the bucket leaks (tokens per second)
      this.currentLevel = 0; // Current level of the bucket
      this.lastLeakTimestamp = Date.now(); // Last time the bucket leaked
    }

    leak() {
       const timeDuration = (Date.now() - this.lastLeakTimestamp) / 1000; // Time since last leak in seconds
        const leakedTokens = timeDuration * this.leakRate; // Calculate how many tokens have leaked
        this.currentLevel = Math.max(0, this.currentLevel - leakedTokens); // Reduce the current level by the leaked tokens, but not below 0
        this.lastLeakTimestamp = Date.now(); // Update last leak timestamp
    }

    add(tokens = 1) {
        this.leak(); // Leak tokens before adding new ones
        if (this.currentLevel + tokens <= this.capacity) {
            this.currentLevel += tokens; // Add tokens to the bucket
            return true; // Request allowed
        }
        return false; // Request denied due to bucket overflow
    }
}

// Example usage:
const bucket = new LeakyBucket(5, 1); // Capacity of 5 tokens and leak rate of 1 token per second

console.log(bucket.add()); // true (adds 1 token)
console.log(bucket.add(2)); // true (adds 2 tokens)
console.log(bucket.add(3)); // false (only 2 tokens can be added before reaching capacity)
