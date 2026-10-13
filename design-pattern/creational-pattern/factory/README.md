### Factory method

### 1. Understand the problem
Imagine we are building a notification system for one of the application.

Our application needs to send notification through different channels:
- Email
- SMS
- Push notification

A straight forward implementation might look like this:
```cpp
class NotificationService {
  public:
     void notify(string type, string message) {
      if (type == "email") {
        // Create notification
      }else if(type == "sms") {
        // Create sms notification
      } else if(type == "push") {
        // Create push notification
      }
     }
}
```

What happens when we add whatsapp notifications?
We must modify the existing `NotificationService`, adding another condition, As more notification types appear, this class becomes harder to maintain and test.

Our goaL : Separate object creation from the code that uses the objects.

### 2. Basic structure of the factory
![alt text](image.png)

There are two concepts to understand:
1. Product: The object being created such as `EmailNotification`.
2. Factory: The mechanism responsible for deciding which concrete object gets created.

### Factory vs Simple Factory

These are often confused:


| Simple Factory | Factory Method |
|----------------|----------------|
| Usually one factory class with conditional logic | A creator interface defines a factory method |
| One place selects the concrete type | Subclasses decide which concrete product to create |
| Useful for straightforward object selection | Useful when creation should vary by creator type |

### 4. Factory method implementation
First define a common product interface:

```cpp
#include <iostream>
#include <string>
#include<memory>
using namespace std;

class Notification {
  public:
     virtual void send(const string&message) = 0;
     virtual ~Notification() = default;
}
```

Now implement the concrete product:

```cpp
class EmailNotification : public Notification {
  public:
   void send(const string &message) override {
      cout<<"Email: "<<message<<endl; 
   }
};

class SMSNotification: public Notification {
  public:
  void send(const string& message) override {
    cout<<"SMS: "<<message<<endl;
  }
}
```

Next we need to define the abstract creator:
```
