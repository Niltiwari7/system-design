import threading
import time


class CacheManager:
    def __init__(self):
        self.cache = {}
        self.lock = threading.Lock()

    def put(self, key, value, ttl):
        if ttl <= 0:
            raise ValueError("TTL must be greater than 0")
        with self.lock:
            self.cache[key] = (value, time.time() + ttl)

    def get(self, key):
        with self.lock:
            if key in self.cache:
                value, expiry = self.cache[key]
                if time.time() < expiry:
                    return value
                else:
                    del self.cache[key]  # Remove expired entry
        return None

    def remove(self,key):
        with self.lock:
            if key in self.cache:
                del self.cache[key]

    def size(self):
        with self.lock:
            return len(self.cache)

cache_manager = CacheManager()

if __name__ == "__main__":
    cache1 = cache_manager
    cache2 = cache_manager

    # same instance check
    print(cache1 is cache2)  # Output: True
