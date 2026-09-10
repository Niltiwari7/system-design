class SMSNotification:
  def send(self,message):
    print(f"Sending SMS: {message}")

class EmailNotification:
  def send(self,message):
    print(f"Sending email: {message}")

class PushNotification:
  def send(self,message):
    print(f"Sending push notification: {message}")

class NotificationFactory:
  @staticmethod
  def create(notification_type):
    if notification_type == "SMS":
      return SMSNotification()
    elif notification_type == "Email":
      return EmailNotification()
    elif notification_type == "Push":
      return PushNotification()
    else:
      raise ValueError("Invalid notification type")


"""
Client
  |
  v
Factory
  |
  +----> EmailNotification
  |
  +----> SMSNotification

  The client does not directly create the notification objects. Instead, it relies on the factory to create the appropriate notification object based on the input type. This way, if you want to add a new notification type, you can simply add a new class and update the factory method without modifying the client code.
"""

def main():
  notification_type = input("Enter notification type (SMS/Email/Push): ")
  message = input("Enter message: ")

  notification = NotificationFactory.create(notification_type)
  notification.send(message)
