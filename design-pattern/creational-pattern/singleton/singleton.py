class LazySingleton:
  _instance = None

  def __init__(self):
    if LazySingleton._instance is not None:
      raise Exception("Use get_instance() to create an instance of this class.")

  @staticmethod
  def get_instance():
    if LazySingleton._instance is None:
      LazySingleton._instance = LazySingleton()
    return LazySingleton._instance

"""
This is a simple implementation of the singleton design pattern in Python. This implementation is not thread-safe, meaning that if multiple threads try to create an instance of the class at the same time, it may result in multiple instances being created. To make it thread-safe, you can use a lock or other synchronization mechanism.
"""

class ThreadSafeSingleton:
  _instance = None
  _lock = threading.Lock()

  def __init__(self):
    if ThreadSafeSingleton._instance is not None:
      raise Exception("Use get_instance() to create an instance of this class.")

  @staticmethod
  def get_instance():
    with ThreadSafeSingleton._lock:
      if ThreadSafeSingleton._instance is None:
        ThreadSafeSingleton._instance = ThreadSafeSingleton()
    return ThreadSafeSingleton._instance  

"""This is a thread-safe implementation of the singleton design pattern in Python. The use of a lock ensures that only one thread can create an instance of the class at a time, preventing multiple instances from being created in a multi-threaded environment."""

class DoubleCheckedSingleton:
  _instance = None
  _lock = threading.lock()

  def __init__(self):
    if DoubleCheckedSingleton._instance is not None:
      raise Exception("Use get_instance() to create an instance of this class.")

  @staticmethod
  def get_instance():
    if DoubleCheckedSingleton._instance is None:
      with DoubleCheckedSingleton._lock:
        if DoubleCheckedSingleton._instance is None:
          DoubleCheckedSingleton._instance = DoubleCheckedSingleton()
    return DoubleCheckedSingleton._instance

"""This is a double-checked locking implementation of the singleton design pattern in Python. It reduces the overhead of acquiring a lock by first checking if the instance is already created before acquiring the lock. This can improve performance in scenarios where the singleton instance is frequently accessed."""

class EagerSingleton:
  _instance = None

  def __init__(self):
    if EagerSingleton._instance is not None:
      raise Exception("Use get_instance() to create an instance of this class.")

  @staticmethod
  def get_instance():
    return EagerSingleton._instance 