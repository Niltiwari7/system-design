/**
Problem statement
Design a DatabaseConnection class that ensures only one connection manager instance is created and shared across the application.
Requirements:
1. Only one instance can be created.
2. The constructor must be private.
3. Implement getInstance() using a function-local static instance.
4. Implement connect(), disconnect(), and isConnected().
5. Prevent copying and moving.
6. Print appropriate messages when connecting and disconnecting.
*/
#include<iostream>
#include<string>
using namespace std;

class DatabaseConnection {
  private:
   bool connected = false;
   DatabaseConnection() {
    cout<< "Database connection created." << endl;
   }

   public:
   static DatabaseConnection& getInstance() {
    static DatabaseConnection instance;
    return instance;
   }

   // Prevent copying
   DatabaseConnection(const DatabaseConnection&) = delete;
   DatabaseConnection& operator=(const DatabaseConnection&) = delete;
   // Prevent moving
   DatabaseConnection(DatabaseConnection&&) = delete;
   DatabaseConnection& operator=(DatabaseConnection&&) = delete;


   void connect() {
    if (connected) {
      cout<< "Database already connected." << endl;
      return;
    }
    connected = true;
    cout<< "Database connected." << endl;
   }

   void disconnect() {
    if(!connected) {
      cout<< "Database already disconnected." << endl;
      return;
    }
    connected = false;
    cout<< "Database disconnected." << endl;
   }

   bool isConnected() {
    return connected;
   }
};

int main() {
    DatabaseConnection& db =
        DatabaseConnection::getInstance();

    db.connect();
    cout << db.isConnected() << endl;

    db.disconnect();
    cout << db.isConnected() << endl;

    return 0;
}