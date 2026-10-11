### Singleton Design Pattern

The singleton Design pattern is a creational design pattern that ensures a class has exactly one instance and provides a global access point to that instance.


### 1. Understand the problem
Imagine we are building a Trello like application. Our application has configuration manager that stores settings such as:

- Database connection details
- Application name
- Feature Flags
- Logging configuration

We want every part of the application to access the same configuration manager instead of creating multiple instances.

Without Singleton:
```cpp
class ConfigManger {
  public:
  string appName = "Trello";
};

int main() {
  ConfigManger c1;
  ConfigManger c2;

  //Two different objects!
}
```

Here c1 and c2 are two separate objects.


### 2. The three rules of Singleton

1. Private constructor - Prevents other classes from creating objects using ConfigManger obj;

2. One static instance - The class maintains a single shared object rather than one object per caller.

3. Public static access method - Provides a way to obtain that shared object without needing an existing object.

### 3. Implement Singleton step by step

#### step 1 : Make the constructor private

```cpp
class ConfigManger {
  private: 
  ConfigManger(){}
};
```

Now this would not compile:

```cpp
ConfigManger config; // Error : constructor is private
```
Why? Because the constructor can only be called from within the class or by its friends.

#### step 2: Add a static access method

A static method belongs to the class, so we can call it without creating an object.

```cpp
class ConfigManager {
  private:
  ConfigManger(){}

  public:
  static ConfigManager& getInstance() {
    // We will return the single instance here.
  }
};
```
#### Step 3: Create a single instance
The simplest approach is a function local static variable:
```cpp
class ConfigManager {
  private: 
     ConfigManger(){}
  public:
     static ConfigManager& getInstance() {
      static ConfigManager instance;
      return instance;
     }
};
```

