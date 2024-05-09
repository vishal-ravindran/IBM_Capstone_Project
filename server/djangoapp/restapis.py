# Uncomment the following imports before adding the REST API code
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel


# @csrf_exempt
# def car_make_list(request):
#     # Add code to return a list of car makes
@csrf_exempt
def car_make_list(request):
    # Add code to return a list of car makes
    try:
        car_makes = CarMake.objects.all()
        data = {"car_makes": list(car_makes.values())}
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def car_model_list(request, make_id):
    # Add code to return a list of car models for a given car make id
    try:
        car_models = CarModel.objects.filter(car_make_id=make_id)
        data = {"car_models": list(car_models.values())}
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
