from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .metrics.cpuMetrics import CpuUsage
from .metrics.ramMetrics import RamUsage

def index(request):
    return HttpResponse("This is the root of the metricServer url.")

def health(request):
    serverHealth = {
        "alive": True,
        "port": 8000,
        "ip": "localhost",
        "security": "FATALITY"
    }
    return JsonResponse(serverHealth)

def cpu(request):
    cu = CpuUsage()
    cu.getUsage()
    response = {
        "frequency": {
            "current": cu.currentFrequency,
            "max": cu.maxFrequency,
            "min": cu.minFrequency
        },
        "utilization": {
            "percent": cu.percentage
        },
        "count": cu.count
    }
    return JsonResponse(response)

def ram(request):
    ru = RamUsage()
    ru.getUsage()
    response = {
        "percent": ru.percentage,
        "total": ru.total,
        "used": ru.used,
        "available": ru.available
    }
    return JsonResponse(response)
    
