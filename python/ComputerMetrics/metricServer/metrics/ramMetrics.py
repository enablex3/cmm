import psutil

class RamUsage:

    def __init__(self):
        return None

    def getUsage(self):
        self.usage = psutil.virtual_memory()
        self.percentage = self.usage.percent
        self.total = self.usage.total
        self.used = self.usage.used
        self.available = self.usage.available