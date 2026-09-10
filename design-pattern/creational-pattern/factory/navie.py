"""
the problem with the naive factory is that it violates the open/closed principle.
"""

class EmailNotification:
  def send(self,message):
    print(f"Sending email: {message}")

class SMSNotification:
  def send(self,message):
    print(f"Sending SMS: {message}")

def main():
  notification_type = input("Enter notification type (email/sms): ")
  message = input("Enter message: ")

  if notification_type == "email":
    notification = EmailNotification()
  elif notification_type == "sms":
    notification = SMSNotification()
  else:
    raise ValueError("Invalid notification type")

  notification.send(message)

if __name__ == "__main__":
  main()

"""
But imagine your application grows:
email
sms
whatsapp
slack
telegram
x

Now you might have to modify the factory function to add new notification types, which violates the open/closed principle. Instead, you can use a more flexible approach, such as using a registry or a mapping of notification types to their corresponding classes. This way, you can add new notification types without modifying the existing code.
"""