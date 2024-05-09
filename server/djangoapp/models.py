# Uncomment the following imports before adding the Model code
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.


# <HINT> Create a Car Make model `class CarMake(models.Model)`:
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


# <HINT> Create a Car Model model `class CarModel(models.Model):`:
class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPE = [
        ("SEDAN", 'Sedan'),
        ("SUV", 'Suv'),
        ("WAGON", "Wagon"),
    ]
    car_type = models.CharField(max_length=20, choices=CAR_TYPE, default="SUV")
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015),
        ]
    )

    def __str__(self):
        return self.name
