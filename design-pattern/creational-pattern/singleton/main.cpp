#include <iostream>
#include <string>
using namespace std;

class ConfigManager {
private:
    string appName = "My Application";

    // Private constructor prevents direct creation (e.g. ConfigManager c;)
    ConfigManager() {
        cout << "ConfigManager instance created." << endl;
    }

public:
    // 1. Block copying
    ConfigManager(const ConfigManager&) = delete;
    void operator=(const ConfigManager&) = delete;

    // 2. Global access point (thread-safe in C++11 and newer)
    static ConfigManager& getInstance() {
        static ConfigManager instance;
        return instance;
    }

    // Getters and Setters
    string getAppName() const { return appName; }
    void setAppName(const string& name) { appName = name; }
};

int main() {
    // Both references point to the exact same static instance
    ConfigManager& config1 = ConfigManager::getInstance();
    ConfigManager& config2 = ConfigManager::getInstance();

    config1.setAppName("New Application Name");
    
    cout << config2.getAppName() << endl; // Output: New Application Name
    cout << "Same instance? " << (&config1 == &config2 ? "Yes" : "No") << endl; // Output: Yes

    return 0;
}