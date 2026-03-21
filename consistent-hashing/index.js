class ConsistentHashing {
    constructor(servers = [], numReplicas = 3) {
      this.numReplicas = numReplicas;
      this.ring = new Map();
      this.sortedKeys = []; // To keep track of the sorted keys on the ring
      this.servers = new Set();
      servers.forEach(server => this.addServer(server))  
    }


    hash(key) {
      let hash = 2166136261; // FNV offset basis
      for(let i = 0; i < key.length; i++) {
        hash ^= key.charCodeAt(i);
        hash = Math.imul(hash, 16777619) >>> 0; // FNV-1a prime, unsigned 32-bit
      }
      return hash;
    }

    addServer(server){
        this.servers.add(server);

        for(let i = 0; i < this.numReplicas; i++ ){
            const hash = this.hash(`${server}-${i}`);
            this.ring.set(hash,server);
            // why do we need to keep track of sorted keys?
            // We need to keep track of sorted keys to efficiently find the next server in the ring when a request comes in. When we hash a key, we need to find the closest server that is greater than or equal to the hash of the key. By keeping the keys sorted, we can quickly perform a binary search to find the appropriate server, which improves the performance of lookups in the consistent hashing ring.
            this.sortedKeys.push(hash); 
        }
        this.sortedKeys.sort((a,b)=>(a-b))
    }

    removeServer(server) {
        if(!this.servers.has(server))return;
        this.servers.delete(server);

        for(let i = 0; i < this.numReplicas; i++) {
            const hash = this.hash(`${server}-${i}`);

            this.ring.delete(hash);
            const index = this.sortedKeys.indexOf(hash);
            if(index !== -1) {
                this.sortedKeys.splice(index,1);
            }
        }
    }

    getServer(key) {
      if(this.sortedKeys.length === 0) return null; // No servers available

      const hash = this.hash(key);

      // Binary search to find the appropriate server
      let left = 0;
      let right = this.sortedKeys.length - 1;
      let resultIndex = -1;

      while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(this.sortedKeys[mid] >= hash) {
          resultIndex = mid;
          right = mid - 1; // Look for a smaller index on the left
        } else {
          left = mid + 1;
        }
      }

      // If no server is found that is greater than or equal to the hash,
      // wrap around to the first server in the ring
      if(resultIndex === -1) {
        resultIndex = 0;
      }

      return this.ring.get(this.sortedKeys[resultIndex]);
    }
}

const ch = new ConsistentHashing(["S1", "S2", "S3"], 100);

console.log("UserA →", ch.getServer("UserA"));
console.log("UserB →", ch.getServer("UserB"));
console.log("UserC →", ch.getServer("UserC"));
console.log("UserD →", ch.getServer("UserD"));
console.log("UserE →", ch.getServer("UserE"));

ch.removeServer("S2");
console.log("UserA after removing S2 →", ch.getServer("UserA"));
console.log("UserB after removing S2 →", ch.getServer("UserB"));
console.log("UserC after removing S2 →", ch.getServer("UserC"));
console.log("UserD after removing S2 →", ch.getServer("UserD"));
console.log("UserE after removing S2 →", ch.getServer("UserE"));

ch.addServer("S4");
console.log("UserA after adding S4 →", ch.getServer("UserA"));

ch.removeServer("S2");
console.log("UserB after removing S2 →", ch.getServer("UserB"));