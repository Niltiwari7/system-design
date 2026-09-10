from abc import ABC, abstractmethod
class PaymentProcessor(ABC):

    @abstractmethod
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentProcessor):

    def pay(self, amount):
        print(f"Paid ₹{amount} using Credit Card")


class UPIPayment(PaymentProcessor):

    def pay(self, amount):
        print(f"Paid ₹{amount} using UPI")


class PaymentProcessorCreator(ABC):

    @abstractmethod
    def create_processor(self):
        pass

    def process_payment(self, amount):
        processor = self.create_processor()
        processor.pay(amount)


class CreditCardCreator(PaymentProcessorCreator):

    def create_processor(self):
        return CreditCardPayment()


class UPICreator(PaymentProcessorCreator):

    def create_processor(self):
        return UPIPayment()

creator = UPICreator()

creator.process_payment(500)