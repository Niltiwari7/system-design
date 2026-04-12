class RoundRobin {
     constructor(servers) {
        this.servers = servers;
        this.currentIndex = -1;
     }

     getNextServer() {
       this.currentIndex = (this.currentIndex + 1) % this.servers.length;
       return this.servers[this.currentIndex];
     }
}

const rr = new RoundRobin(["S1", "S2", "S3"]);

console.log("UserA →", rr.getNextServer());
console.log("UserB →", rr.getNextServer());
console.log("UserC →", rr.getNextServer());
console.log("UserD →", rr.getNextServer());
console.log("UserE →", rr.getNextServer());