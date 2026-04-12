class LeastConnection {
    constructor(servers) {
       this.connections = new Map();

       for(const server of servers) {
        this.connections.set(server,0);
       }
    }


    getNextConnection() {
        // step 1: find the minimum number of connections
        let minConn = Math.min(...this.connections.values());

        // step 2: find the server(s) with the minimum connections
        let candidates=[];
        for(const [server,count] of this.connections.entries()) {
            if(count === minConn) {
                candidates.push(server);
            }
        }

        // step 3: select the first server from candidates (or you can randomize)
        const selectedServer = candidates[0];

        // step 4: increment the connection count for the selected server
        this.connections.set(selectedServer, this.connections.get(selectedServer)+1);

        return selectedServer;
    }

    releaseConnection(server) {
        if(this.connections.has(server)) {
            this.connections.set(server, Math.max(0, this.connections.get(server)-1));
        }
    }
}

const leastConn = new LeastConnection(["S1", "S2", "S3"]);

console.log("UserA →", leastConn.getNextConnection());
console.log("UserB →", leastConn.getNextConnection());
console.log("UserC →", leastConn.getNextConnection());
console.log("UserD →", leastConn.getNextConnection());
console.log("UserE →", leastConn.getNextConnection());

leastConn.releaseConnection("S1");
leastConn.releaseConnection("S2");

console.log("UserF →", leastConn.getNextConnection());