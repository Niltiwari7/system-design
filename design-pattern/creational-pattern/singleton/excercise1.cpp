#include <iostream>
#include <string>
using namespace std;
/**
Problem statement
Design a Logger class for an application. The application should have only one Logger instance, and different parts of the application should use it to log messages.
Requirements
1. Only one Logger instance should exist.
2. The constructor must not be accessible to external code.
3. Provide a getInstance() method to access the shared instance.
4. Implement info(), warning(), and error() methods.
5. Prevent copying and moving the Logger instance.
**/
class Logger {
  private:
    // Private constructor prevents direct creation (e.g. Logger l;)
    Logger() {
      cout << "Logger instance created." << endl;
    }
  public:
   // Prevent copying
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;

    // Prevent moving
    Logger(Logger&&) = delete;
    Logger& operator=(Logger&&) = delete;

   // 3. Global access point (thread-safe in C++11 and newer)
   static Logger& getInstance() {
      static Logger instance;
      return instance;
   }

   // 4. Logging methods
    void info(const string& message) {
      cout << "[INFO]: " << message << endl;
    }
    void warning(const string& message) {
      cout << "[WARNING]: " << message << endl;
    }
    void error(const string& message) {
      cout << "[ERROR]: " << message << endl;
    }
};

int main() {
    Logger& logger1 = Logger::getInstance();
    Logger& logger2 = Logger::getInstance();

    logger1.info("Application started");
    logger2.warning("Low disk space");
    logger1.error("Database connection failed");

    cout << (&logger1 == &logger2) << endl;

    return 0;
}