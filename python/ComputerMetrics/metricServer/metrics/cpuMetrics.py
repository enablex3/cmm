import psutil

class CpuUsage:

    def __init__(self):
        return None

    def getUsage(self):
        self.frequencyStats = psutil.cpu_freq()
        self.currentFrequency = self.frequencyStats.current
        self.minFrequency = self.frequencyStats.min
        self.maxFrequency = self.frequencyStats.max
        self.percentage = psutil.cpu_percent(interval=None)
        self.count = psutil.cpu_count()