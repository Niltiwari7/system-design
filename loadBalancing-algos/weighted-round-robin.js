/**
 * Brute-force approach: Expand the server list based on weights and then apply round-robin.
 * Time Complexity: O(1) for getNextServer() after O(n*m) for initialization, where n is the number of servers and m is the maximum weight.
 * Space Complexity: O(n*m) due to the expanded server list.
 */

// class WeightedRoundRobin {
//     constructor(servers, weights) {
//         this.expandedServers = [];
//         this.index = -1;

//         for(let i = 0; i < servers.length; i++) {
//            for(let j = 0; j < weights[i];j++) {
//               this.expandedServers.push(servers[i]);
//            }
//         }
//     }

//     getNextServer() {
//         this.index = (this.index + 1) % this.expandedServers.length;
//         return this.expandedServers[this.index];
//     }
// }

// const wrr = new WeightedRoundRobin(["S1", "S2", "S3"], [2, 3, 2]);

// console.log("UserA →", wrr.getNextServer());
// console.log("UserB →", wrr.getNextServer());
// console.log("UserC →", wrr.getNextServer());
// console.log("UserD →", wrr.getNextServer());
// console.log("UserE →", wrr.getNextServer());

class WeightedRoundRobin {
    constructor(servers, weights) {
        this.servers = servers;
        this.weights = weights;
        this.currentIndex = -1;
        this.currentWeight = 0;
        this.maxWeight = Math.max(...weights);
        this.gcdWeight = this.gcd(weights);
    }

    gcd(arr) {
        const gcdTwoNumbers = (a, b) => {
            if (b === 0) return a;
            return gcdTwoNumbers(b, a % b);
        };

        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = gcdTwoNumbers(result, arr[i]);
        }
        return result;
    }

    getNextServer() {
        while (true) {
            this.currentIndex = (this.currentIndex + 1) % this.servers.length;

            if (this.currentIndex === 0) {
                this.currentWeight -= this.gcdWeight;
                if (this.currentWeight <= 0) {
                    this.currentWeight = this.maxWeight;
                }
            }

            if (this.weights[this.currentIndex] >= this.currentWeight) {
                return this.servers[this.currentIndex];
            }
        }
    }
}

const wrr = new WeightedRoundRobin(["S1", "S2", "S3"], [2, 3, 2]);

console.log("UserA →", wrr.getNextServer());
console.log("UserB →", wrr.getNextServer());
console.log("UserC →", wrr.getNextServer());
console.log("UserD →", wrr.getNextServer());
console.log("UserE →", wrr.getNextServer());